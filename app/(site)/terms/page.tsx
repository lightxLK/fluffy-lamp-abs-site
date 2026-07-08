import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';

export const metadata: Metadata = genMeta({
  title: 'Terms & Conditions | Anil Balaji Steel',
  description:
    'Terms and conditions governing the use of the Anil Balaji Steel website and services.',
  path: '/terms',
});

const SECTIONS = [
  {
    title: 'Orders & Quotations',
    body: 'Quotations issued by Anil Balaji Steel Pvt. Ltd. are valid for 7 days from the date of issue unless stated otherwise. Prices are subject to change based on raw material and freight costs at the time of order confirmation.',
  },
  {
    title: 'Product Specifications',
    body: 'Dimensions, thickness, and weight figures published on this website are indicative and subject to standard manufacturing tolerances. Certified test certificates are available on request for bulk orders.',
  },
  {
    title: 'Delivery',
    body: 'Delivery timelines are estimated at the time of order confirmation and may vary due to logistics, weather, or force majeure events. Risk transfers to the buyer upon dispatch unless otherwise agreed in writing.',
  },
  {
    title: 'Payments',
    body: 'Payment terms are agreed per order and confirmed via invoice. Late payments may attract interest as per applicable law.',
  },
  {
    title: 'Warranty & Returns',
    body: 'Products found defective at the time of delivery, verified against the delivery challan, are eligible for replacement. Products altered, cut, or installed cannot be returned.',
  },
  {
    title: 'Intellectual Property',
    body: 'All trademarks, including ABS ShaktiShutter™, ABS TotalShutter™, ABS BlueShield™, ABS EdgeCut™, ABS CoreLine™, and ABS FlowPipe™, are the property of Anil Balaji Steel Pvt. Ltd.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by the laws of India, with disputes subject to the exclusive jurisdiction of the courts of Howrah, West Bengal.',
  },
];

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/terms');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-bg-dark pt-40 pb-16">
        <Container>
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-6xl leading-none mb-6 max-w-2xl">
            <SplitTextReveal>Terms &amp; Conditions</SplitTextReveal>
          </h1>
          <p className="text-text-muted text-sm">Last updated: April 2026</p>
        </Container>
      </section>

      <section className="bg-bg-dark pb-24">
        <Container>
          <div className="max-w-3xl space-y-12">
            {SECTIONS.map((section, i) => (
              <div key={section.title} className="border-t border-border-subtle pt-8">
                <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="text-text-primary font-semibold text-xl mb-4">{section.title}</h2>
                <p className="text-text-body text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
