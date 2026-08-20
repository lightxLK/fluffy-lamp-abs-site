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

const product = PRODUCTS.find((p) => p.slug === 'shutter-accessories')!;

export const metadata: Metadata = genMeta({
  title: 'Shutter Accessories & Components | Pulleys, Motors, Locks | ABS Steel',
  description:
    'Complete rolling shutter accessory range: clips, pulleys, U clamps, kakda, collapsible gate wheels, chain pulley sets, gear boxes, motors, locks and more. Everything for one installation, ABS TotalShutter™ System.',
  path: '/products/shutter-accessories',
});

const COMPONENTS = [
  {
    name: 'Clip',
    image: '/products/shutter-accessories/clip.webp',
    specs: ['Weight: 64/80 gm', 'Quantity: 500 pcs per bag'],
  },
  {
    name: 'Pulley',
    image: '/products/shutter-accessories/pulley.webp',
    specs: [
      'Light: 850 gm, 50 pcs per bag',
      'Heavy: 1.15 kg, 40 pcs per bag',
      'Bush: 1.05 kg, 40 pcs per bag',
    ],
  },
  {
    name: 'U Clamp',
    image: '/products/shutter-accessories/u-clamp.webp',
    specs: ['Weight: 350 gm or 500 gm', 'Quantity: 100 pcs or 75 pcs per bag'],
  },
  {
    name: 'Kakda',
    image: '/products/shutter-accessories/kakda.webp',
    specs: ['Thickness: 4mm to 5mm', 'Quantity: 500 pcs per bag'],
  },
  {
    name: 'Collapsible Gate Wheel',
    image: '/products/shutter-accessories/collapsible-gate-wheel.webp',
    specs: ['Weight: 40 kg / 400 pcs', 'Machining polished wheel finish'],
  },
  {
    name: 'Chain Pulley Set',
    image: '/products/shutter-accessories/chain-pulley-set.webp',
    specs: ['Light: 25mm rod', 'Heavy: 32mm rod'],
  },
  {
    name: 'Gear Box',
    image: '/products/shutter-accessories/gear-box.webp',
    specs: ['Available in light and heavy duty'],
  },
  {
    name: 'Shutter Motors',
    image: '/products/shutter-accessories/shutter-motors.webp',
    specs: ['Weight capacity: 500 kg to 2,000 kg'],
  },
  {
    name: 'Aluminium Socket',
    image: '/products/shutter-accessories/aluminium-socket.webp',
    specs: ['Quantity per bag: 5,000 pcs / 17 kg'],
  },
  {
    name: 'Shutter Lock',
    image: '/products/shutter-accessories/shutter-lock.webp',
    specs: [
      'Iron, master key, 12 pcs per bag',
      'Also available in brass: light, medium, and heavy duty',
    ],
  },
  {
    name: 'Hash Bolt',
    image: '/products/shutter-accessories/hash-bolt.webp',
    specs: ['Thickness: 5mm to 6mm', 'Weight: 50 kg per bag'],
  },
  {
    name: 'Laichis',
    image: '/products/shutter-accessories/laichis.webp',
    specs: ['Thickness: 8mm', 'Quantity: 500 pcs per bag'],
  },
  {
    name: 'Pipe Socket',
    image: '/products/shutter-accessories/pipe-socket.webp',
    specs: ['Quantity: 5,000 pcs'],
  },
  {
    name: 'Tala Patti',
    image: '/products/shutter-accessories/tala-patti.webp',
    specs: ['Thickness: 6mm', 'Quantity per bag: 50 kg', 'Type: GI, Black'],
  },
  {
    name: 'G Block',
    image: '/products/shutter-accessories/g-block.webp',
    specs: ['Thickness: 8mm', 'Quantity per bag: 500 pcs'],
  },
  {
    name: 'Rivit',
    image: '/products/shutter-accessories/rivit.webp',
    specs: ['Quantity per bag: 50 kg', 'Type: VSP / Normal'],
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
            From the smallest fastener to the motor that drives it, ABS TotalShutter™ covers every
            component in a complete rolling shutter installation, sourced, stocked, and dispatched
            from one facility.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPONENTS.map((component) => (
              <SpecImageCard key={component.name} {...component} />
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

      <FAQSection
        items={ACCESSORY_FAQS}
        className="bg-bg-card border-y border-border-subtle py-24"
      />

      <ContactStrip />
    </main>
  );
}
