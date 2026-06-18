'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

const STATS = [
  '50 Years',
  '250+ Dealers',
  '1,00,000 MT Capacity',
  '85% West Bengal',
  '70+ Professionals',
];

export function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const width = trackRef.current.scrollWidth / 2;
      const tween = gsap.to(trackRef.current, {
        x: -width,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
      return () => tween.kill();
    },
    { scope: trackRef },
  );

  const items = [...STATS, ...STATS];

  return (
    <section
      className="bg-bg-card border-y border-border-subtle overflow-hidden py-5"
      aria-label="Trust statistics"
    >
      <div ref={trackRef} className="flex gap-16 whitespace-nowrap w-max">
        {items.map((stat, i) => (
          <span
            key={i}
            className="text-text-muted text-xs font-medium uppercase tracking-widest flex items-center gap-4"
          >
            {stat}
            <span className="w-1 h-1 rounded-full bg-abs-blue inline-block" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
