'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { registerGSAP } from '@/lib/gsap';

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGSAP();
  }, []);
  return <>{children}</>;
}
