'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MOBILE_CONTACT_STRIP_PATH } from './mobileContactStripPath';

interface MobileContactStripSceneProps {
  className?: string;
}

export function MobileContactStripScene({ className }: MobileContactStripSceneProps) {
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
        duration: 25,
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
    <svg ref={svgRef} viewBox="0 0 540 217.499994" aria-hidden="true" className={className}>
      <path
        ref={pathRef}
        d={MOBILE_CONTACT_STRIP_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
