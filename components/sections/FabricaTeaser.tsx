import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { GatePergolaScene } from '@/components/svg/scenes/GatePergolaScene';

export function FabricaTeaser() {
  return (
    <section className="relative bg-bg-mid py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <DrawSVGSection selector=".abs-path" className="order-2 lg:order-1">
            <GatePergolaScene className="w-full h-auto opacity-60" />
          </DrawSVGSection>

          <div className="order-1 lg:order-2">
            <p className="text-abs-blue text-xs font-medium uppercase tracking-widest mb-4">
              Custom Fabrication
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight mb-6">
              Fabrica
            </h2>
            <p className="text-text-body text-lg leading-relaxed mb-6">
              Gates, pergolas, grilles, and custom steel structures — designed and fabricated
              in-house by our specialist team. Fabrica is where industrial precision meets
              architectural vision.
            </p>
            <p className="text-text-muted text-base leading-relaxed mb-10">
              Led by Ms. Komal Agarwal, our fabrication division has completed 500+ bespoke
              installations across West Bengal and Odisha.
            </p>
            <Link
              href="/services/fabrica"
              className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
            >
              Discover Fabrica
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
