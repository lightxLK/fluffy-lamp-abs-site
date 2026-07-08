import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';

import { AboutHero } from '@/components/sections/AboutHero';
import { AboutTimeline } from '@/components/sections/AboutTimeline';
import { CoreStrengths } from '@/components/sections/CoreStrengths';
import { BrandTrustBar } from '@/components/sections/BrandTrustBar';
import { ContactStrip } from '@/components/sections/ContactStrip';

export const metadata: Metadata = genMeta({
  title: 'About Us | Anil Balaji Steel',
  description:
    'From a steel broker in 1972 to Eastern India’s most trusted steel manufacturer, the story of Anil Balaji Steel.',
  path: '/about',
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/about');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <AboutHero />
      <AboutTimeline />
      <CoreStrengths />
      <BrandTrustBar />
      <ContactStrip />
    </main>
  );
}
