'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { APPLICATIONS_PATH } from './applicationsPath';

interface ApplicationsSceneProps {
  className?: string;
}

export function ApplicationsScene({ className }: ApplicationsSceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(path, { strokeDashoffset: 0 });
        return;
      }

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: svgRef },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 2189 10826" aria-hidden="true" className={className}>
      <path
        ref={pathRef}
        d={APPLICATIONS_PATH}
        fill="none"
        stroke="var(--abs-line-art)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
