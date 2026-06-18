'use client';

import type { ReactNode } from 'react';
import '@/lib/gsap';

export function GSAPProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
