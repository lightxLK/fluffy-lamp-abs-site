'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

const BRANDS = ['SAIL', 'JSW Steel', 'Tata Steel', 'Jindal Steel', 'Bhushan Steel', 'Mittal Steel'];

export function BrandTrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const width = trackRef.current.scrollWidth / 2;
      const tween = gsap.to(trackRef.current, {
        x: -width,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
      return () => tween.kill();
    },
    { scope: trackRef },
  );

  const items = [...BRANDS, ...BRANDS];

  return (
    <section
      className="py-14 bg-bg-dark border-y border-border-subtle overflow-hidden"
      aria-label="Our steel suppliers"
    >
      <p className="text-center text-text-muted text-xs uppercase tracking-widest mb-8">
        Sourced from India&apos;s finest steel mills
      </p>
      <div ref={trackRef} className="flex gap-20 whitespace-nowrap w-max">
        {items.map((brand, i) => (
          <span key={i} className="text-text-muted text-sm font-semibold uppercase tracking-widest">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
