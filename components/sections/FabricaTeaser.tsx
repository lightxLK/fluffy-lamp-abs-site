import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import { HomeExitLink } from '@/components/layout/HomeExitLink';

export function FabricaTeaser() {
  return (
    <section
      className="relative bg-bg-mid min-h-[110vh] flex items-center justify-center overflow-hidden"
      id="fabrica"
    >
      {/* Background Image */}
      <Image src="/dssdfc.png" alt="Fabrica" fill className="object-cover object-top z-0" />

      {/* Color Overlay */}
      <div className="absolute inset-0 bg-[#0D0D0D]/65 z-[5] pointer-events-none" />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-linear-to-t from-[#0D0D0D] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <Container className="relative z-20 w-full">
        <div className="max-w-3xl mx-auto text-center py-24">
          <p className="text-white text-xs font-medium uppercase tracking-widest mb-4">
            Custom Fabrication
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight mb-6 text-white drop-shadow-md">
            Fabrica
          </h2>
          <p className="text-text-body text-lg leading-relaxed mb-6 text-white drop-shadow">
            Gates, pergolas, grilles, and custom steel structures, designed and fabricated in-house
            by our specialist team. Fabrica is where industrial precision meets architectural
            vision.
          </p>
          <p className="text-white text-base leading-relaxed mb-10 drop-shadow">
            Led by Ms. Komal Agarwal, our fabrication division has completed 500+ bespoke
            installations across West Bengal and Odisha.
          </p>
          <HomeExitLink
            href="/services/fabrica"
            sectionId="fabrica"
            className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300 shadow-lg"
          >
            Discover Fabrica
          </HomeExitLink>
        </div>
      </Container>
    </section>
  );
}
