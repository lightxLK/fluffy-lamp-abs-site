'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, useGSAP, DrawSVGPlugin } from '@/lib/gsap';

interface DrawSVGSectionProps {
  children: ReactNode;
  selector: string;
  className?: string;
  duration?: number;
}

export function DrawSVGSection({
  children,
  selector,
  className,
  duration = 1.5,
}: DrawSVGSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const paths = ref.current.querySelectorAll<SVGGeometryElement>(selector);
      if (!paths.length) return;

      // Line draws first, then fill fades in behind it. Paths rendered with
      // fill="none" (the common case) simply ignore the fillOpacity tween.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            once: true,
          },
        })
        .from(paths, { drawSVG: '0%', duration, stagger: 0.08, ease: 'power2.inOut' })
        .from(paths, { fillOpacity: 0, duration: 0.6, ease: 'power1.out' }, '-=0.3');
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
