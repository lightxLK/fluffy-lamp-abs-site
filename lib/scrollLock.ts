let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}
