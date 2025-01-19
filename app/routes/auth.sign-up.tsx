import { data, Form, Link, redirect, useActionData, type MetaFunction } from '@remix-run/react';
import { getSession } from '~/lib/services/session.server';
import { authenticator } from '~/lib/services/auth.server';
import Input from '~/components/ui/input';
import type { FormInputs } from '~/types/auth';
import { getRandomGradient } from '~/utils/getRandomGradient';
import AuthButton from '~/components/ui/AuthButton';
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sign Up - XONO' },
    { name: 'description', content: 'Talk with Bolt, an AI assistant from StackBlitz' },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const resp: any = await authenticator.authenticate('user-pass', request);

  if (resp.email.error || resp.username.error || resp.password?.error || resp.confirmPassword?.error) {
    return resp;
  } else {
    const userPayload = {
      email: resp.email.value as string,
      name: resp.username.value as string,
      password: resp.password.value,
      avatar: getRandomGradient(),
      githubId: null,
      googleId: null,
      id: '',
      subscriptionId: null,
      customerIs: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(userPayload);
    const response = await fetch(`https://bolt-api-o83q.onrender.com/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPayload),
    });
    console.log(response);
    if (!response.ok) {
      // Handle error response
      return { error: 'Failed to create user' };
    }

    const user: any = await response.json();
    return redirect(`/?userId=${user.id}`);
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = session.get('user');
  if (user) throw redirect('/');
  return data(null);
};

export default function SignUpPage() {
  const actionData = useActionData<FormInputs>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (actionData) {
      setLoading(false);
    }
  }, [actionData]);
  return (
    <div className="pt-24 pb-10 min-h-screen bg-bolt-elements-background-depth-2 flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-10 w-[344px]">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-bolt-elements-textPrimary text-3xl font-semibold">Get Started</h1>
          <p className="text-bolt-elements-textSecondary">Create your XONO account.</p>
        </div>
        <div className="flex items-center flex-col gap-7 rounded-md flex items-center justify-center">
          <AuthButton provider="google" icon="Google-login" />
          {/* <span className="text-bolt-elements-textSecondary">- or -</span> */}
          {/* <Form method="post" className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Input placeholder="Email" id="email" name="email" type="email" error={actionData?.email.error} />
              <Input placeholder="Username" id="username" name="username" error={actionData?.username.error} />
              <Input
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                error={actionData?.password.error}
              />
              <Input
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                error={actionData?.confirmPassword.error}
              />

              <button
                type="submit"
                className="flex items-center gap-2 p-[13px] text-sm text-bolt-elements-textPrimary rounded-md w-full hover:bg-bolt-elements-background-depth-4 border border-bolt-elements-borderColor dark:bg-[#292d32] bg-bolt-elements-prompt-background justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="i-svg-spinners:90-ring-with-bg size-5"></span>
                ) : (
                  <span className="text-sm font-semibold">Sign Up</span>
                )}
              </button>
              <Link to="/auth/sign-in">
                <p className="text-bolt-elements-textSecondary text-sm text-center underline">
                  Have an account? Sign In.
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
