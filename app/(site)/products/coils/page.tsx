import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { generateProductSchema } from '@/lib/seo/generateProductSchema';
import { Container } from '@/components/layout/Container';
import { ProductPageHero } from '@/components/sections/ProductPageHero';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { FAQSection } from '@/components/sections/FAQSection';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import { SpecImageCard } from '@/components/ui/SpecImageCard';
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'coils')!;

export const metadata: Metadata = genMeta({
  title: 'Slit & Pencil Coils | Precision Slitting | ABS CoreLine™',
  description:
    'Precision slit coil and pencil coil, held to tight tolerance in GP, HR, CR and PPGL. ABS CoreLine™ Series, 30,000 MT annual capacity, Howrah.',
  path: '/products/coils',
});

const COILS = [
  {
    name: 'Slit Coil',
    image: '/products/coils/slit-coil.webp',
    specs: [
      'Thickness: 0.25mm to 2.5mm',
      'Material: GP, HR, CR, PPGL',
      'Width: from 35mm onwards',
      'Weight per coil: 300 kg to 1.5 MT',
    ],
  },
  {
    name: 'Pencil Coil',
    image: '/products/coils/pencil-coil.webp',
    specs: [
      'Thickness: 0.25mm to 0.60mm',
      'Material: GP, CR, PPGL',
      'Width: 900mm',
      'Weight per coil: 50 kg to 70 kg',
    ],
  },
];

const COIL_FAQS = [
  {
    question: 'What tolerance does ABS CoreLine™ hold on slit width?',
    answer:
      'Our high-speed slitting line runs rigorous dimensional checks on every pass, holding tight width tolerance across GP, HR, CR, and PPGL material.',
  },
];

export default function CoilsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/coils');
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
              ABS CoreLine™, Coil Range
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Precision slitting, held to tight tolerance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COILS.map((coil) => (
              <SpecImageCard key={coil.name} {...coil} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </Container>
      </section>

      <FAQSection items={COIL_FAQS} className="bg-bg-card border-y border-border-subtle py-24" />

      <ContactStrip />
    </main>
  );
}
