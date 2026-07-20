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
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'shutter-accessories')!;

export const metadata: Metadata = genMeta({
  title: 'Shutter Accessories & Components | Springs, Locks, Motors | ABS Steel',
  description:
    'Complete rolling shutter accessory range: bottom plates, springs, lock plates, hood covers, bracket plates, motors, pulleys and more. Everything for one installation, ABS TotalShutter System.',
  path: '/products/shutter-accessories',
});

const COMPONENTS = [
  {
    name: 'Bottom Plate',
    specs: ['Thickness: 2.5mm, 3mm', 'Guide width options: 2.5", 3"'],
  },
  {
    name: 'Spring',
    specs: ['Thickness: 6mm, 7mm, 8mm', 'Weight rated by pair, size 12"–24"'],
  },
  {
    name: 'Lock Plate',
    specs: ['Thickness: 2mm, 2.5mm', 'Material: GP, HR'],
  },
  {
    name: 'Hood Cover',
    specs: ['Thickness: 0.3mm–0.35mm', 'Width: 336mm · 50–60 kg/roll · Material: GI'],
  },
  {
    name: 'Bracket Plate',
    specs: ['Thickness: 2mm–5mm', 'Size: 14"×14", 16"×16" · Material: GP, HR, CR'],
  },
  {
    name: 'Aluminium Socket',
    specs: ['Quantity per bag: 5,000 pcs / 17 kg'],
  },
  {
    name: 'Shutter Lock',
    specs: [
      'Iron, master key, 12 pcs per bag',
      'Also available in brass: light, medium, and heavy duty',
    ],
  },
  {
    name: 'Hash Bolt',
    specs: ['Thickness: 5mm to 6mm', 'Weight: 50 kg per bag'],
  },
  {
    name: 'Zip',
    specs: ['Weight: 64/80 gm', 'Quantity: 500 pcs per bag'],
  },
  {
    name: 'Pulley',
    specs: [
      'Light: 850 gm, 50 pcs per bag',
      'Heavy: 1.15 kg, 40 pcs per bag',
      'Bush: 1.05 kg, 40 pcs per bag',
    ],
  },
  {
    name: 'U Clamp',
    specs: ['Weight: 350 gm or 500 gm', 'Quantity: 100 pcs or 75 pcs per bag'],
  },
  {
    name: 'Kakda',
    specs: ['Thickness: 4mm to 5mm', 'Quantity: 500 pcs per bag'],
  },
  {
    name: 'Collapsible Gate Wheel',
    specs: ['Weight: 40 kg / 400 pcs', 'Machining polished wheel finish'],
  },
  {
    name: 'Chain Pulley Set',
    specs: ['Light: 25mm rod', 'Heavy: 32mm rod'],
  },
  {
    name: 'Gear Box',
    specs: ['Available in light and heavy duty'],
  },
  {
    name: 'Shutter Motors',
    specs: ['Weight capacity: 500 kg to 2,000 kg'],
  },
];

const ACCESSORY_FAQS = [
  {
    question: 'Does ABS supply automated shutter components?',
    answer:
      'Yes. Our range includes shutter motors rated from 500 kg to 2,000 kg capacity, alongside the full manual hardware range.',
  },
];

export default function ShutterAccessoriesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/shutter-accessories');
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
              Complete Component Range
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Everything for a full installation
            </h2>
          </div>

          <p className="text-text-body text-base leading-relaxed max-w-2xl mb-14">
            From the smallest fastener to the motor that drives it, ABS TotalShutter covers every
            component in a complete rolling shutter installation, sourced, stocked, and dispatched
            from one facility.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPONENTS.map((component) => (
              <div key={component.name} className="relative h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-lg mb-4">{component.name}</h3>
                  <ul className="space-y-2">
                    {component.specs.map((s) => (
                      <li key={s} className="text-text-muted text-sm leading-relaxed">
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardGlow>
                <CardNuts />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24">
        <Container className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </Container>
      </section>

      <FAQSection
        items={ACCESSORY_FAQS}
        className="bg-bg-card border-y border-border-subtle py-24"
      />

      <ContactStrip />
    </main>
  );
}
