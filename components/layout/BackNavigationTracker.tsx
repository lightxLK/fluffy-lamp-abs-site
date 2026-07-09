'use client';

import { useEffect } from 'react';
import { markBackNavigation } from '@/lib/homeReturn';

/**
 * Records whenever the user actually presses browser back/forward, as
 * opposed to clicking a link - so the home page can tell the two apart
 * before deciding whether to restore a section scroll position.
 */
export function BackNavigationTracker() {
  useEffect(() => {
    const onPopState = () => markBackNavigation();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return null;
}
