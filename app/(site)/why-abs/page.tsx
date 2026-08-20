import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { SPLScene } from '@/components/svg/scenes/SPLScene';

export const metadata: Metadata = genMeta({
  title: 'Why ABS? | Single Point Loading & Packaging Assurance | Anil Balaji Steel',
  description:
    'Why choose Anil Balaji Steel: Single Point Loading for one-dock, full-order dispatch, and packaging & hallmarking that verifies every genuine ABS product on site.',
  path: '/why-abs',
});

const PACKAGING_MARKERS = [
  'Profile and guide, name and logo embossed',
  'Special protective film on every profile',
];

const PACKAGING_TYPES = ['Weatherproof CDP packaging', 'Stretch film packaging for springs'];

export default function WhyABSPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/why-abs');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-bg-dark pt-40 pb-16">
        <Container>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Why Choose Us
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
            <SplitTextReveal>Why ABS?</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-2xl">
            Two things set an ABS order apart from the rest: everything dispatched from one point,
            and every product verifiable the moment it reaches site.
          </p>
        </Container>
      </section>

      <section className="bg-bg-dark pt-8 pb-24 overflow-hidden" id="spl">
        <DrawSVGSection
          selector=".abs-path"
          duration={1.1}
          stagger={0.0015}
          fill={false}
          className="mb-10 px-2"
        >
          <SPLScene className="w-full max-w-none h-auto scale-110" />
        </DrawSVGSection>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
                USP 01
              </p>
              <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-6">
                Single Point Loading (SPL)
              </h2>
              <p className="text-text-body text-lg leading-relaxed mb-6">
                Saving you millions in time, transport, quality and price stability.
              </p>
              <p className="text-text-muted text-base leading-relaxed">
                Most suppliers can fulfil only part of a large order, leaving you to coordinate
                across multiple vendors for the rest. ABS carries the full range in-house, so your
                entire order, however wide the specification, is sourced, scheduled, and dispatched
                from a single point. One dock, one dispatch, your full order, every time.
              </p>
            </div>
            <div className="relative">
              <CardGlow className="p-10">
                <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-4">
                  Without SPL
                </p>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  Multiple suppliers, multiple dispatches, multiple points of failure on price,
                  quality, and timing.
                </p>
                <div className="border-t border-border-subtle pt-6">
                  <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-4">
                    With ABS SPL
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">
                    One coordinated line for your entire order, fewer handoffs, faster turnaround,
                    stable pricing.
                  </p>
                </div>
              </CardGlow>
              <CardNuts />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-mid py-24 overflow-hidden" id="packaging-hallmarking">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              USP 02
            </p>
            <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-4">
              Packaging &amp; Hallmarking
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Assurance, built in. Every genuine ABS product carries its own markers of
              authenticity, verifiable the moment it reaches site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <article className="relative h-full">
              <CardGlow className="h-full p-8">
                <h3 className="text-text-primary font-semibold text-lg mb-4">
                  Markers of Genuine ABS Products
                </h3>
                <ul className="space-y-2">
                  {PACKAGING_MARKERS.map((item) => (
                    <li key={item} className="text-text-muted text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardGlow>
              <CardNuts />
            </article>
            <article className="relative h-full">
              <CardGlow className="h-full p-8">
                <h3 className="text-text-primary font-semibold text-lg mb-4">Packaging</h3>
                <ul className="space-y-2">
                  {PACKAGING_TYPES.map((item) => (
                    <li key={item} className="text-text-muted text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardGlow>
              <CardNuts />
            </article>
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
