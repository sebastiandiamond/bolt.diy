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

    logger.info(`GitHub profile response status: ${response.status}`);
    logger.info(`GitHub profile response status text: ${response.statusText}`);

    return response.data;
  } catch (error) {
    logger.error('Failed to fetch GitHub profile', error);
    throw new Error('Failed to fetch GitHub profile');
  }
}
