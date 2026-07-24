'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { dotCountFor, NETWORK_STATES } from '@/data/network';
import { parseStateSvg, type Point } from '@/lib/svgGeometry';
import { sampleDotsViaRaster } from '@/lib/svgRaster';

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
// Dedupes concurrent loads of the same slug across the prefetch-all pass and
// the selected-state effect, so they never race to fetch/parse twice.
const pending = new Map<string, Promise<void>>();

function loadState(state: (typeof NETWORK_STATES)[number]): Promise<void> {
  const cached = pending.get(state.slug);
  if (cached) return cached;

  const promise = (async () => {
    if (typeof fetch === 'undefined') {
      cache.set(state.slug, null);
      return;
    }
    try {
      const res = await fetch(state.svgSrc);
      if (!res.ok) throw new Error('not found');
      const text = await res.text();

      const result = parseStateSvg(text);
      if (!result) throw new Error('unparseable svg');

      const dots = await sampleDotsViaRaster(
        text,
        result.viewBox,
        dotCountFor(state.dealers),
        state.slug,
      );

      cache.set(state.slug, { viewBox: result.viewBox, pathData: result.pathData, dots });
    } catch {
      cache.set(state.slug, null);
    }
  })().finally(() => pending.delete(state.slug));

  pending.set(state.slug, promise);
  return promise;
}

export function NetworkStateDetail({ selected, className }: NetworkStateDetailProps) {
  const state = NETWORK_STATES.find((s) => s.slug === selected) ?? NETWORK_STATES[0];
  // Bumped after an async fetch resolves to force a re-render; the actual
  // result lives in `cache` so already-resolved states never re-fetch.
  const [, setVersion] = useState(0);

  useEffect(() => {
    if (cache.has(state.slug)) return;
    let cancelled = false;
    loadState(state).then(() => {
      if (!cancelled) setVersion((v) => v + 1);
    });
    return () => {
      cancelled = true;
    };
  }, [state.slug, state.svgSrc, state.dealers]);

  // Warms every other state's SVG/dots in the background on first mount, so
  // switching to a state not viewed yet doesn't blank to the loading skeleton.
  useEffect(() => {
    let cancelled = false;
    NETWORK_STATES.forEach((s) => {
      if (cache.has(s.slug)) return;
      loadState(s).then(() => {
        if (!cancelled && s.slug === selected) setVersion((v) => v + 1);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parsed = cache.get(state.slug);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!parsed || !svgRef.current) return;

      // Two layers share the same outline: `.abs-sketch` (stroked, fill:none)
      // plays the DrawSVG reveal, then hands off to `.abs-fill` (solid,
      // no stroke) for the resting frame — the line art itself is a thin
      // drawn ribbon, so stroking it at rest would trace both of its edges
      // as a double line. Filling it is the single clean line.
      const sketch = svgRef.current.querySelectorAll<SVGGeometryElement>('.abs-sketch');
      const fill = svgRef.current.querySelectorAll<SVGGeometryElement>('.abs-fill');
      const dots = svgRef.current.querySelectorAll<SVGCircleElement>('.abs-dot');
      if (!sketch.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(sketch, { opacity: 0 });
        gsap.set(fill, { opacity: 1 });
        gsap.set(dots, { scale: 1, opacity: 1 });
        return;
      }

      gsap.set(sketch, { drawSVG: '0%', opacity: 1 });
      gsap.set(fill, { opacity: 0 });
      gsap.set(dots, { scale: 0, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(sketch, { drawSVG: '100%', duration: 2.6, ease: 'power2.inOut', stagger: 0.15 });
      tl.to(fill, { opacity: 1, duration: 0.7, ease: 'power1.out' }, '-=0.5');
      tl.to(sketch, { opacity: 0, duration: 0.6, ease: 'power1.out' }, '<');
      if (dots.length) {
        tl.to(
          dots,
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(1.7)' },
          '-=0.2',
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
                key={`${state.slug}-sketch-${i}`}
                d={d}
                className="abs-sketch"
                fill="none"
                stroke="var(--color-line-art)"
                strokeWidth={Math.max(1.5, Number(parsed.viewBox.split(' ')[2]) / 400)}
                strokeLinejoin="round"
              />
            ))}
            {parsed.pathData.map((d, i) => (
              <path
                key={`${state.slug}-fill-${i}`}
                d={d}
                className="abs-fill"
                fill="var(--color-line-art)"
              />
            ))}
            {parsed.dots.map((pt, i) => (
              <circle
                key={`${state.slug}-dot-${i}`}
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
