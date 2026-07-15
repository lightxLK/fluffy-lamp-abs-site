import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { EastIndiaMapScene } from '@/components/svg/scenes/EastIndiaMapScene';

export function NetworkSection() {
  return (
    <section className="bg-bg-dark py-24" id="network">
      <DrawSVGSection selector=".abs-path" className="block w-full">
        <EastIndiaMapScene className="w-full h-auto opacity-70 max-h-[80vh]" />
      </DrawSVGSection>

      <Container>
        <div className="text-center mt-16">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Eastern India &amp; Beyond
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Our Network
          </h2>
        </div>
      </Container>
    </section>
  );
}
