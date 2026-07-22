'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { getLenis } from '@/lib/lenis';

/**
 * Fixed corner button. On every page except home it goes back to wherever
 * the visitor came from, using router.back() (real browser history), so
 * HomeReturnScroll's back-navigation handling restores the previous page's
 * exact scroll offset, or the exact home page section, the same way a
 * physical back gesture would. On the home page there is nowhere useful to
 * go "back" to, so it instead scrolls back to the top of the page.
 */
export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={isHome ? scrollToTop : () => router.back()}
      aria-label={isHome ? 'Back to top' : 'Go back'}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center shadow-lg text-text-primary hover:bg-bg-mid transition-colors duration-300"
    >
      {isHome ? (
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      ) : (
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
}
