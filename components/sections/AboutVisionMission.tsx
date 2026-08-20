import { Container } from '@/components/layout/Container';

export function AboutVisionMission() {
  return (
    <section className="relative bg-bg-dark pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 max-w-6xl">
          <div>
            <p className="text-abs-blue text-sm font-bold uppercase tracking-widest mb-4">
              Our Vision
            </p>
            <p className="text-text-body text-lg leading-relaxed">
              To become India&apos;s most trusted name in steel by making quality,
              technology-enabled solutions accessible to all, and by building a culture of service,
              integrity, and upliftment that empowers every life we touch.
            </p>
          </div>

          <div>
            <p className="text-abs-blue text-sm font-bold uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <p className="text-text-body text-lg leading-relaxed">
              To democratise access to quality, technology-driven steel solutions across India,
              empowering people, partners, and communities through innovation, integrity, and a deep
              commitment to nation-building.
            </p>
          </div>

          <div>
            <p className="text-abs-blue text-sm font-bold uppercase tracking-widest mb-4">
              Our Values
            </p>
            <p className="text-text-body text-lg leading-relaxed">
              Integrity guides every decision, from the mill floor to the boardroom. We build with
              innovation, keep quality accessible to all, and put people and partnerships first,
              always mindful of our responsibility to the nation and the environment we share.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
