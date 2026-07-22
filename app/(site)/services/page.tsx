import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { GatePergolaScene } from '@/components/svg/scenes/GatePergolaScene';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = genMeta({
  title: 'Steel Services | Loading, Cutting, Slitting & Fabrication | ABS Steel',
  description:
    'Single Point Loading, precision cutting, coil slitting, and custom fabrication. Four service verticals, one facility, from mill to site.',
  path: '/services',
});

type SceneComponent = React.ComponentType<{ className?: string }>;

// Only Fabrica (fabrication) keeps its background line art; the rest were
// removed as pure decoration per feedback.
const SCENE_MAP: Record<string, SceneComponent> = {
  fabrication: GatePergolaScene,
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/services');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-bg-dark pt-40 pb-16 overflow-hidden">
        <Container className="relative">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
            <SplitTextReveal>Services</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-2xl mb-10">
            Seven service verticals carry every order from mill to site, loading, cutting, slitting,
            fabrication, packaging, hallmarking, and laser cutting, all under one roof.
          </p>

          <nav aria-label="Service sections" className="flex flex-wrap gap-3">
            {SERVICES.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="text-xs font-semibold uppercase tracking-widest px-5 py-3 border border-border-subtle bg-bg-card/60 text-text-muted backdrop-blur-md hover:text-text-primary hover:border-text-primary hover:bg-bg-card transition-colors duration-300"
              >
                {service.name}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {SERVICES.map((service, i) => {
        const Scene = SCENE_MAP[service.slug];
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`relative py-24 overflow-hidden scroll-mt-24 ${
              i % 2 === 0 ? 'bg-bg-dark' : 'bg-bg-mid'
            }`}
          >
            {Scene && (
              <DrawSVGSection
                selector=".abs-path"
                className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none"
              >
                <Scene className="w-full max-w-2xl h-auto" />
              </DrawSVGSection>
            )}

            <Container className="relative">
              <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
                {service.tagline}
              </p>
              <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-6 max-w-2xl">
                {service.name}
              </h2>
              <p className="text-text-body text-base leading-relaxed max-w-2xl mb-12">
                {service.description}
              </p>

              {service.process && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                  {service.process.map((step, idx) => (
                    <div key={step.label} className="border-t border-border-subtle pt-4">
                      <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-2">
                        {String(idx + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-text-primary font-semibold text-sm mb-2">{step.label}</h3>
                      <p className="text-text-muted text-xs leading-relaxed">{step.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {service.lists && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                  {service.lists.map((list) => (
                    <div key={list.title} className="border-t border-border-subtle pt-4">
                      <h3 className="text-text-primary font-semibold text-sm mb-4">{list.title}</h3>
                      <ul className="space-y-2">
                        {list.items.map((item) => (
                          <li key={item} className="text-text-muted text-xs leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {service.specs && (
                <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border-subtle pt-6 mb-10">
                  {service.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-text-muted text-xs uppercase tracking-widest mb-1">
                        {spec.label}
                      </p>
                      <p className="text-text-primary text-sm font-semibold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {service.patternGallery && (
                <div className="border-t border-border-subtle pt-8">
                  <p className="text-text-muted text-xs uppercase tracking-widest mb-6">
                    GLC Design Series,{' '}
                    {service.patternGallery.groupCount * service.patternGallery.codesPerGroup}{' '}
                    Patterns
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Array.from({ length: service.patternGallery.groupCount }, (_, idx) => {
                      const { prefix, codesPerGroup } = service.patternGallery!;
                      const groupNum = idx + 1;
                      const firstCode = idx * codesPerGroup + 1;
                      const lastCode = firstCode + codesPerGroup - 1;
                      const range = `${prefix}-${String(firstCode).padStart(3, '0')} – ${prefix}-${String(lastCode).padStart(3, '0')}`;
                      return (
                        <div key={groupNum}>
                          <div className="relative aspect-[2/1] bg-bg-dark border border-border-subtle overflow-hidden">
                            <Image
                              src={`/products/gi-laser-cutting/glc-group-${groupNum}.webp`}
                              alt={`GLC design series, ${range}`}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-contain p-3"
                            />
                          </div>
                          <p className="text-text-muted text-[11px] text-center uppercase tracking-widest mt-2">
                            Group {groupNum}, {range}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Container>
          </section>
        );
      })}

      <section className="bg-bg-dark py-24">
        <Container className="text-center">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Bespoke Fabrication
          </p>
          <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-6">
            Looking for custom fabrication?
          </h2>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto mb-10">
            Fabrica is our dedicated design-and-build vertical for gates, pergolas, and
            architectural steelwork.
          </p>
          <Link
            href="/services/fabrica"
            className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Explore Fabrica
          </Link>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
