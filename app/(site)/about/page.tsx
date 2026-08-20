import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';

import { AboutHero } from '@/components/sections/AboutHero';
import { AboutVisionMission } from '@/components/sections/AboutVisionMission';
import { AboutTimeline } from '@/components/sections/AboutTimeline';
import { CoreStrengths } from '@/components/sections/CoreStrengths';
import { BrandTrustBar } from '@/components/sections/BrandTrustBar';
import { ContactStrip } from '@/components/sections/ContactStrip';

export const metadata: Metadata = genMeta({
  title: 'About Anil Balaji Steel | 50 Years of Steel Manufacturing in Howrah',
  description:
    'From steel broker to Eastern India’s leading rolling mill. The story, values, and leadership of Anil Balaji Steel Pvt. Ltd., est. 1975.',
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
      <AboutVisionMission />
      <AboutTimeline />
      <CoreStrengths />
      <BrandTrustBar />
      <ContactStrip />
    </main>
  );
}
