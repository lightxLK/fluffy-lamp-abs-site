'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

/**
 * Fixed corner button that goes back to wherever the visitor came from.
 * Uses router.back() (real browser history), so HomeReturnScroll's
 * back-navigation handling restores the previous page's exact scroll
 * offset, or the exact home page section, the same way a physical back
 * gesture would. Always rendered: on the rare direct-load page with no
 * prior history, router.back() is a harmless no-op.
 */
export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center shadow-lg text-text-primary hover:bg-bg-mid transition-colors duration-300"
    >
      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
