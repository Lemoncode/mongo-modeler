export function isMacOS() {
  return navigator.userAgent.toLowerCase().includes('mac');
}

export function isWindowsOrLinux() {
  return !isMacOS();
}
