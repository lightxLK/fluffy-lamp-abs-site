import { Container } from '@/components/layout/Container';
import { NetworkExplorer } from '@/components/network/NetworkExplorer';

export function NetworkSection() {
  return (
    <section className="bg-bg-dark py-24" id="network">
      <Container>
        <div className="text-center">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Eastern India &amp; Beyond
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Our Network
          </h2>
        </div>

        <div className="mt-16">
          <NetworkExplorer />
        </div>
      </Container>
    </section>
  );
}
