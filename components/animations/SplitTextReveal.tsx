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

      const split = new SplitText(ref.current, { type: 'words, chars' });
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
    // role="text" lets SplitText's auto aria-label (set on this span once it
    // splits into chars/words) pass ARIA validation — a bare <span> has an
    // implicit generic role, which doesn't permit aria-label on its own.
    <span ref={ref} role="text" className={className}>
      {children}
    </span>
  );
}
