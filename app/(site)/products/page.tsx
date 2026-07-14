import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { ProductCard } from '@/components/sections/ProductCard';
import { PRODUCTS } from '@/data/products';

export const metadata: Metadata = genMeta({
  title: 'Products | Anil Balaji Steel',
  description:
    'Rolling shutter profiles, accessories, pipes, roofing sheets, chequered plates, and processed steel, the complete ABS product range.',
  path: '/products',
});

export default function ProductsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-bg-dark pt-40 pb-16">
        <Container>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Comprehensive Product Portfolio
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
            <SplitTextReveal>Products</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-2xl">
            Every product is more than metal; it&apos;s a manifestation of precision, integrity, and
            purpose. From rolling shutter profiles to roofing solutions, complete steel solutions
            for fabricators, OEMs, and project owners.
          </p>
        </Container>
      </section>

      <section className="bg-bg-dark pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
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
