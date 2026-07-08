import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export function CSRTeaser() {
  return (
    <section className="relative bg-bg-mid py-24 overflow-hidden">
      <Image
        src="/csr.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        draggable={false}
        className="object-cover select-none pointer-events-none"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, rgba(6,10,30,0.95) 0%, rgba(6,10,30,0.75) 40%, rgba(10,14,38,0.4) 70%, rgba(10,14,38,0.15) 100%)',
        }}
      />

      <Container className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-white text-xs font-medium uppercase tracking-widest mb-4">
            Social Responsibility
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight mb-6">
            Community &amp; Sustainability
          </h2>
          <p className="text-text-body text-lg leading-relaxed mb-10">
            Steel shapes infrastructure, but people shape communities. ABS invests in the
            neighbourhoods where our workers live, the schools their children attend, and the
            environment we all share.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-3 border border-border-subtle text-text-muted px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:text-white hover:border-white transition-colors duration-300"
          >
            Read Our Stories
          </Link>
        </div>
      </Container>
    </section>
  );
}
