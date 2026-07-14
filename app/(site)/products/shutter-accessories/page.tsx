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

const product = PRODUCTS.find((p) => p.slug === 'shutter-accessories')!;

export const metadata: Metadata = genMeta({
  title: `${product.name} | Anil Balaji Steel`,
  description: product.description,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPONENTS.map((component) => (
              <CardGlow key={component.name} className="p-8">
                <h3 className="text-text-primary font-semibold text-lg mb-4">{component.name}</h3>
                <ul className="space-y-2">
                  {component.specs.map((s) => (
                    <li key={s} className="text-text-muted text-sm leading-relaxed">
                      {s}
                    </li>
                  ))}
                </ul>
              </CardGlow>
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

      <ContactStrip />
    </main>
  );
}
