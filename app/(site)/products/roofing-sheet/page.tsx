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
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'roofing-sheet')!;

export const metadata: Metadata = genMeta({
  title: 'PPGL Roofing Sheets | GP, CR & HR | ABS BlueShield™',
  description:
    'PPGL roofing sheets built for Indian weather. GP, CR and HR grades from SAIL, Tata and JSW. Custom widths and lengths, ABS BlueShield™ System.',
  path: '/products/roofing-sheet',
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

const ROOFING_BRANDS: { name: string; src: string; scale?: string }[] = [
  { name: 'ABS Branded', src: '/abs-nav-footer-full-color.png' },
  { name: 'Jindal Steel', src: '/Client Logo/jindal.webp' },
  { name: 'Jindal India', src: '/Client Logo/jindal india.png', scale: 'scale-[1.4]' },
  { name: 'JSW', src: '/Client Logo/jsw.webp' },
];

export default function SheetPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/roofing-sheet');
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
              ABS BlueShield™, Brands Available
            </p>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {ROOFING_BRANDS.map((brand) => (
                <span key={brand.name} className="flex items-center justify-center h-14 w-32">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={128}
                    height={56}
                    className={`h-full w-full object-contain brightness-0 invert light:filter-none ${brand.scale ?? ''}`}
                  />
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Complete the Roof
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Roofing Accessories
            </h2>
          </div>
          <div className="relative aspect-[16/9] max-w-4xl mx-auto">
            <Image
              src="/products/sheet/roofing accessories ABS.png"
              alt="ABS roofing accessories"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain"
            />
          </div>
        </Container>
      </section>

      <FAQSection items={ROOFING_FAQS} />

      <ContactStrip />
    </main>
  );
}
