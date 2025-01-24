export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome');
} 