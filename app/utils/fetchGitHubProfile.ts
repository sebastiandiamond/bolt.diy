import { logger } from "./logger";

export async function fetchGitHubProfile(accessToken: string) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  logger.info(`GitHub profile response: ${response}`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub profile');
  }

  return response.json();
}
