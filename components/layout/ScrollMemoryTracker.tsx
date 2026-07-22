'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { saveScrollPosition } from '@/lib/scrollMemory';

/**
 * Continuously records the current page's scroll offset against its
 * pathname, so the back button can put a page back where it was left
 * instead of always landing at the top.
 */
export function ScrollMemoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => saveScrollPosition(pathname, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
