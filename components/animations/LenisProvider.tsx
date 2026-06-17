'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createLenis } from '@/lib/lenis';

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { cleanup } = createLenis();
    return cleanup;
  }, []);

  return <>{children}</>;
}
