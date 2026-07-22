import { GSAPProvider } from '@/components/animations/GSAPProvider';
import { LenisProvider } from '@/components/animations/LenisProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BackButton } from '@/components/layout/BackButton';
import { BackNavigationTracker } from '@/components/layout/BackNavigationTracker';
import { HomeReturnScroll } from '@/components/layout/HomeReturnScroll';
import { ScrollMemoryTracker } from '@/components/layout/ScrollMemoryTracker';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <GSAPProvider>
      <LenisProvider>
        <BackNavigationTracker />
        <ScrollMemoryTracker />
        <HomeReturnScroll />
        <Navbar />
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackButton />
      </LenisProvider>
    </GSAPProvider>
  );
}
