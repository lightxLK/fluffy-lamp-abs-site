import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ABSLogoMarkScene } from '@/components/svg/scenes/ABSLogoMarkScene';

export function AboutHero() {
  return (
    <section className="relative bg-bg-dark pt-40 pb-24 overflow-hidden">
      <Container className="relative grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            From Courage to Empire
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
            <SplitTextReveal>50 years of trust, forged in steel</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-2xl">
            In 1972, Ved Prakash Agarwal left Hansi, Haryana with nothing but determination and a
            few annas in his pocket. His journey, from steel broker to mill owner, became the
            foundation of Anil Balaji Steel and every product we make today.
          </p>
        </div>

        <div className="relative aspect-square p-10 hidden lg:block">
          <ABSLogoMarkScene className="w-full h-full" />
        </div>
      </Container>
    </section>
  );
}
