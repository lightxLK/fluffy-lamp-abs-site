import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { NEWS } from '@/data/news';

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS.find((a) => a.slug === slug);

  if (!article) {
    return genMeta({
      title: 'News | Anil Balaji Steel',
      description: 'Article not found.',
      path: `/news/${slug}`,
    });
  }

  return genMeta({
    title: `${article.title} | Anil Balaji Steel`,
    description: article.excerpt,
    path: `/news/${slug}`,
  });
}

export function generateStaticParams() {
  return NEWS.map((article) => ({ slug: article.slug }));
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = NEWS.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema(`/news/${slug}`);

  return (
    <main className="min-h-screen bg-bg-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-40 pb-16">
        <Container>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-text-muted text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-200 mb-8"
          >
            <span aria-hidden="true">←</span>
            Back to News
          </Link>
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
            {formatDate(article.date)}
          </p>
          <h1 className="text-text-primary font-bold text-4xl lg:text-6xl leading-tight max-w-3xl">
            <SplitTextReveal>{article.title}</SplitTextReveal>
          </h1>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="max-w-2xl space-y-6">
            {article.body.map((para, i) => (
              <p key={i} className="text-text-body text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
