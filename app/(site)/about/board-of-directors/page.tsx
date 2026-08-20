import type { Metadata } from 'next';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { TRIBUTE_DIRECTOR, DIRECTORS } from '@/data/directors';

export const metadata: Metadata = genMeta({
  title: 'Board of Directors | Anil Balaji Steel',
  description:
    'The leadership behind Anil Balaji Steel, from founder Lt. Ved Prakash Agarwal to the executive board steering ABS today.',
  path: '/about/board-of-directors',
});

export default function BoardOfDirectorsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/about/board-of-directors');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-bg-dark pt-40 pb-24 overflow-hidden">
        <Container className="relative">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Leadership
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-3xl">
            <SplitTextReveal>Board of Directors</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-2xl">
            A powerful blend of tradition and technology, experience and innovation, family values
            and national mission; our leadership drives ABS toward a stronger, more inclusive India.
          </p>
        </Container>
      </section>

      <section className="relative bg-bg-card border-y border-border-subtle py-20">
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
                In Memory Of
              </p>
              <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight mb-2">
                {TRIBUTE_DIRECTOR.name}
              </h2>
              <p className="text-text-muted text-sm uppercase tracking-widest mb-6">
                {TRIBUTE_DIRECTOR.role}
              </p>
              <p className="text-text-body text-base leading-relaxed">{TRIBUTE_DIRECTOR.bio}</p>
            </div>
            <div className="relative z-[2] aspect-[1000/1314] max-w-md mx-auto w-full bg-black p-2 shadow-lg">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={TRIBUTE_DIRECTOR.image}
                  alt={TRIBUTE_DIRECTOR.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24 overflow-hidden">
        <Container>
          <div className="mb-14 text-center">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Executive Board
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Steering ABS Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DIRECTORS.map((director) => (
              <article key={director.name} className="relative h-full">
                <CardGlow className="h-full p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative z-[2] aspect-[1000/1314] w-full sm:w-40 shrink-0 overflow-hidden rounded">
                      <Image
                        src={director.image}
                        alt={director.name}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-text-primary font-semibold text-xl mb-1">
                        {director.name}
                      </h3>
                      <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
                        {director.role}
                      </p>
                      <p className="text-text-muted text-sm leading-relaxed">{director.bio}</p>
                    </div>
                  </div>
                  {director.quote && (
                    <blockquote className="flex gap-3 border-t border-border-subtle mt-6 pt-4">
                      <Quote className="w-4 h-4 text-abs-blue shrink-0 mt-1" aria-hidden="true" />
                      <p className="text-text-body text-sm italic leading-relaxed">
                        {director.quote}
                      </p>
                    </blockquote>
                  )}
                </CardGlow>
                <CardNuts />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
