import { redirect, type LoaderFunction } from '@remix-run/cloudflare';
import { authenticator } from '~/lib/services/auth.server';

type GithubUser = {
  name: string;
  id: number;
  email: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const resp = await authenticator.authenticate('github', request);

  const newUserPayload = {
    email: resp.email as string,
    name: resp.login as string,
    githubId: resp.id,
    googleId: null,
    id: '',
    password: null,
    avatar: null,
    customerIs: '',
    subscriptionId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const response = await fetch(`https://bolt-api-o83q.onrender.com/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserPayload),
  });

  if (!response.ok) {
    // Handle error response
    throw new Error('Failed to create user');
  }

  const user: any = await response.json();
  return redirect(`/?userId=${user.id}`);
};
