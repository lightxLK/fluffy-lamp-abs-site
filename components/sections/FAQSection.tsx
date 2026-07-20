import { Container } from '@/components/layout/Container';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({
  items,
  className = 'bg-bg-dark py-24',
}: {
  items: FAQItem[];
  className?: string;
}) {
  return (
    <section className={className}>
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Frequently Asked
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Questions, answered
          </h2>
        </div>

        <div className="max-w-3xl divide-y divide-border-subtle">
          {items.map((item) => (
            <div key={item.question} className="py-8 first:pt-0">
              <h3 className="text-text-primary font-semibold text-lg mb-3">{item.question}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
