import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import { HomeExitLink } from '@/components/layout/HomeExitLink';

const ANNOTATIONS = [
  { label: 'Pergola', x: 49, y: 21.6 },
  { label: 'Railings', x: 20, y: 48.7 },
  { label: 'Staircase', x: 60, y: 64 },
  { label: 'Cabana', x: 82, y: 58 },
  { label: 'Border Walled Fencing', x: 11, y: 83.6 },
  { label: 'Swing Gate', x: 45, y: 83.6 },
] as const;

export function FabricaTeaser() {
  return (
    <section
      className="relative bg-bg-dark border-y border-border-subtle min-h-[110dvh] flex items-center justify-center overflow-hidden"
      id="fabrica"
    >
      {/* Background Image */}
      <Image
        src="/fabrica_cover.jpg.jpeg"
        alt="Fabrica"
        fill
        sizes="100vw"
        className="object-cover object-top z-0"
      />

      {/* Color Overlay */}
      <div className="absolute inset-0 bg-[#0D0D0D]/65 z-[5] pointer-events-none" />

      {/* Annotation Highlights */}
      <div className="absolute inset-0 z-[6] pointer-events-none hidden lg:block">
        {ANNOTATIONS.map((point) => (
          <div
            key={point.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inset-0 rounded-full bg-abs-blue animate-ping opacity-60" />
              <span className="relative rounded-full h-3 w-3 bg-abs-blue border border-white/40" />
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 bg-bg-dark/80 backdrop-blur-sm border border-border-subtle whitespace-nowrap"
              style={{ color: '#011152' }}
            >
              {point.label}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <Container className="relative z-20 w-full">
        <div className="max-w-3xl mx-auto text-center py-24">
          <p className="text-white text-xs font-medium uppercase tracking-widest mb-4">
            Custom Fabrication
          </p>
          <h2 className="font-bold text-4xl lg:text-5xl leading-tight mb-6 text-white drop-shadow-md">
            Fabrica
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-white font-semibold drop-shadow">
            Gates, pergolas, grilles, and custom steel structures, designed and fabricated in-house
            by our specialist team. Fabrica is where industrial precision meets architectural
            vision.
          </p>
          <p className="text-white text-base leading-relaxed mb-10 font-semibold drop-shadow">
            Led by Ms. Komal Agarwal, our fabrication division has completed 532 bespoke
            installations across West Bengal and Odisha.
          </p>
          <HomeExitLink
            href="/services/fabrica"
            sectionId="fabrica"
            className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300 shadow-lg"
          >
            Discover Fabrica
          </HomeExitLink>
        </div>
      </Container>
    </section>
  );
}
