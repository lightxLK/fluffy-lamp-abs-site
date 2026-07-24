import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { generateProductSchema } from '@/lib/seo/generateProductSchema';
import { Container } from '@/components/layout/Container';
import { ProductPageHero } from '@/components/sections/ProductPageHero';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { FAQSection } from '@/components/sections/FAQSection';
import Image from 'next/image';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'sheet')!;

export const metadata: Metadata = genMeta({
  title: 'PPGL Roofing Sheets | GP, CR & HR | ABS BlueShield',
  description:
    'PPGL roofing sheets built for Indian weather. GP, CR and HR grades from SAIL, Tata and JSW. Custom widths and lengths, ABS BlueShield System.',
  path: '/products/sheet',
});

const ROOFING_FAQS = [
  {
    question: 'Which brands does ABS source roofing material from?',
    answer:
      'SAIL, JSW, and Tata, depending on grade. GP and CR sheets come from SAIL and JSW. HR sheets add Tata to that list.',
  },
  {
    question: 'Can roofing sheets be cut to custom lengths?',
    answer: 'Yes, all widths listed are customisable to any length you need.',
  },
];

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

const ROOFING_BRANDS = [
  { name: 'ABS Branded', src: null },
  { name: 'Jindal India', src: '/Client Logo/jindal.webp' },
  { name: 'JSW', src: '/Client Logo/jsw.webp' },
  { name: 'Bhushan', src: '/Client Logo/bhushan.webp' },
  // Square source art, unlike the wide wordmarks above it, so it needs a
  // taller box to read at a comparable size once object-contain shrinks it.
  { name: 'Tata Steel', src: '/Client Logo/tata-steel.webp', boxClassName: 'h-24 w-24' },
];

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

      <section className="bg-bg-dark py-24 overflow-hidden">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Grades &amp; Specifications
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              GP, CR &amp; HR, customised to length
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {SHEET_GRADES.map((grade) => (
              <article key={grade.name} className="relative h-full">
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
                <CardNuts />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
            <div>
              <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
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
                className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
              >
                Request a Quote
              </Link>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/products/sheet/roofing-sheet.webp"
                alt="ABS PPGL roofing sheet"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-6"
              />
            </div>
          </div>

          <div className="border-t border-border-subtle pt-8">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-6">
              ABS BlueShield, Brands Available
            </p>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {ROOFING_BRANDS.map((brand) =>
                brand.src ? (
                  <span
                    key={brand.name}
                    className={`flex items-center justify-center ${brand.boxClassName ?? 'h-14 w-32'}`}
                  >
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={128}
                      height={56}
                      className="h-full w-full object-contain brightness-0 invert light:filter-none"
                    />
                  </span>
                ) : (
                  <span
                    key={brand.name}
                    className="text-text-primary text-sm font-semibold uppercase tracking-widest"
                  >
                    {brand.name}
                  </span>
                ),
              )}
            </div>
          </div>
        </Container>
      </section>

      <FAQSection items={ROOFING_FAQS} />

      <ContactStrip />
    </main>
  );
}
