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
  title: 'Steel Products | Rolling Shutter Gates, Pipes, Sheets & More | ABS Steel',
  description:
    'Complete steel product range from Anil Balaji Steel: rolling shutter gates, pipes, roofing sheets, shutter accessories, plain sheets, slit & pencil coils, and abrasives. Direct from mill, Howrah.',
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
            Every product is a manifestation of precision, integrity, and purpose. From rolling
            shutter gates to roofing solutions, we deliver complete steel solutions that empower
            fabricators, OEMs, and project owners with reliability and value.
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
