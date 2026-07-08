import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';

interface ProductPageHeroProps {
  category: string;
  brandLine: string;
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  scene: ReactNode;
}

export function ProductPageHero({
  category,
  brandLine,
  name,
  tagline,
  description,
  capacity,
  scene,
}: ProductPageHeroProps) {
  return (
    <section className="relative bg-bg-dark pt-40 pb-20 overflow-hidden">
      <DrawSVGSection
        selector=".abs-path"
        className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none"
      >
        {scene}
      </DrawSVGSection>

      <Container className="relative">
        <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
          {category} · {brandLine}
        </p>
        <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-2xl">
          <SplitTextReveal>{name}</SplitTextReveal>
        </h1>
        <p className="text-text-muted text-lg mb-6 max-w-xl">{tagline}</p>
        <p className="text-text-body text-base leading-relaxed max-w-xl mb-8">{description}</p>
        <div className="inline-flex items-center gap-3 border border-border-subtle px-5 py-3">
          <span className="w-1.5 h-1.5 rounded-full bg-abs-blue" aria-hidden="true" />
          <span className="text-text-muted text-xs uppercase tracking-widest">
            Annual Capacity: {capacity}
          </span>
        </div>
      </Container>
    </section>
  );
}
