import { data, Form, Link, redirect, useActionData, type MetaFunction } from '@remix-run/react';
import Input from '~/components/ui/input';
import { authenticator } from '~/lib/services/auth.server';
import type { LoginFormInputs } from '~/types/auth';
import bcrypt from 'bcryptjs';
import { getSession } from '~/lib/services/session.server';
import AuthButton from '~/components/ui/AuthButton';
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare';
import fetch from 'node-fetch';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Sign In - XONO' }, { name: 'description', content: 'Talk with XONO, an AI assistant' }];
};

export const action: ActionFunction = async ({ request }) => {
  const resp = await authenticator.authenticate('sign-in', request);

  if (resp.email_username.error || resp.password?.error) {
    return resp;
  } else {
    const response = await fetch(
      `https://bolt-api-o83q.onrender.com/api/v1/users?emailOrName=${encodeURIComponent(resp.email_username.value)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user: any = await response.json();

    if (user && (await bcrypt.compare(resp.password.value, user.password || ''))) {
      return redirect(`/?userId=${user.id}`);
    } else {
      resp.password.error = "Password doesn't match";
      return resp;
    }
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = session.get('user');
  if (user) throw redirect('/');
  return data(null);
};

export default function SignInPage() {
  const actionData = useActionData<LoginFormInputs>();
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = () => {
    setLoading(true); // Set loading to true on submit
  };

  useEffect(() => {
    if (actionData) {
      setLoading(false); // Stop loading when actionData is received
    }
  }, [actionData]);

  return (
    <div className="pt-24 pb-10 min-h-screen bg-bolt-elements-background-depth-2 flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-10 w-[344px]">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-bolt-elements-textPrimary text-3xl font-semibold">Welcome back</h1>
          <p className="text-bolt-elements-textSecondary">Sign in to XONO with your Google account or credentials.</p>
        </div>
        <div className="flex items-center flex-col gap-7 rounded-md flex items-center justify-center ">
          <AuthButton provider="google" icon="Google-login" />
          {/* <span className="text-bolt-elements-textSecondary">- or -</span>
          <Form method="post" className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2">
              <Input
                placeholder="Email or Username"
                id="email_username"
                name="email_username"
                error={actionData?.email_username.error}
              />
              <Input placeholder="Password" id="password" name="password" error={actionData?.password.error} />
              <button
                type="submit"
                className="flex items-center gap-2 p-[13px] text-sm text-bolt-elements-textPrimary rounded-md w-full hover:bg-bolt-elements-background-depth-4 border border-bolt-elements-borderColor dark:bg-[#292d32] bg-bolt-elements-prompt-background justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="i-svg-spinners:90-ring-with-bg size-5"></span>
                ) : (
                  <span className="text-sm font-semibold">Sign In</span>
                )}
              </button>
              <Link to="/auth/sign-up">
                <p className="text-bolt-elements-textSecondary text-sm text-center underline">
                  Don't have an account? Sign Up.
                </p>
              </Link>
            </div>
          </Form> */}

          <div className="text-bolt-elements-textSecondary text-xs">
          </div>
        </div>
      </div>
    </div>
  );
}
