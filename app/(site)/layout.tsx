import { GSAPProvider } from '@/components/animations/GSAPProvider';
import { LenisProvider } from '@/components/animations/LenisProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BackNavigationTracker } from '@/components/layout/BackNavigationTracker';
import { HomeReturnScroll } from '@/components/layout/HomeReturnScroll';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <GSAPProvider>
      <LenisProvider>
        <BackNavigationTracker />
        <HomeReturnScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </LenisProvider>
    </GSAPProvider>
  );
}
