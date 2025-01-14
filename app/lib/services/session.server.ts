import { createCookieSessionStorage } from '@remix-run/cloudflare';
import 'dotenv/config';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable is not set');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // secrets: [sessionSecret],
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

export async function getSession(request: Request) {
  console.log('Session Secret:', sessionSecret);
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export async function commitSession(session: any) {
  return sessionStorage.commitSession(session);
}
