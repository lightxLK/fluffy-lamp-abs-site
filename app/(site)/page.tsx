import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateOrganizationSchema } from '@/lib/seo/generateOrganizationSchema';

import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { HomePreloader } from '@/components/preloader/HomePreloader';

const AboutSnapshot = dynamic(() =>
  import('@/components/sections/AboutSnapshot').then((m) => m.AboutSnapshot),
);
const ProductsSection = dynamic(() =>
  import('@/components/sections/ProductsSection').then((m) => m.ProductsSection),
);
const WhyABS = dynamic(() => import('@/components/sections/WhyABS').then((m) => m.WhyABS));
const BrandTrustBar = dynamic(() =>
  import('@/components/sections/BrandTrustBar').then((m) => m.BrandTrustBar),
);
const FabricaTeaser = dynamic(() =>
  import('@/components/sections/FabricaTeaser').then((m) => m.FabricaTeaser),
);
const NetworkSection = dynamic(() =>
  import('@/components/sections/NetworkSection').then((m) => m.NetworkSection),
);
const CSRTeaser = dynamic(() => import('@/components/sections/CSRTeaser').then((m) => m.CSRTeaser));
const ContactStrip = dynamic(() =>
  import('@/components/sections/ContactStrip').then((m) => m.ContactStrip),
);
const ConnectorCurves = dynamic(() =>
  import('@/components/svg/ConnectorCurves').then((m) => m.ConnectorCurves),
);

export const metadata: Metadata = genMeta({
  title: "Anil Balaji Steel | Eastern India's Trusted Steel Manufacturer Since 1972",
  description:
    'Rolling shutter profiles, pipes, roofing sheets, coils and steel fabrication from Howrah, West Bengal. 50 years, 427 dealers, 1,00,000 MT annual capacity.',
  path: '/',
});

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <HomePreloader>
        <HeroSection />
      </HomePreloader>
      <TrustBar />

      <div className="relative">
        <ConnectorCurves />
        <AboutSnapshot />
      </div>

      <div className="relative">
        <ConnectorCurves flip />
        <ProductsSection />
      </div>

      <WhyABS />
      <BrandTrustBar />

      <div className="relative">
        <ConnectorCurves />
        <FabricaTeaser />
      </div>

      <NetworkSection />
      <CSRTeaser />
      <ContactStrip />
    </>
  );
}
