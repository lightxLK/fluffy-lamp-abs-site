'use client';

import { useEffect, useState } from 'react';
import { isLaunched } from '@/lib/maintenance';
import { clearPreloaderShown } from '@/lib/homeReturn';
import { MaintenancePage } from '@/components/layout/MaintenancePage';
import { ShutterReveal } from '@/components/layout/ShutterReveal';

// Tab/session-only bypass: closing the browser (not just navigating) re-locks
// the site. Reason: static export has no server, so this flag is the only
// gate there is — session scope keeps it from being a permanent "remember me".
const BYPASS_KEY = 'abs-maintenance-bypass';

// Two swipes must land within this window to count as the unlock gesture,
// otherwise two unrelated scrolls would trigger it by accident.
const SWIPE_COMBO_WINDOW_MS = 600;
const SWIPE_MIN_DISTANCE_PX = 60;

function readBypass(): boolean {
  try {
    return sessionStorage.getItem(BYPASS_KEY) === '1';
  } catch {
    return false;
  }
}

function writeBypass() {
  try {
    sessionStorage.setItem(BYPASS_KEY, '1');
  } catch {
    // sessionStorage unavailable (private mode, etc.) — bypass just won't persist.
  }
}

function clearBypass() {
  try {
    sessionStorage.removeItem(BYPASS_KEY);
  } catch {
    // sessionStorage unavailable (private mode, etc.) — nothing to clear.
  }
}

type Phase = 'loading' | 'locked' | 'revealing' | 'unlocked';

export function MaintenanceGate({ children }: { children: React.ReactNode }) {
  // Starts 'loading' on both server and client so the first client render
  // matches the static HTML (no hydration mismatch); the effect below
  // resolves the real bypass/launch state right after mount.
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    // Reads external state (clock, sessionStorage) to sync into React state
    // on mount — the canonical case the set-state-in-effect lint heuristic
    // doesn't distinguish from an accidental render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(isLaunched() || readBypass() ? 'unlocked' : 'locked');

    // Secret combo unlock: instant, no shutter video — a dev shortcut, not
    // the visitor-facing Launch button flow.
    const unlock = () => {
      writeBypass();
      // Re-arms the home preloader so revealing the site through the gate
      // always plays the intro, instead of the 30-minute skip meant for
      // ordinary back/forward navigation.
      clearPreloaderShown();
      setPhase('unlocked');
    };

    // Toggles between the maintenance overlay and the live site, so the
    // same combo can flip back and forth without a reload.
    const toggle = () => {
      setPhase((prev) => {
        const next = prev !== 'unlocked';
        if (next) {
          writeBypass();
          clearPreloaderShown();
          return 'unlocked';
        }
        clearBypass();
        return 'locked';
      });
    };

    // Ctrl/Cmd+W is intercepted where the browser allows it (embedded
    // webviews, some kiosk/PWA contexts); most browsers block preventDefault
    // on it for tab-close, so Alt+W is the combo actually relied on.
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const closeCombo = (event.ctrlKey || event.metaKey) && key === 'w';
      const altCombo = event.altKey && key === 'w';

      if (closeCombo || altCombo) {
        event.preventDefault();
        toggle();
      }
    };

    let lastSwipeAt = 0;
    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0]?.clientY ?? 0;
      const isDownwardSwipe = endY - touchStartY > SWIPE_MIN_DISTANCE_PX;
      if (!isDownwardSwipe) return;

      const now = Date.now();
      if (now - lastSwipeAt <= SWIPE_COMBO_WINDOW_MS) {
        unlock();
        lastSwipeAt = 0;
      } else {
        lastSwipeAt = now;
      }
    };

    // Re-checks the clock every second so the site unlocks itself the moment
    // the launch timestamp passes, with no user action required.
    const interval = setInterval(() => {
      if (isLaunched()) setPhase((prev) => (prev === 'locked' ? 'unlocked' : prev));
    }, 1000);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(interval);
    };
  }, []);

  // Called once the Launch button's on-page 10s countdown reaches zero.
  const handleLaunch = () => setPhase('revealing');

  // Called when the shutter video finishes (or is skipped for
  // prefers-reduced-motion) — mirrors the secret-combo unlock side effects.
  const handleRevealComplete = () => {
    writeBypass();
    clearPreloaderShown();
    setPhase('unlocked');
  };

  // Avoid a flash of the real site before the bypass/launch check resolves.
  if (phase === 'loading') return null;

  if (phase === 'locked') return <MaintenancePage onLaunch={handleLaunch} />;

  if (phase === 'revealing') {
    return (
      <>
        {children}
        <ShutterReveal onComplete={handleRevealComplete} />
      </>
    );
  }

  return children;
}
