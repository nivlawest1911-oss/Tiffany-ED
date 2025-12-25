export const getFingerprint = () => {
  if (typeof window === 'undefined') return 'server-side';
  const nav = window.navigator;
  const screen = window.screen;
  let fingerprint = [
    nav.userAgent.length,
    nav.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height
  ].join('-');
  return btoa(fingerprint).substring(0, 12);
};
