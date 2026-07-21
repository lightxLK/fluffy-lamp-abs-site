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

const product = PRODUCTS.find((p) => p.slug === 'shutter')!;

export const metadata: Metadata = genMeta({
  title: 'Rolling Shutter Gates | ABS ShaktiShutter | GI, CR & PPGL',
  description:
    'Precision rolling shutter profiles in flat, diamond, gear and perforated patterns, plus bottom plates, springs, lock plates, hood covers and bracket plates. GI, CR, PPGL materials with protective guardfilm. 15,000 MT annual capacity, Howrah.',
  path: '/products/shutter',
});

const FAQS = [
  {
    question: 'What materials are ABS shutter profiles available in?',
    answer:
      'GI, CR, and PPGL, all with special protective guardfilm to prevent transit and installation damage.',
  },
  {
    question: 'How do I know a profile is genuine ABS?',
    answer:
      'Every genuine ABS profile and guide is embossed with our name and logo, and marked with length and thickness directly on the product.',
  },
  {
    question: "What's the difference between diamond and single-diamond profiles?",
    answer:
      'Both are available. Diamond gives a fuller raised pattern across the lath, single-diamond gives a lighter, more restrained finish. Talk to our team about which suits your installation.',
  },
];

const PROFILE_TYPES = [
  {
    name: 'Flat Profile',
    image: '/products/shutter/flat-profile.jpg',
    specs: ['Standard lath, approximately 84mm width', 'Also available in Super Flat variant'],
  },
  {
    name: '84mm Super Flat',
    image: '/products/shutter/84mm-super-flat.jpg',
    specs: ['Super flat variant, 84mm width'],
  },
  {
    name: '4 Inch Super Flat',
    image: '/products/shutter/4-inch-super-flat.jpg',
    specs: ['100mm width lath, built for wide-span openings'],
  },
  {
    name: 'Round Profile',
    image: '/products/shutter/round-profile.jpg',
    specs: ['Rounded edge profile'],
  },
  {
    name: 'Diamond Profile',
    image: '/products/shutter/diamond-profile.jpg',
    specs: ['Diamond pattern rolled into the lath'],
  },
  {
    name: 'Single Diamond Profile',
    image: '/products/shutter/single-diamond-profile.jpg',
    specs: ['Single-diamond pattern, a lighter variant of the diamond profile'],
  },
  {
    name: 'Gear Profile',
    image: '/products/shutter/gear-profile.jpg',
    specs: ['Toothed edge for enhanced structural rigidity'],
  },
  {
    name: 'Perforated Profile',
    image: '/products/shutter/perforated-profile.jpg',
    specs: ['Ventilated lath, allows airflow without compromising security'],
  },
];

const GUIDES = [
  {
    name: 'Guide',
    image: '/products/shutter/c2-guide.jpg',
    specs: ['Thickness: 2.0mm, 750 gms/ft', 'Thickness: 2.5mm, 900 gms/ft', 'Material: GP, HR'],
  },
];

const HARDWARE = [
  {
    name: 'Bottom Plate',
    image: '/products/shutter/bottom-plate.jpg',
    specs: ['Thickness: 2.5mm, 3mm', 'Guide width options: 2.5", 3"'],
  },
  {
    name: 'Spring',
    image: '/products/shutter/spring.jpg',
    specs: [
      'Thickness: 6mm, 7mm, 8mm',
      '6mm: 12"–22" at 6–11.5 kg/pair',
      '7mm: 12"–24" at 7–16.5 kg/pair',
      '8mm: 18"–24" at 14.3–19 kg/pair',
    ],
  },
  {
    name: 'Lock Plate',
    image: '/products/shutter/lock-plate.jpg',
    specs: ['Thickness: 2mm, 2.5mm', 'Material: GP, HR'],
  },
  {
    name: 'Hood Cover',
    image: '/products/shutter/hood-cover.jpg',
    specs: [
      'Thickness: 0.3mm to 0.35mm',
      'Width: 336mm',
      'Weight: 50 to 60 kg/roll',
      'Material: GI',
    ],
  },
  {
    name: 'Bracket Plate',
    image: '/products/shutter/bracket-plate.jpg',
    specs: ['Thickness: 2mm to 5mm', 'Size: 14"x14", 16"x16"', 'Material: GP, HR, CR'],
  },
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
              ABS ShaktiShutter, Profile Range
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              One of the widest ranges in the market
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFILE_TYPES.map((profile) => (
              <SpecImageCard key={profile.name} {...profile} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              ABS TotalShutter, Guide Range
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {GUIDES.map((item) => (
              <SpecImageCard key={item.name} {...item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-card border-y border-border-subtle py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              ABS TotalShutter, Component Range
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Every part for a complete gate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {HARDWARE.map((item) => (
              <SpecImageCard key={item.name} {...item} />
            ))}
          </div>

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

      <FAQSection items={FAQS} className="bg-bg-card border-y border-border-subtle py-24" />

      <ContactStrip />
    </main>
  );
}
