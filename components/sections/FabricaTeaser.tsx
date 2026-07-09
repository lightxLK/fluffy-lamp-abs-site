import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { GatePergolaScene } from '@/components/svg/scenes/GatePergolaScene';
import { HomeExitLink } from '@/components/layout/HomeExitLink';

export function FabricaTeaser() {
  return (
    <section className="relative bg-bg-mid py-24 overflow-hidden" id="fabrica">
      <DrawSVGSection selector=".abs-path" className="block w-full" duration={30}>
        <GatePergolaScene className="w-full h-auto opacity-60 max-h-[70vh]" />
      </DrawSVGSection>

      <Container>
        <div className="max-w-3xl mx-auto text-center mt-16">
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
            Custom Fabrication
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight mb-6">
            Fabrica
          </h2>
          <p className="text-text-body text-lg leading-relaxed mb-6">
            Gates, pergolas, grilles, and custom steel structures, designed and fabricated in-house
            by our specialist team. Fabrica is where industrial precision meets architectural
            vision.
          </p>
          <p className="text-text-muted text-base leading-relaxed mb-10">
            Led by Ms. Komal Agarwal, our fabrication division has completed 500+ bespoke
            installations across West Bengal and Odisha.
          </p>
          <HomeExitLink
            href="/services/fabrica"
            sectionId="fabrica"
            className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Discover Fabrica
          </HomeExitLink>
        </div>
      </Container>
    </section>
  );
}
