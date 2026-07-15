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

const product = PRODUCTS.find((p) => p.slug === 'shutter')!;

export const metadata: Metadata = genMeta({
  title: `${product.name} | Anil Balaji Steel`,
  description: product.description,
  path: '/products/shutter',
});

const PROFILE_TYPES = [
  { name: 'Flat Profile', note: 'The standard lath, available in super flat variants.' },
  { name: 'Round Profile', note: 'Rolled edge for smooth interlocking action.' },
  { name: 'Diamond Profile', note: 'Available in diamond and single-diamond patterns.' },
  { name: 'Gear Profile', note: 'Toothed edge for enhanced structural rigidity.' },
  { name: 'Perforated Profile', note: 'Ventilated lath for airflow without losing security.' },
  { name: '4 Inch Super Flat', note: '100mm width lath for wide-span openings.' },
];

export default function ShutterPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/shutter');
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
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Profile Types
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              One of the widest ranges in the market
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFILE_TYPES.map((profile) => (
              <div key={profile.name} className="relative h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-lg mb-3">{profile.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{profile.note}</p>
                </CardGlow>
                <CardNuts />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            <div className="border-t border-border-subtle pt-6">
              <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Material</p>
              <p className="text-text-primary text-lg font-semibold">GI, CR, PPGL</p>
            </div>
            <div className="border-t border-border-subtle pt-6">
              <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Protection</p>
              <p className="text-text-primary text-lg font-semibold">
                Special Protective Guardfilm
              </p>
            </div>
            <div className="border-t border-border-subtle pt-6">
              <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Authenticity</p>
              <p className="text-text-primary text-lg font-semibold">
                Length &amp; Thickness Marked
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
            >
              Request a Quote
            </Link>
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
