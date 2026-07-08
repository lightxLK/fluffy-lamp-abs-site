import type { Metadata } from 'next';
import { Quote } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { GatePergolaScene } from '@/components/svg/scenes/GatePergolaScene';
import { CardGlow } from '@/components/ui/CardGlow';
import { DIRECTORS } from '@/data/directors';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = genMeta({
  title: 'Fabrica | Anil Balaji Steel',
  description:
    'ABS Fabrica, turnkey automated gates, pergolas, and architectural steelwork, led by Ms. Komal Agarwal.',
  path: '/services/fabrica',
});

const GATE_SYSTEMS = [
  {
    name: 'Automatic Sliding Gate',
    benefits: [
      'Space-saving operation, slides neatly along the wall, ideal for compact sites.',
      'Effortless heavy-duty use for large, wide openings.',
    ],
  },
  {
    name: 'Automatic Swing Gate',
    benefits: [
      'Classic elegance, opens with a grand swing for a premium entrance.',
      'Dual-leaf options, flexible for single or double panel setups.',
    ],
  },
  {
    name: 'Automatic Shutter Gate',
    benefits: [
      'Full coverage security, locks down completely as a wall-like barrier.',
      'Multipurpose utility for homes and commercial spaces alike.',
    ],
  },
];

const COMMON_FEATURES = [
  '20m range control',
  'Manual override during power cuts',
  'Smart sensors for safe operation',
  'Phone sync for smart living',
  'Custom design to match any facade',
  'All-weather protection',
];

const komal = DIRECTORS.find((d) => d.name.includes('Komal'))!;
const fabricationProcess = SERVICES.find((s) => s.slug === 'fabrication')!.process;

export default function FabricaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/services/fabrica');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-bg-dark pt-40 pb-24 overflow-hidden">
        <DrawSVGSection
          selector=".abs-path"
          className="absolute inset-0 flex items-center justify-end opacity-25 pointer-events-none"
          duration={30}
        >
          <GatePergolaScene className="w-full max-w-2xl h-auto" />
        </DrawSVGSection>

        <Container className="relative">
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
            Introducing ABS Fabrica
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-2xl">
            <SplitTextReveal>Steel, designed your way</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-xl mb-10">
            Our newest consumer-facing venture blends creativity with steel craftsmanship, turnkey
            automated gates, terrace gardens, landscape installations, and architectural facade
            designs.
          </p>
          <div className="flex gap-10 flex-wrap">
            <div>
              <p className="text-text-primary font-bold text-4xl leading-none mb-1">200+</p>
              <p className="text-text-muted text-xs uppercase tracking-widest">
                Projected Projects · 5 Years
              </p>
            </div>
            <div>
              <p className="text-text-primary font-bold text-4xl leading-none mb-1">₹20L</p>
              <p className="text-text-muted text-xs uppercase tracking-widest">
                Average Project Value
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-card border-y border-border-subtle py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
              How Fabrica Works
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              From concept to handover
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {fabricationProcess.map((step, idx) => (
              <div key={step.label} className="border-t border-border-subtle pt-6">
                <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="text-text-primary font-semibold text-base mb-2">{step.label}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
              Gate Systems
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Automated, elegant, secure
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {GATE_SYSTEMS.map((gate) => (
              <article key={gate.name} className="h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-lg mb-4">{gate.name}</h3>
                  <ul className="space-y-3">
                    {gate.benefits.map((b) => (
                      <li key={b} className="text-text-muted text-sm leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardGlow>
              </article>
            ))}
          </div>

          <div className="border-t border-border-subtle pt-8">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-6">
              Common Features Across All Systems
            </p>
            <div className="flex flex-wrap gap-3">
              {COMMON_FEATURES.map((f) => (
                <span
                  key={f}
                  className="text-text-body text-xs px-4 py-2 border border-border-subtle"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-mid py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
              Led By
            </p>
            <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-6">
              {komal.name}
            </h2>
            <p className="text-text-muted text-sm uppercase tracking-widest mb-8">{komal.role}</p>
            <blockquote className="flex flex-col items-center gap-4">
              <Quote className="w-6 h-6 text-abs-blue" aria-hidden="true" />
              <p className="text-text-body text-xl italic leading-relaxed">{komal.quote}</p>
            </blockquote>
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
