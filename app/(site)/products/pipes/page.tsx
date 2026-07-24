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

const product = PRODUCTS.find((p) => p.slug === 'pipes')!;

export const metadata: Metadata = genMeta({
  title: 'Steel Pipes & Tubes | Round, Square & RHS Sections | ABS FlowPipe',
  description:
    'MS, GP and stainless steel pipes in round, square, and RHS sections. Full dimension range from ABS FlowPipe, 6,000 MT annual capacity, Howrah.',
  path: '/products/pipes',
});

const PIPE_FAQS = [
  {
    question: 'What materials are ABS pipes available in?',
    answer:
      'Mild steel (MS), galvanised pipe (GP), and stainless steel, across round, square, and RHS sections.',
  },
  {
    question: 'Can I order custom lengths?',
    answer: 'Yes. Custom lengths and dimensions are available on request across all pipe sections.',
  },
];

const PIPE_TABLES = [
  {
    name: 'Round Pipe',
    image: '/products/pipes/round-pipe.webp',
    columns: ['Outer Dia', 'Thickness', 'Weight/Piece'],
    rows: [
      ['1/2"', '14 – 18 SWG', '4 Kgs'],
      ['3/4"', '14 – 18 SWG', '5.5 Kgs'],
      ['1"', '14 – 20 SWG', '6.5 – 8.5 Kgs'],
      ['1.25"', '16 – 20 SWG', '9.5 – 12 Kgs'],
      ['1.5"', '12 – 18 SWG', '8 – 19 Kgs'],
      ['2"', '12 – 25 SWG', '9 – 21 Kgs'],
    ],
  },
  {
    name: 'Square Pipe',
    image: '/products/pipes/square-pipe.webp',
    columns: ['Size (mm)', 'Thickness (mm)', 'Weight/Piece'],
    rows: [
      ['19×19', '1.4 – 1.8', '5.5 – 7 Kgs'],
      ['25×25', '1.1 – 2.0', '5 – 10 Kgs'],
      ['32×32', '1.4 – 2.5', '8 – 14 Kgs'],
      ['38×38', '1.2 – 2.0', '8 – 15 Kgs'],
      ['48×48', '1.6 – 2.0', '14 – 20 Kgs'],
      ['60×60', '2.0 – 2.5', '24 – 28 Kgs'],
      ['72×72', '2.0 – 2.5', '29 – 32 Kgs'],
    ],
  },
  {
    name: 'RHS Pipe',
    image: '/products/pipes/rhs-pipe.webp',
    columns: ['Size (mm)', 'Thickness (mm)', 'Weight/Piece'],
    rows: [
      ['40×25', '1.4 – 2.0', '8 – 12 Kgs'],
      ['50×25', '1.4 – 2.5', '10 – 15 Kgs'],
      ['60×40', '1.6 – 2.0', '15 – 19 Kgs'],
      ['75×25', '1.6', '15 Kgs'],
      ['80×40', '2.5', '28 Kgs'],
    ],
  },
];

export default function PipesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/products/pipes');
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
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Dimensions
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              MS, GP &amp; Stainless Steel
            </h2>
          </div>

          <div className="space-y-14">
            {PIPE_TABLES.map((table) => (
              <div key={table.name} className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                <div className="relative z-[2] aspect-[4/3] bg-[#A5B8C2] border border-border-subtle overflow-hidden">
                  <Image
                    src={table.image}
                    alt={table.name}
                    fill
                    sizes="280px"
                    className="object-contain p-4"
                  />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold text-xl mb-6">{table.name}</h3>
                  <div className="overflow-x-auto border border-border-subtle">
                    <table className="w-full text-sm min-w-[480px]">
                      <thead>
                        <tr className="border-b border-border-subtle bg-bg-card">
                          {table.columns.map((col) => (
                            <th
                              key={col}
                              className="text-left text-text-muted text-xs uppercase tracking-widest font-medium px-6 py-4"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, i) => (
                          <tr key={i} className="border-b border-border-subtle last:border-0">
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={
                                  j === 0
                                    ? 'px-6 py-4 text-text-primary font-medium'
                                    : 'px-6 py-4 text-text-muted'
                                }
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-card border-y border-border-subtle py-24">
        <Container className="text-center">
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto mb-10">
            Custom lengths and dimensions available on request across all pipe sections.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </Container>
      </section>

      <FAQSection items={PIPE_FAQS} />

      <ContactStrip />
    </main>
  );
}
