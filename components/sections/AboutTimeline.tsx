'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Container } from '@/components/layout/Container';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { TIMELINE } from '@/data/timeline';

export function AboutTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.matchMedia('(max-width: 1023px)').matches) return;

      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative bg-bg-dark py-24 overflow-hidden" id="timeline">
      <Container>
        <div className="mb-14">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            The Journey
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            1975 to present
          </h2>
        </div>
      </Container>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-6 px-6 lg:px-8 w-max">
          {TIMELINE.map((entry) => (
            <article key={entry.year} className="relative w-[280px] sm:w-[340px] shrink-0">
              <CardGlow className="h-full p-8">
                <p className="text-abs-blue font-bold text-3xl mb-4">{entry.year}</p>
                <h3 className="text-text-primary font-semibold text-lg mb-3">{entry.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{entry.body}</p>
              </CardGlow>
              <CardNuts />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
