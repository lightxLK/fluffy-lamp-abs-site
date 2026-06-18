'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { EastIndiaMapScene } from '@/components/svg/scenes/EastIndiaMapScene';

const STATS = [
  { end: 250, suffix: '+', label: 'Dealers' },
  { end: 6, suffix: '', label: 'States' },
  { end: 100000, suffix: ' MT', label: 'Annual Capacity' },
  { end: 50, suffix: '+', label: 'Years' },
];

export function NetworkSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!statsRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      statsRef.current.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
        const end = Number(el.dataset.counter);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: end,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: end > 1000 ? 100 : 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          },
        );
      });
    },
    { scope: statsRef },
  );

  return (
    <section className="bg-bg-dark py-24" id="network">
      <Container>
        <div className="mb-14">
          <p className="text-abs-blue text-xs font-medium uppercase tracking-widest mb-4">
            Eastern India &amp; Beyond
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Our Network
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-t border-border-subtle pt-6">
                <p className="text-text-primary font-bold text-5xl leading-none mb-2">
                  <span data-counter={stat.end}>0</span>
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-text-muted text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <DrawSVGSection selector=".abs-path">
            <EastIndiaMapScene className="w-full h-auto opacity-70 max-h-96" />
          </DrawSVGSection>
        </div>
      </Container>
    </section>
  );
}
