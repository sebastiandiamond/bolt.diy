export function useHandleFreeTrial(user: User | null): boolean {
  if (!user || !user.subscription || user.subscription.status !== 'trialing') {
    return false; // User is not on a trial plan
  }

  const trialStartDate = new Date(user.subscription.currentPeriodStart);
  const currentDate = new Date();
  const trialDuration = 24 * 60 * 60 * 1000;

  // Check if 24 hours have passed since the trial start date
  return user.subscription.status === 'trialing' && currentDate.getTime() - trialStartDate.getTime() >= trialDuration;
}
