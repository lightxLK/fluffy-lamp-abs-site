'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';
import { consumeHomeReturnSection, consumeWasBackNavigation } from '@/lib/homeReturn';

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
 * Restores scroll position when landing back on "/" via a real back/forward
 * gesture from a home page CTA. Also resets scroll to top on every other
 * route change: Lenis owns scroll independently of the browser and the
 * LenisProvider mounts once at the layout level, so without this it keeps
 * whatever offset the previous page was at, and short destination pages
 * (e.g. the Abrasives product page) clamp that offset to their own bottom.
 * Lives at the layout level (not inside HomePreloader) because Next's client
 * router cache can reuse a previously rendered "/" page instance on back
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

    if (pathname === '/' && cameViaBack && sectionId) {
      scrollToSectionWhenReady(sectionId);
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
