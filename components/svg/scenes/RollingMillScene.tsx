'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ROLLING_MILL_PATH } from './rollingMillPath';

interface RollingMillSceneProps {
  className?: string;
}

export function RollingMillScene({ className }: RollingMillSceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      const preDrawnOffset = length * 0.9;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: preDrawnOffset });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(path, { strokeDashoffset: 0 });
        return;
      }

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 15,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: svgRef },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 3168 1344" aria-hidden="true" className={className}>
      <path
        ref={pathRef}
        className="abs-path"
        d={ROLLING_MILL_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
