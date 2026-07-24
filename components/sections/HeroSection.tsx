'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';

const SLIDES = [
  {
    eyebrow: '50 Years of Excellence',
    headline: "Eastern India's Most Trusted Steel Manufacturer",
    tagline: 'Trusted by builders across Eastern India since 1972.',
    cta: { label: 'Explore Products', href: '/products' },
  },
  {
    eyebrow: 'From Our Mill to Your Build',
    headline: 'Steel That Shapes India',
    tagline: 'Rolling shutter profiles, pipes, coils and more, direct from Howrah.',
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

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // z-[2] on the section: paints above the site-wide steel-texture overlay (z-1)
  // so the hero video stays clean of it, while remaining below the navbar (z-60).
  return (
    <section className="relative z-[2] h-dvh min-h-[600px] bg-bg-dark overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // The poster (this page's LCP element) loads via the `poster` attribute
        // regardless of `preload`, so eager preload here only helps autoplay
        // start reliably — it doesn't compete with the poster fetch.
        // React's video attribute types don't include fetchPriority yet.
        {...{ fetchPriority: 'high' }}
      >
        <source src="/hero-mobile.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/hero-desktop.webm" type="video/webm" />
        <source src="/hero-desktop.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/35 pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 120% at 0% 100%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 75%)',
        }}
      />

      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative flex-none w-full h-full flex items-center">
              <Container className="w-full">
                <p className="text-[#989898] text-sm font-medium uppercase tracking-widest mb-6">
                  {slide.eyebrow}
                </p>
                <h1 className="text-white font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
                  {i === 0 ? <SplitTextReveal>{slide.headline}</SplitTextReveal> : slide.headline}
                </h1>
                <p className="text-[#999999] text-lg mb-10 max-w-xl leading-relaxed">
                  {slide.tagline}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
                  >
                    {slide.cta.label}
                  </Link>
                  <Link
                    href="/contact"
                    className="relative z-[2] inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest backdrop-blur-md hover:border-white hover:bg-white/20 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="p-2.5 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-abs-blue rounded-full"
          >
            <span
              className={[
                'block w-2 h-2 rounded-full transition-colors duration-300',
                i === selectedIndex ? 'bg-abs-blue' : 'bg-white/15 hover:bg-white/40',
              ].join(' ')}
            />
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-white" />
      </div>
    </section>
  );
}
