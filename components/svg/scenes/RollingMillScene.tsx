'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ROLLING_MILL_PATH } from './rollingMillPath';

interface RollingMillSceneProps {
  className?: string;
}

const DRAW_DURATION = 15;

export function RollingMillScene({ className }: RollingMillSceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const sketchRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const sketch = sketchRef.current;
      const fill = fillRef.current;
      if (!sketch || !fill) return;

      const length = sketch.getTotalLength();
      const preDrawnOffset = length * 0.99;
      gsap.set(sketch, { strokeDasharray: length, strokeDashoffset: preDrawnOffset, opacity: 1 });
      gsap.set(fill, { opacity: 0 });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(sketch, { strokeDashoffset: 0, opacity: 0 });
        gsap.set(fill, { opacity: 1 });
        return;
      }

      // Same crossfade handoff as the product thumbnails and ABS logo mark:
      // the fill starts fading in well before the line finishes drawing, so
      // the two read as one continuous motion instead of draw-then-fill.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(sketch, { strokeDashoffset: 0, duration: DRAW_DURATION, ease: 'power2.inOut' });
      tl.to(
        fill,
        { opacity: 1, duration: DRAW_DURATION * 0.25, ease: 'power1.out' },
        `-=${DRAW_DURATION * 0.54}`,
      );
      tl.to(sketch, { opacity: 0, duration: DRAW_DURATION * 0.25, ease: 'power1.out' }, '<');
    },
    { scope: svgRef },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 3168 1344" aria-hidden="true" className={className}>
      <path
        ref={sketchRef}
        className="abs-path"
        d={ROLLING_MILL_PATH}
        fill="none"
        stroke="var(--abs-line-art)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path ref={fillRef} d={ROLLING_MILL_PATH} fill="var(--abs-line-art)" />
    </svg>
  );
}
