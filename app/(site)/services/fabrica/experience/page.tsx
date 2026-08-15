import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { FabricaModelShowcase } from '@/components/sections/FabricaModelShowcase';

// This route is an interactive variant of `/services/fabrica`, not a
// separate topic — its copy is near-identical, so indexing both would be
// self-competing duplicate content. It is deliberately kept out of
// `app/sitemap.ts`, marked `noindex`, and canonicalised at the real
// `/services/fabrica` page, which stays the single indexable URL.
export const metadata: Metadata = {
  ...genMeta({
    title: 'ABS Fabrica Experience | Interactive Steel Fabrication Showcase',
    description:
      'An interactive 3D showcase of ABS Fabrica gates, facades, window grills, and interior landscaping.',
    path: '/services/fabrica',
  }),
  robots: { index: false, follow: true },
};

export default function FabricaExperiencePage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/services/fabrica/experience');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <FabricaModelShowcase />
    </main>
  );
}
