import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { generateProductSchema } from '@/lib/seo/generateProductSchema';
import { Container } from '@/components/layout/Container';
import { ProductPageHero } from '@/components/sections/ProductPageHero';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import { SpecImageCard } from '@/components/ui/SpecImageCard';
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'abrasives')!;

export const metadata: Metadata = genMeta({
  title: `${product.name} | Anil Balaji Steel`,
  description: product.description,
  path: '/products/abrasives',
});

const WHEELS = [
  {
    name: 'Cutting Wheel — 14"',
    image: '/products/abrasives/cutting-wheel-14.webp',
    specs: ['Size: 14"'],
    imagePadding: 'p-0',
  },
  {
    name: 'Cutting Wheel — 4"',
    image: '/products/abrasives/cutting-wheel-4.webp',
    specs: ['Size: 4"'],
    imagePadding: 'p-12',
  },
  {
    name: 'Grinding Wheel',
    image: '/products/abrasives/grinding-wheel-4.webp',
    specs: ['Size: 4"'],
    imagePadding: 'p-[22px]',
    imageObjectPosition: 'object-left',
  },
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
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Available Sizes
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              The right wheel for every job
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHEELS.map((wheel) => (
              <SpecImageCard key={wheel.name} {...wheel} />
            ))}
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
            className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
