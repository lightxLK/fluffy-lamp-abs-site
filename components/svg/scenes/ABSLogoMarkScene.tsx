'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ABS_LOGO_MARK_PATH } from './absLogoMarkPath';

interface ABSLogoMarkSceneProps {
  className?: string;
  /** Loop the draw/undraw animation continuously instead of a one-shot scroll-triggered draw. */
  loop?: boolean;
  /** When `loop` is set, controls whether the looping animation is running. */
  active?: boolean;
}

export function ABSLogoMarkScene({
  className,
  loop = false,
  active = true,
}: ABSLogoMarkSceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      tweenRef.current?.kill();
      tweenRef.current = null;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(path, { strokeDashoffset: loop && !active ? length : 0 });
        return;
      }

      if (loop) {
        if (!active) return;
        tweenRef.current = gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.15,
        });
        return;
      }

      tweenRef.current = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: svgRef, dependencies: [loop, active] },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 2000 2000" aria-hidden="true" className={className}>
      <path
        ref={pathRef}
        d={ABS_LOGO_MARK_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
