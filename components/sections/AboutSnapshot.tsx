import { Container } from '@/components/layout/Container';
import { RollingMillScene } from '@/components/svg/scenes/RollingMillScene';
import { HomeExitLink } from '@/components/layout/HomeExitLink';

export function AboutSnapshot() {
  return (
    <section className="relative bg-bg-dark py-24 overflow-hidden" id="about-snapshot">
      <div className="relative w-full">
        <RollingMillScene className="w-full h-auto opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-4 p-4 sm:p-8 translate-y-20 sm:translate-y-28">
          {(
            [
              { value: '1972', label: 'Founded' },
              { value: '250+', label: 'Dealers' },
              { value: '6', label: 'States' },
            ] as const
          ).map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-text-primary font-bold text-4xl sm:text-5xl">{stat.value}</p>
              <p className="text-text-muted text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div className="max-w-3xl mx-auto text-center mt-36 sm:mt-40">
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
            Our Legacy
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight mb-6">
            50 years of rolling steel for India
          </h2>
          <p className="text-text-body text-lg leading-relaxed mb-6">
            Founded in 1972 in Howrah, Anil Balaji Steel began as a modest rolling operation and
            grew into Eastern India&apos;s most recognised steel brand, a name on every shutter,
            roof, and frame across six states.
          </p>
          <p className="text-text-muted text-base leading-relaxed mb-10">
            Today, with 70+ professionals, 250+ dealer partners, and relationships with SAIL, Tata,
            JSW, and Jindal, we carry that legacy forward with precision.
          </p>
          <HomeExitLink
            href="/about"
            sectionId="about-snapshot"
            className="inline-flex items-center gap-3 bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
          >
            Our Story
          </HomeExitLink>
        </div>
      </Container>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(135deg, transparent 49.9%, rgba(6,36,203,0.04) 50%)',
        }}
      />
    </section>
  );
}
