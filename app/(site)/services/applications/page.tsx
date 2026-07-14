import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { ApplicationsScene } from '@/components/svg/scenes/ApplicationsScene';
import { CardGlow } from '@/components/ui/CardGlow';

export const metadata: Metadata = genMeta({
  title: 'Applications | Anil Balaji Steel',
  description:
    'From furniture to façades, the backbone of endless possibilities. Where ABS steel ends up across Eastern India.',
  path: '/services/applications',
});

const USE_CASES = [
  {
    title: 'Furniture',
    body: 'Cold-rolled profiles and flats form the frames of shelving, racking, and industrial furniture.',
  },
  {
    title: 'Buildings',
    body: 'Roofing sheets, purlins, and structural sections shape warehouses, sheds, and residential roofs.',
  },
  {
    title: 'Gates',
    body: 'Shutter profiles and Fabrica-built gates secure homes, shops, and commercial premises across six states.',
  },
  {
    title: 'Fabrication',
    body: 'Pipes, angles, and plates feed custom fabrication work, from staircases to facade elements.',
  },
];

export default function ApplicationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/services/applications');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-bg-dark pt-40 pb-16">
        <Container>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Where Our Steel Lives
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
            <SplitTextReveal>Applications</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-2xl">
            The backbone of endless possibilities, from a shutter guarding a shopfront to the
            skeleton of a warehouse roof, ABS steel is engineered into daily life.
          </p>
        </Container>
      </section>

      <section className="relative bg-bg-dark overflow-hidden">
        <ApplicationsScene className="w-full h-auto opacity-70" />
      </section>

      <section className="bg-bg-mid py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Backbone of Endless Possibilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map((useCase) => (
              <article key={useCase.title} className="h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-lg mb-3">{useCase.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{useCase.body}</p>
                </CardGlow>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
