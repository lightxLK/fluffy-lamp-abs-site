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

      // Line draws first, then the fill snaps in the instant the draw
      // finishes. Paths rendered with fill="none" (the common case) simply
      // ignore the fillOpacity set.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            once: true,
          },
        })
        .fromTo(
          paths,
          { drawSVG: '0%', fillOpacity: 0 },
          { drawSVG: '100%', duration, stagger: 0.08, ease: 'power2.inOut' },
        )
        .set(paths, { fillOpacity: 1 });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
