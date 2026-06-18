'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { FurnaceScene } from '@/components/svg/scenes/FurnaceScene';

const SLIDES = [
  {
    eyebrow: '50 Years of Excellence',
    headline: "India's Most Trusted Steel",
    tagline: 'Trusted by builders across Eastern India since 1972.',
    cta: { label: 'Explore Products', href: '/products' },
  },
  {
    eyebrow: 'From Our Mill to Your Build',
    headline: 'Steel That Shapes India',
    tagline: 'Rolling shutter profiles, pipes, coils and more — direct from Howrah.',
    cta: { label: 'Our Products', href: '/products' },
  },
  {
    eyebrow: 'The ABS Difference',
    headline: 'Precision. Strength. Legacy.',
    tagline: '250+ dealers. 6 states. One unwavering standard.',
    cta: { label: 'About Us', href: '/about' },
  },
] as const;

export function HeroSection() {
  const autoplay = useMemo(() => Autoplay({ delay: 5000, stopOnInteraction: false }), []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    return () => autoplay.destroy();
  }, [autoplay]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className="relative h-screen min-h-[600px] bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-mid to-bg-dark" />

      <div className="absolute top-0 right-0 w-80 h-96 opacity-15 pointer-events-none">
        <FurnaceScene className="w-full h-full" />
      </div>

      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative flex-none w-full h-full flex items-center">
              <Container className="w-full">
                <p className="text-abs-blue text-xs font-medium uppercase tracking-widest mb-6">
                  {slide.eyebrow}
                </p>
                <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
                  {i === 0 ? <SplitTextReveal>{slide.headline}</SplitTextReveal> : slide.headline}
                </h1>
                <p className="text-text-muted text-lg mb-10 max-w-xl leading-relaxed">
                  {slide.tagline}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
                  >
                    {slide.cta.label}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-border-subtle text-text-muted px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:text-white hover:border-white transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              'w-2 h-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-abs-blue',
              i === selectedIndex ? 'bg-abs-blue' : 'bg-border-subtle hover:bg-text-muted',
            ].join(' ')}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-text-muted" />
      </div>
    </section>
  );
}
