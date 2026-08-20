import { TESTIMONIALS } from '@/data/testimonials';
import { Container } from '@/components/layout/Container';

const REPEAT = 2;

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-bg-mid overflow-hidden"
      aria-label="Customer testimonials"
    >
      <Container>
        <p className="text-center text-text-muted text-xs uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-center text-text-primary font-bold text-3xl lg:text-4xl mb-12">
          What Our Partners Say
        </h2>
      </Container>

      <div className="group flex w-full overflow-hidden [--gap:1.5rem] [--duration:100s] gap-(--gap) marquee-mask">
        {Array.from({ length: REPEAT }).map((_, g) => (
          <div
            key={g}
            aria-hidden={g > 0}
            className="flex shrink-0 items-stretch gap-(--gap) animate-canopy-x group-hover:paused"
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <div
                key={`${g}-${i}`}
                className="w-[300px] md:w-[360px] shrink-0 whitespace-normal rounded-xl border border-border-subtle bg-bg-card p-6 md:p-8"
              >
                <p
                  aria-hidden="true"
                  className="text-abs-blue text-4xl font-serif leading-none mb-3"
                >
                  &ldquo;
                </p>
                <h3 className="text-text-primary font-semibold text-base mb-3">
                  {testimonial.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
