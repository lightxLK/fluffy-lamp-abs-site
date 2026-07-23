'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ABS_LOGO_STROKE_PATH } from './absLogoStrokePath';

interface ABSLogoMarkSceneProps {
  className?: string;
  /** Stroke/fill color for the path. */
  stroke?: string;
}

const VIEWBOX = '-1 -1 1513 1070';

export function ABSLogoMarkScene({
  className,
  stroke = 'var(--abs-line-art)',
}: ABSLogoMarkSceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      // Same two-layer handoff as the network state maps: `.abs-sketch`
      // (stroked, fill:none) plays the DrawSVG reveal, then `.abs-fill`
      // (solid, no stroke) fades in for the resting frame — the line art is
      // a thin drawn ribbon, so stroking it at rest would trace both edges.
      const sketch = svgRef.current.querySelector<SVGGeometryElement>('.abs-sketch');
      const fill = svgRef.current.querySelector<SVGGeometryElement>('.abs-fill');
      if (!sketch || !fill) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(sketch, { opacity: 0 });
        gsap.set(fill, { opacity: 1 });
        return;
      }

      gsap.set(sketch, { drawSVG: '0%', opacity: 1 });
      gsap.set(fill, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
      tl.to(sketch, { drawSVG: '100%', duration: 2.8, ease: 'power2.inOut' });
      tl.set(fill, { opacity: 1 });
      tl.set(sketch, { opacity: 0 });
    },
    { scope: svgRef },
  );

  return (
    <svg ref={svgRef} viewBox={VIEWBOX} aria-hidden="true" className={className}>
      <path
        className="abs-sketch"
        d={ABS_LOGO_STROKE_PATH}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path className="abs-fill" d={ABS_LOGO_STROKE_PATH} fill={stroke} />
    </svg>
  );
}
