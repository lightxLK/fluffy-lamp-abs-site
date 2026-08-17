'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { READY_TO_BUILD_PATH } from './readyToBuildPath';

interface ReadyToBuildSceneProps {
  className?: string;
}

export function ReadyToBuildScene({ className }: ReadyToBuildSceneProps) {
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
        duration: 15,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: svgRef },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 1470 600" aria-hidden="true" className={className}>
      <path
        ref={pathRef}
        d={READY_TO_BUILD_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
