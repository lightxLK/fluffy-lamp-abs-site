import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { CardGlow } from '@/components/ui/CardGlow';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { NEWS } from '@/data/news';

export const metadata: Metadata = genMeta({
  title: 'News & Community | Anil Balaji Steel',
  description:
    'Milestones, CSR initiatives, and updates from Anil Balaji Steel, from ABS Fabrica to Steel That Cares.',
  path: '/news',
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/news');
  const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-bg-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-40 pb-16">
        <Container>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Community &amp; Milestones
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-2xl">
            <SplitTextReveal>News</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-xl">
            Updates from the mill floor to the boardroom, milestones, CSR initiatives, and
            what&apos;s next for Anil Balaji Steel.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sorted.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group block h-full"
              >
                <CardGlow className="h-full p-8">
                  <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
                    {formatDate(article.date)}
                  </p>
                  <h2 className="text-text-primary font-semibold text-xl leading-tight mb-4">
                    {article.title}
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-abs-blue text-xs font-semibold uppercase tracking-widest">
                    Read More
                  </span>
                </CardGlow>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
