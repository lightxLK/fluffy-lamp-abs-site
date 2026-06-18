import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { RollingMillScene } from '@/components/svg/scenes/RollingMillScene';

export function AboutSnapshot() {
  return (
    <section className="relative bg-bg-dark py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-abs-blue text-xs font-medium uppercase tracking-widest mb-4">
              Our Legacy
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight mb-6">
              50 years of rolling steel for India
            </h2>
            <p className="text-text-body text-lg leading-relaxed mb-6">
              Founded in 1972 in Howrah, Anil Balaji Steel began as a modest rolling operation and
              grew into Eastern India&apos;s most recognised steel brand — a name on every shutter,
              roof, and frame across six states.
            </p>
            <p className="text-text-muted text-base leading-relaxed mb-10">
              Today, with 70+ professionals, 250+ dealer partners, and relationships with SAIL,
              Tata, JSW, and Jindal, we carry that legacy forward with precision.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-abs-blue text-sm font-semibold uppercase tracking-widest hover:gap-5 transition-all duration-300"
            >
              Our Story
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <DrawSVGSection selector=".abs-path" className="relative">
            <RollingMillScene className="w-full h-auto opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-4 p-4">
              {(
                [
                  { value: '1972', label: 'Founded' },
                  { value: '250+', label: 'Dealers' },
                  { value: '6', label: 'States' },
                ] as const
              ).map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-text-primary font-bold text-2xl">{stat.value}</p>
                  <p className="text-text-muted text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </DrawSVGSection>
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
