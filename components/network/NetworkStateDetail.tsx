'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { dotCountFor, NETWORK_STATES } from '@/data/network';
import {
  parsePathToPolygon,
  parseStateSvg,
  samplePointsInPolygon,
  type Point,
} from '@/lib/svgGeometry';

interface NetworkStateDetailProps {
  selected: string;
  className?: string;
}

interface ParsedState {
  viewBox: string;
  pathData: string[];
  dots: Point[];
}

const cache = new Map<string, ParsedState | null>();

export function NetworkStateDetail({ selected, className }: NetworkStateDetailProps) {
  const state = NETWORK_STATES.find((s) => s.slug === selected) ?? NETWORK_STATES[0];
  // Bumped after an async fetch resolves to force a re-render; the actual
  // result lives in `cache` so already-resolved states never re-fetch.
  const [, setVersion] = useState(0);

  useEffect(() => {
    if (cache.has(state.slug)) return;

    let cancelled = false;

    if (typeof fetch === 'undefined') {
      Promise.resolve().then(() => {
        cache.set(state.slug, null);
        if (!cancelled) setVersion((v) => v + 1);
      });
      return () => {
        cancelled = true;
      };
    }

    fetch(state.svgSrc)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error('not found'))))
      .then((text) => {
        const result = parseStateSvg(text);
        if (!result) throw new Error('unparseable svg');

        const polygon = result.pathData.flatMap(parsePathToPolygon);
        const dots = samplePointsInPolygon(polygon, dotCountFor(state.dealers), state.slug);

        cache.set(state.slug, { viewBox: result.viewBox, pathData: result.pathData, dots });
        if (!cancelled) setVersion((v) => v + 1);
      })
      .catch(() => {
        cache.set(state.slug, null);
        if (!cancelled) setVersion((v) => v + 1);
      });

    return () => {
      cancelled = true;
    };
  }, [state.slug, state.svgSrc, state.dealers]);

  const parsed = cache.get(state.slug);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!parsed || !svgRef.current) return;

      const paths = svgRef.current.querySelectorAll<SVGGeometryElement>('.abs-path');
      const dots = svgRef.current.querySelectorAll<SVGCircleElement>('.abs-dot');
      if (!paths.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(paths, { drawSVG: '100%' });
        gsap.set(dots, { scale: 1, opacity: 1 });
        return;
      }

      const tl = gsap.timeline();
      tl.fromTo(
        paths,
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', stagger: 0.08 },
      );
      if (dots.length) {
        tl.fromTo(
          dots,
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.02, ease: 'back.out(1.7)' },
          '-=0.3',
        );
      }
    },
    { scope: svgRef, dependencies: [selected, parsed] },
  );

  return (
    <div className={className}>
      <div className="flex aspect-square w-full items-center justify-center">
        {parsed === undefined && <StateSkeleton />}
        {parsed === null && <StatePlaceholder dealers={state.dealers} />}
        {parsed && (
          <svg
            ref={svgRef}
            viewBox={parsed.viewBox}
            className="h-full w-full"
            role="img"
            aria-label={`${state.name} dealer network map`}
          >
            {parsed.pathData.map((d, i) => (
              <path
                key={i}
                d={d}
                className="abs-path"
                fill="none"
                stroke="var(--color-line-art)"
                strokeWidth={Math.max(2, Number(parsed.viewBox.split(' ')[2]) / 300)}
                strokeLinejoin="round"
              />
            ))}
            {parsed.dots.map((pt, i) => (
              <circle
                key={i}
                className="abs-dot"
                cx={pt.x}
                cy={pt.y}
                r={Math.max(3, Number(parsed.viewBox.split(' ')[2]) / 150)}
                fill="var(--color-abs-blue)"
              />
            ))}
          </svg>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-text-primary text-xl font-bold">{state.name}</p>
        <p className="text-text-muted mt-1 text-xs tracking-wide uppercase">
          {state.dealers} dealers · network coverage
        </p>
      </div>
    </div>
  );
}

function StateSkeleton() {
  return (
    <div
      className="relative z-[2] h-2/3 w-2/3 animate-pulse rounded-lg bg-bg-mid"
      aria-hidden="true"
    />
  );
}

function StatePlaceholder({ dealers }: { dealers: number }) {
  const dotCount = dotCountFor(dealers);
  return (
    <div
      className="border-border-subtle relative z-[2] flex h-2/3 w-2/3 flex-wrap content-center items-center justify-center gap-2 rounded-lg border border-dashed p-6"
      aria-hidden="true"
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <span key={i} className="bg-abs-blue/60 h-2 w-2 rounded-full" />
      ))}
    </div>
  );
}
