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

const product = PRODUCTS.find((p) => p.slug === 'plain-sheets')!;

export const metadata: Metadata = genMeta({
  title: 'Plain Sheets | GI, CR & HR, Cut to Length | ABS EdgeCut',
  description:
    'Precision cut plain sheets in GI, CR, and HR, cut to length, stack-ready. ABS EdgeCut Series, 24,000 MT annual capacity, Howrah.',
  path: '/products/plain-sheets',
});

const GRADES = [
  {
    name: 'GI Sheet',
    image: '/products/plain-sheets/gi-sheet.webp',
    specs: [
      'Brands: SAIL, JSW',
      'Thickness: 0.8mm to 3mm',
      'Customisability: any length',
      'Weight range: 10 to 70 kg/sheet',
      'Widths: 750, 800, 1000, 1220, 1250, 1500mm',
    ],
  },
  {
    name: 'CR Sheet',
    image: '/products/plain-sheets/cr-sheet.webp',
    specs: [
      'Brands: SAIL, JSW',
      'Thickness: 0.8mm to 1.6mm',
      'Customisability: any length',
      'Weight range: 18 to 37 kg/sheet',
      'Widths: 750, 800, 1000, 1220, 1250, 1500mm',
    ],
  },
  {
    name: 'HR Sheet',
    image: '/products/plain-sheets/hr-sheet.webp',
    specs: [
      'Brands: SAIL, TATA, JSW',
      'Thickness: 1.6mm to 4mm',
      'Customisability: any length',
      'Weight range: 38 to 95 kg/sheet',
      'Widths: 750, 800, 1000, 1220, 1250, 1500mm',
    ],
  },
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
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              ABS EdgeCut, Grade Range
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              GI, CR &amp; HR, cut to length
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRADES.map((grade) => (
              <SpecImageCard key={grade.name} {...grade} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container className="text-center">
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto mb-10">
            Plain sheets cut to precision in GI, CR, and HR materials, flat, finished, and
            stack-ready.
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
