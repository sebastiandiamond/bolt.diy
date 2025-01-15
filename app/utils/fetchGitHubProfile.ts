import { logger } from "./logger";
import axios from 'axios';

export async function fetchGitHubProfile(accessToken: string) {
  logger.info(`Fetching GitHub profile with access token: ${accessToken}`);

  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    // Log the headers sent in the request
    logger.info(`Request headers: ${JSON.stringify(response.config.headers)}`);

    // Log response status and text
    logger.info(`GitHub profile response status: ${response.status}`);
    logger.info(`GitHub profile response status text: ${response.statusText}`);

    return response.data;
  } catch (error) {
    logger.error('Failed to fetch GitHub profile', error);

    // Log request headers in case of an error
    if (axios.isAxiosError(error) && error.config) {
      logger.error(`Request headers during error: ${JSON.stringify(error.config.headers)}`);
    }

    throw new Error('Failed to fetch GitHub profile');
  }
}
