const PREFIX = 'abs:scroll:';

/** Per-pathname scroll offset, so the back button can restore where a page was left. */
export function saveScrollPosition(pathname: string, y: number): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PREFIX + pathname, String(y));
}

export function getScrollPosition(pathname: string): number | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(PREFIX + pathname);
  if (raw === null) return null;
  const y = Number(raw);
  return Number.isFinite(y) ? y : null;
}
