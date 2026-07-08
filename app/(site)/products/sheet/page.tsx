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

const product = PRODUCTS.find((p) => p.slug === 'sheet')!;

export const metadata: Metadata = genMeta({
  title: `${product.name} | Anil Balaji Steel`,
  description: product.description,
  path: '/products/sheet',
});

const SHEET_GRADES = [
  {
    name: 'GP Sheet',
    brands: 'SAIL, JSW',
    thickness: '0.8 mm – 3 mm',
    weight: '10 – 70 Kg/Sheet',
  },
  {
    name: 'CR Sheet',
    brands: 'SAIL, JSW',
    thickness: '0.8 mm – 1.6 mm',
    weight: '18 – 37 Kg/Sheet',
  },
  {
    name: 'HR Sheet',
    brands: 'SAIL, TATA, JSW',
    thickness: '1.6 mm – 4 mm',
    weight: '38 – 95 Kg/Sheet',
  },
];

const WIDTHS = ['750 mm', '800 mm', '1000 mm', '1220 mm', '1250 mm', '1500 mm'];

export default function SheetPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/sheet');
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

      <section className="bg-bg-dark py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
              Grades &amp; Specifications
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              GP, CR &amp; HR, customised to length
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {SHEET_GRADES.map((grade) => (
              <article key={grade.name} className="h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-xl mb-4">{grade.name}</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-t border-border-subtle pt-3">
                      <dt className="text-text-muted">Brands</dt>
                      <dd className="text-text-primary font-medium">{grade.brands}</dd>
                    </div>
                    <div className="flex justify-between border-t border-border-subtle pt-3">
                      <dt className="text-text-muted">Thickness</dt>
                      <dd className="text-text-primary font-medium">{grade.thickness}</dd>
                    </div>
                    <div className="flex justify-between border-t border-border-subtle pt-3">
                      <dt className="text-text-muted">Weight Range</dt>
                      <dd className="text-text-primary font-medium">{grade.weight}</dd>
                    </div>
                  </dl>
                </CardGlow>
              </article>
            ))}
          </div>

          <div className="border-t border-border-subtle pt-8">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-6">
              Available Widths, Customisable to Any Length
            </p>
            <div className="flex flex-wrap gap-3">
              {WIDTHS.map((w) => (
                <span
                  key={w}
                  className="text-text-body text-sm px-4 py-2 border border-border-subtle"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-card border-y border-border-subtle py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
              ABS BlueShield™ Roofing
            </p>
            <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-6">
              PPGL roofing, built for Indian weather
            </h2>
            <p className="text-text-body text-base leading-relaxed mb-10">
              Exceptional strength and weather resistance at significantly reduced cost, ideal for
              industrial sheds, warehouses, and residential roofing.
            </p>
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
