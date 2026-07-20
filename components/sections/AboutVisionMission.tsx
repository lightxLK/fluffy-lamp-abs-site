import { Container } from '@/components/layout/Container';

export function AboutVisionMission() {
  return (
    <section className="relative bg-bg-dark pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-4xl">
          <div>
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Our Vision
            </p>
            <p className="text-text-body text-base leading-relaxed">
              To become India&apos;s most trusted name in steel by making quality,
              technology-enabled solutions accessible to all, and by building a culture of service,
              integrity, and upliftment that empowers every life we touch.
            </p>
          </div>

          <div>
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <p className="text-text-body text-base leading-relaxed">
              To democratise access to quality, technology-driven steel solutions across India,
              empowering people, partners, and communities through innovation, integrity, and a deep
              commitment to nation-building.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
