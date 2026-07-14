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
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'plain-sheets')!;

export const metadata: Metadata = genMeta({
  title: `${product.name} | Anil Balaji Steel`,
  description: product.description,
  path: '/products/plain-sheets',
});

const APPLICATIONS = [
  'Fabrication & custom cutting',
  'Sheet metal work & enclosures',
  'General engineering & manufacturing',
  'Stack-ready supply for OEMs',
];

const BENEFITS = [
  { title: 'Precision Cut', body: 'Flat, accurate, and consistent across the run.' },
  { title: 'Multiple Grades', body: 'GI, CR, HR, and PPGL materials available.' },
  { title: 'Stack Ready', body: 'Cut to length and ready for immediate use.' },
  { title: 'Bulk Supply', body: 'High-volume capacity for large orders.' },
];

export default function PlainSheetsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/plain-sheets');
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
                Flat, finished, ready to use
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
                <CardGlow key={benefit.title} className="p-6">
                  <h3 className="text-text-primary font-semibold text-sm mb-2">{benefit.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{benefit.body}</p>
                </CardGlow>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container className="text-center">
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto mb-10">
            Plain sheets cut to precision in GI, CR, HR, and PPGL materials, flat, finished, and
            stack-ready.
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
