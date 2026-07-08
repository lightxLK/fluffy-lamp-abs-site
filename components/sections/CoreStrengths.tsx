import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { CardGlow } from '@/components/ui/CardGlow';

const STRENGTHS = [
  {
    number: '01',
    title: 'Precision',
    body: 'Every profile, sheet, and pipe rolled to tolerance, gauge, camber, and finish checked at every stage.',
  },
  {
    number: '02',
    title: 'Innovation',
    body: 'Continuous R&D in shutter design, advanced coatings, and roll-forming automation.',
  },
  {
    number: '03',
    title: 'Engineering',
    body: 'A 60,000 sq. ft. Junglepur facility with integrated automation and IoT-ready monitoring.',
  },
  {
    number: '04',
    title: 'Finish',
    body: 'Protective film technology and hallmarked profiles, genuine ABS, verifiable on every product.',
  },
];

export function CoreStrengths() {
  return (
    <section className="relative bg-bg-mid py-24">
      <Container>
        <div className="mb-14 text-center">
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
            What Sets Us Apart
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Core Strengths
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STRENGTHS.map((s) => (
            <article key={s.number} className="h-full">
              <CardGlow className="h-full p-8">
                <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-4">
                  {s.number}
                </p>
                <h3 className="text-text-primary font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.body}</p>
              </CardGlow>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/about/board-of-directors"
            className="inline-flex items-center gap-3 text-abs-blue text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
          >
            Meet the Board
          </Link>
        </div>
      </Container>
    </section>
  );
}
