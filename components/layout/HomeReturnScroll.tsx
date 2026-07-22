'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';
import { consumeHomeReturnSection, consumeWasBackNavigation } from '@/lib/homeReturn';
import { getScrollPosition } from '@/lib/scrollMemory';

function scrollToY(y: number) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(y, { immediate: true });
  } else {
    window.scrollTo(0, y);
  }
  ScrollTrigger.refresh();
}

function scrollElementIntoView(el: HTMLElement) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { immediate: true });
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  ScrollTrigger.refresh();
}

/**
 * The target section may belong to a dynamically-imported component whose
 * chunk hasn't finished mounting yet, so retry for a bit instead of giving
 * up on the first miss.
 */
function scrollToSectionWhenReady(sectionId: string, attemptsLeft = 30) {
  const el = document.getElementById(sectionId);
  if (el) {
    scrollElementIntoView(el);
    return;
  }
  if (attemptsLeft <= 0) return;
  window.setTimeout(() => scrollToSectionWhenReady(sectionId, attemptsLeft - 1), 100);
}

/**
 * Restores scroll position on every route change. Lenis owns scroll
 * independently of the browser and the LenisProvider mounts once at the
 * layout level, so without this it keeps whatever offset the previous page
 * was at, and short destination pages (e.g. the Abrasives product page)
 * clamp that offset to their own bottom.
 *
 * Forward navigation (clicking a link) always lands at the top. Backward
 * navigation (browser back/forward, or the BackButton, which drives the
 * same history API) restores the home page's exact section if the CTA that
 * left it recorded one, otherwise the pixel offset ScrollMemoryTracker last
 * saved for this pathname, otherwise the top.
 *
 * Lives at the layout level (not inside HomePreloader) because Next's client
 * router cache can reuse a previously rendered page instance on back
 * navigation without remounting it - a mount-scoped effect inside the page
 * would simply never re-run in that case. usePathname() here reliably
 * reflects every route change regardless of whether the underlying page
 * component remounted.
 */
export function HomeReturnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const cameViaBack = consumeWasBackNavigation();
    const sectionId = pathname === '/' ? consumeHomeReturnSection() : null;

    if (cameViaBack && pathname === '/' && sectionId) {
      scrollToSectionWhenReady(sectionId);
      return;
    }

    if (cameViaBack) {
      const savedY = getScrollPosition(pathname);
      if (savedY !== null) {
        scrollToY(savedY);
        return;
      }
    }

    scrollToY(0);
  }, [pathname]);

  return null;
}
