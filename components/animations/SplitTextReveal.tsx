'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, useGSAP, SplitText } from '@/lib/gsap';

interface SplitTextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SplitTextReveal({ children, className, delay = 0 }: SplitTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(ref.current, { type: 'chars' });
      gsap.from(split.chars, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
