import { Container } from '@/components/layout/Container';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';

const REASONS = [
  {
    number: '01',
    title: '50-Year Track Record',
    body: 'Half a century of delivering steel on spec, on time, and on trust, ask any builder in Bengal.',
  },
  {
    number: '02',
    title: 'Direct Mill Sourcing',
    body: 'We source prime material from SAIL, Tata, JSW, and Jindal, no middleman, no grade uncertainty.',
  },
  {
    number: '03',
    title: '250+ Dealer Network',
    body: 'Our partners span seven states. Wherever you build, ABS material is within reach.',
  },
  {
    number: '04',
    title: 'In-House Fabrication',
    body: 'Fabrica brings custom design and fabrication under one roof, fewer handoffs, tighter tolerances.',
  },
  {
    number: '05',
    title: 'Full Product Range',
    body: 'Profiles, pipes, sheets, coils, sheds, one supplier for your entire project bill of materials.',
  },
  {
    number: '06',
    title: '70+ Steel Professionals',
    body: 'From rolling to dispatch, our team has the domain knowledge to solve problems before they reach you.',
  },
];

export function WhyABS() {
  return (
    <section className="relative bg-bg-dark py-24 overflow-hidden" id="why-abs">
      <Container className="relative">
        <div className="mb-14 text-center">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            The ABS Advantage
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Why ABS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => (
            <article key={reason.number} className="relative h-full">
              <CardGlow className="h-full p-8">
                <p className="text-abs-blue text-xs font-bold uppercase tracking-widest mb-4">
                  {reason.number}
                </p>
                <h3 className="text-text-primary font-semibold text-lg mb-3">{reason.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{reason.body}</p>
              </CardGlow>
              <CardNuts />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
