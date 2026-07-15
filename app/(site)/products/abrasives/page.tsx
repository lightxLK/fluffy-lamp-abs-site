import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { generateProductSchema } from '@/lib/seo/generateProductSchema';
import { Container } from '@/components/layout/Container';
import { ProductPageHero } from '@/components/sections/ProductPageHero';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'abrasives')!;

export const metadata: Metadata = genMeta({
  title: `${product.name} | Anil Balaji Steel`,
  description: product.description,
  path: '/products/abrasives',
});

const APPLICATIONS = [
  'Cutting profiles, pipes, and plates to length',
  'Grinding welds and edges smooth',
  'Deburring and surface finishing',
  'Metal fabrication and site work',
];

const BENEFITS = [
  { title: 'Clean Cuts', body: 'Sharp, consistent cuts with minimal burr across steel sections.' },
  { title: 'Long Life', body: 'Engineered for extended wheel life under continuous use.' },
  { title: 'Multiple Sizes', body: 'Cutting and grinding wheels across common diameters.' },
  { title: 'Stocked', body: 'Ready alongside every steel order, no separate lead time.' },
];

export default function AbrasivesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/abrasives');
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    category: product.category,
  });

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <ProductPageHero
        category={product.category}
        brandLine={product.brandLine}
        name={product.name}
        tagline={product.tagline}
        description={product.description}
        capacity={product.capacity}
        scene={
          <ProductIcon slug={product.slug} variant="stroke" className="w-full max-w-3xl h-auto" />
        }
      />

      <section className="bg-bg-card border-y border-border-subtle py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
                Applications
              </p>
              <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-6">
                The right wheel for every job
              </h2>
              <ul className="space-y-4">
                {APPLICATIONS.map((app) => (
                  <li
                    key={app}
                    className="text-text-body text-sm leading-relaxed border-t border-border-subtle pt-4"
                  >
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="relative h-full">
                  <CardGlow className="h-full p-6">
                    <h3 className="text-text-primary font-semibold text-sm mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed">{benefit.body}</p>
                  </CardGlow>
                  <CardNuts />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container className="text-center">
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto mb-10">
            Cutting and grinding wheels stocked alongside our steel range, so your fabrication work
            never waits on a separate supplier.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
