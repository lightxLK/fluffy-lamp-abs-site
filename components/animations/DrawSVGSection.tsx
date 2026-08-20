'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, useGSAP, DrawSVGPlugin } from '@/lib/gsap';

interface DrawSVGSectionProps {
  children: ReactNode;
  selector: string;
  className?: string;
  duration?: number;
  /** Per-path stagger offset in seconds. Lower for scenes with hundreds of
   * paths (e.g. potrace output) so the reveal doesn't stretch on for tens
   * of seconds. */
  stagger?: number;
}

export function DrawSVGSection({
  children,
  selector,
  className,
  duration = 1.5,
  stagger = 0.08,
}: DrawSVGSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const paths = ref.current.querySelectorAll<SVGGeometryElement>(selector);
      if (!paths.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(paths, { fillOpacity: 1 });
        return;
      }

      // Same crossfade handoff as the ABS logo scene: the fill starts
      // fading in well before the line finishes drawing, so the two read
      // as one continuous motion instead of a draw-then-fill sequence.
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
          { drawSVG: '100%', duration, stagger, ease: 'power2.inOut' },
        )
        .to(
          paths,
          { fillOpacity: 1, duration: duration * 0.25, ease: 'power1.out' },
          `-=${duration * 0.54}`,
        );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
