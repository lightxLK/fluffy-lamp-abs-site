import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { generateProductSchema } from '@/lib/seo/generateProductSchema';
import { Container } from '@/components/layout/Container';
import { ProductPageHero } from '@/components/sections/ProductPageHero';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import { PRODUCTS } from '@/data/products';

const product = PRODUCTS.find((p) => p.slug === 'gi-laser-cutting')!;

export const metadata: Metadata = genMeta({
  title: 'GI Laser Cutting Sheet | Decorative Patterns | Anil Balaji Steel',
  description:
    'Precision-cut GI sheets in decorative laser-cut patterns for gates, grills, screens, and facade work. Wide range of standard patterns from the GLC design series.',
  path: '/products/gi-laser-cutting',
});

const GLC_SPECS = [
  { label: 'Thickness', value: '0.6 mm – 3 mm' },
  { label: 'Width', value: 'Up to 1500 mm' },
  { label: 'Length', value: 'Can be customised' },
];

const PATTERN_GALLERY = { prefix: 'GLC', groupCount: 8, codesPerGroup: 9 };

export default function GiLaserCuttingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/gi-laser-cutting');
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
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border-subtle pt-6 mb-14">
            {GLC_SPECS.map((spec) => (
              <div key={spec.label}>
                <p className="text-text-muted text-xs uppercase tracking-widest mb-1">
                  {spec.label}
                </p>
                <p className="text-text-primary text-sm font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>

          <p className="text-text-muted text-xs uppercase tracking-widest mb-6">
            GLC Design Series, {PATTERN_GALLERY.groupCount * PATTERN_GALLERY.codesPerGroup} Patterns
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: PATTERN_GALLERY.groupCount }, (_, idx) => {
              const { prefix, codesPerGroup } = PATTERN_GALLERY;
              const groupNum = idx + 1;
              const firstCode = idx * codesPerGroup + 1;
              const lastCode = firstCode + codesPerGroup - 1;
              const range = `${prefix}-${String(firstCode).padStart(3, '0')} – ${prefix}-${String(lastCode).padStart(3, '0')}`;
              return (
                <div key={groupNum}>
                  <div className="relative aspect-[2/1] bg-bg-mid border border-border-subtle overflow-hidden">
                    <Image
                      src={`/products/gi-laser-cutting/glc-group-${groupNum}.webp`}
                      alt={`GLC design series, ${range}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <p className="text-text-muted text-[11px] text-center uppercase tracking-widest mt-2">
                    Group {groupNum}, {range}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-bg-card border-y border-border-subtle py-24">
        <Container className="text-center">
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto mb-10">
            Need a custom pattern outside the GLC series? Talk to our team about bespoke laser-cut
            designs.
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
