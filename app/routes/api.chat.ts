import { type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { createDataStream } from 'ai';
import { MAX_RESPONSE_SEGMENTS, MAX_TOKENS } from '~/lib/.server/llm/constants';
import { CONTINUE_PROMPT } from '~/lib/common/prompts/prompts';
import { streamText, type Messages, type StreamingOptions } from '~/lib/.server/llm/stream-text';
import SwitchableStream from '~/lib/.server/llm/switchable-stream';
import type { IProviderSetting } from '~/types/model';
import { createScopedLogger } from '~/utils/logger';

export async function action(args: ActionFunctionArgs) {
  return chatAction(args);
}

const logger = createScopedLogger('api.chat');

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  const items = cookieHeader.split(';').map((cookie) => cookie.trim());

  items.forEach((item) => {
    const [name, ...rest] = item.split('=');

    if (name && rest) {
      const decodedName = decodeURIComponent(name.trim());
      const decodedValue = decodeURIComponent(rest.join('=').trim());
      cookies[decodedName] = decodedValue;
    }
  });

  return cookies;
}

async function chatAction({ context, request }: ActionFunctionArgs) {
  logger.info('chatAction started');
  console.log('chatAction started');

  const env = process.env;
  if (!env) {
    logger.error('Invalid context: Missing environment configuration');
    console.error('Invalid context: Missing environment configuration');
    throw new Error('Invalid context: Missing environment configuration');
  }

  logger.debug('Parsing request JSON');
  console.log('Parsing request JSON');
  const { messages, files, promptId, contextOptimization } = await request.json<{
    messages: Messages;
    files: any;
    promptId?: string;
    contextOptimization: boolean;
  }>();

  logger.debug('Parsing cookies');
  console.log('Parsing cookies');
  const cookieHeader = request.headers.get('Cookie');
  const apiKeys = JSON.parse(parseCookies(cookieHeader || '').apiKeys || '{}');
  const providerSettings: Record<string, IProviderSetting> = JSON.parse(
    parseCookies(cookieHeader || '').providers || '{}',
  );

  const stream = new SwitchableStream();
  const cumulativeUsage = {
    completionTokens: 0,
    promptTokens: 0,
    totalTokens: 0,
  };

  try {
    logger.info('Setting up streaming options');
    console.log('Setting up streaming options');
    const options: StreamingOptions = {
      toolChoice: 'none',
      onFinish: async ({ text: content, finishReason, usage }) => {
        logger.debug('Streaming finished', { finishReason, usage });
        console.log('Streaming finished', { finishReason, usage });

        if (usage) {
          cumulativeUsage.completionTokens += usage.completionTokens || 0;
          cumulativeUsage.promptTokens += usage.promptTokens || 0;
          cumulativeUsage.totalTokens += usage.totalTokens || 0;
        }

        if (finishReason !== 'length') {
          logger.info('Finish reason is not length, creating usage stream');
          console.log('Finish reason is not length, creating usage stream');
          const encoder = new TextEncoder();
          const usageStream = createDataStream({
            async execute(dataStream) {
              dataStream.writeMessageAnnotation({
                type: 'usage',
                value: {
                  completionTokens: cumulativeUsage.completionTokens,
                  promptTokens: cumulativeUsage.promptTokens,
                  totalTokens: cumulativeUsage.totalTokens,
                },
              });
            },
            onError: (error: any) => `Custom error: ${error.message}`,
          }).pipeThrough(
            new TransformStream({
              transform: (chunk, controller) => {
                const str = typeof chunk === 'string' ? chunk : JSON.stringify(chunk);
                controller.enqueue(encoder.encode(str));
              },
            }),
          );
          await stream.switchSource(usageStream);
          await new Promise((resolve) => setTimeout(resolve, 0));
          stream.close();

          logger.info('Stream closed');
          console.log('Stream closed');
          return;
        }

        if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
          logger.error('Cannot continue message: Maximum segments reached');
          console.error('Cannot continue message: Maximum segments reached');
          throw Error('Cannot continue message: Maximum segments reached');
        }

        const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;
        logger.info(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);
        console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);

        messages.push({ role: 'assistant', content });
        messages.push({ role: 'user', content: CONTINUE_PROMPT });

        const result = await streamText({
          messages,
          env: process.env as unknown as Env,
          options,
          apiKeys,
          files,
          providerSettings,
          promptId,
          contextOptimization,
        });

        stream.switchSource(result.toDataStream());
        logger.debug('Result from streamText', result);
        console.log('Result from streamText', result);
        return;
      },
    };

    logger.info('Calling streamText');
    console.log('Calling streamText');
    const result = await streamText({
      messages,
      env: process.env as unknown as Env,
      options,
      apiKeys,
      files,
      providerSettings,
      promptId,
      contextOptimization,
    });

    stream.switchSource(result.toDataStream());
    logger.debug('Result from streamText', result);
    console.log('Result from streamText', result);
    return new Response(stream.readable, {
      status: 200,
      headers: {
        contentType: 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    logger.error('Error in chatAction', error);
    console.error('Error in chatAction', error);

    if (error.message?.includes('API key')) {
      throw new Response('Invalid or missing API key', {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
