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
  /** Draw once, triggered by `active` flipping true (instead of scroll), and reset when it flips false. */
  once?: boolean;
  /** Stroke color for the path. */
  stroke?: string;
}

export function ABSLogoMarkScene({
  className,
  loop = false,
  active = true,
  once = false,
  stroke = 'var(--abs-line-art)',
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

      gsap.set(path, { drawSVG: '0%' });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(path, { drawSVG: loop && !active ? '0%' : '100%' });
        return;
      }

      if (loop) {
        if (!active) return;
        tweenRef.current = gsap.to(path, {
          drawSVG: '100%',
          duration: 1.4,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.15,
        });
        return;
      }

      if (once) {
        if (!active) return;
        tweenRef.current = gsap.to(path, {
          drawSVG: '100%',
          duration: 2.8,
          ease: 'power2.inOut',
        });
        return;
      }

      tweenRef.current = gsap.to(path, {
        drawSVG: '100%',
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
    { scope: svgRef, dependencies: [loop, active, once] },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 2000 2000" aria-hidden="true" className={className}>
      <path
        ref={pathRef}
        d={ABS_LOGO_MARK_PATH}
        fill="none"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
