import { logger } from "./logger";

export async function fetchGitHubProfile(accessToken: string) {
  logger.info(`Fetching GitHub profile with access token: ${accessToken}`);
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })


  logger.info(`GitHub profile response status: ${response.status}`);
  logger.info(`GitHub profile response status text: ${response.ok}`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch GitHub profile');
  }

  return response.json();
}
