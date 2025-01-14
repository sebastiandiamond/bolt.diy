import type { LoaderFunction } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/react';
import { authenticator } from '~/lib/services/auth.server';

type GoogleUser = {
  sub: string;
  picture: string;
  email: string;
  name: string;
};

export let loader: LoaderFunction = async ({ request }) => {
  const resp = await authenticator.authenticate('google', request);

  const newUserPayload = {
    email: resp.email as string,
    name: resp.name as string,
    avatar: resp.picture as string,
    googleId: resp.sub as string,
    id: '',
    githubId: null,
    password: null,
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
