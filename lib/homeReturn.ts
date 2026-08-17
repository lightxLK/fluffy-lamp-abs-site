const PRELOADER_SHOWN_KEY = 'abs:home-preloader-shown-at';
const RETURN_SECTION_KEY = 'abs:home-return-section';
const BACK_NAVIGATION_KEY = 'abs:last-nav-was-back';
const PRELOADER_SESSION_MS = 30 * 60 * 1000;

/** Whether the home preloader already played within the last 30 minutes. */
export function wasPreloaderShownRecently(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = window.sessionStorage.getItem(PRELOADER_SHOWN_KEY);
  if (!raw) return false;
  const shownAt = Number(raw);
  if (!Number.isFinite(shownAt)) return false;
  return Date.now() - shownAt < PRELOADER_SESSION_MS;
}

export function markPreloaderShown(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PRELOADER_SHOWN_KEY, String(Date.now()));
}

/** Forces the next home-page mount to replay the preloader, bypassing the 30-minute skip. */
export function clearPreloaderShown(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(PRELOADER_SHOWN_KEY);
}

/**
 * Called from a CTA on the home page right before navigating away, so that
 * coming back (via back button or a link back to "/") can restore the
 * section the user left from instead of dumping them at the top.
 */
export function markHomeSectionExit(sectionId: string): void {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== '/') return;
  window.sessionStorage.setItem(RETURN_SECTION_KEY, sectionId);
}

/** Non-destructive read, for deciding whether to force-replay the preloader. */
export function peekHomeReturnSection(): string | null {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage.getItem(RETURN_SECTION_KEY);
}

/** Reads and clears the pending return section in one step. */
export function consumeHomeReturnSection(): string | null {
  if (typeof window === 'undefined') return null;
  const sectionId = window.sessionStorage.getItem(RETURN_SECTION_KEY);
  window.sessionStorage.removeItem(RETURN_SECTION_KEY);
  return sectionId;
}

/**
 * Set by a global popstate listener so the next page mount can tell whether
 * it was reached via a real browser back/forward gesture, as opposed to a
 * regular link click (which also lands on "/" but isn't "going back").
 */
export function markBackNavigation(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(BACK_NAVIGATION_KEY, '1');
}

/** Reads and clears the back-navigation flag in one step. */
export function consumeWasBackNavigation(): boolean {
  if (typeof window === 'undefined') return false;
  const value = window.sessionStorage.getItem(BACK_NAVIGATION_KEY);
  window.sessionStorage.removeItem(BACK_NAVIGATION_KEY);
  return value === '1';
}

/** Non-destructive read, for a component that only wants to peek at the flag. */
export function peekWasBackNavigation(): boolean {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(BACK_NAVIGATION_KEY) === '1';
}
