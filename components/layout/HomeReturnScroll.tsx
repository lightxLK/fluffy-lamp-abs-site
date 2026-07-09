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
 * gesture from a home page CTA. Lives at the layout level (not inside
 * HomePreloader) because Next's client router cache can reuse a previously
 * rendered "/" page instance on back navigation without remounting it -
 * a mount-scoped effect inside the page would simply never re-run in that
 * case. usePathname() here reliably reflects every route change regardless
 * of whether the underlying page component remounted.
 */
export function HomeReturnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const cameViaBack = consumeWasBackNavigation();
    const sectionId = consumeHomeReturnSection();
    if (!cameViaBack || !sectionId) return;

    scrollToSectionWhenReady(sectionId);
  }, [pathname]);

  return null;
}
