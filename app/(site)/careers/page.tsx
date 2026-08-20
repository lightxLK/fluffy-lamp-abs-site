import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';

export const metadata: Metadata = genMeta({
  title: 'Careers | Anil Balaji Steel',
  description:
    'Build your career with Eastern India’s most trusted steel manufacturer, 112+ professionals, 95% employee retention.',
  path: '/careers',
});

const VALUES = [
  {
    title: 'Integrity',
    body: 'We conduct every operation with honesty, fairness, and transparency.',
  },
  {
    title: 'People First',
    body: 'We empower every individual to grow with dignity, respect, and opportunity.',
  },
  {
    title: 'Innovation',
    body: 'We embrace technology and new ideas to make quality steel accessible.',
  },
  {
    title: 'Service to Nation',
    body: 'We measure success not only in profits, but in our contribution to India’s growth.',
  },
];

const STATS = [
  { value: '112+', label: 'Skilled Professionals' },
  { value: '95%', label: 'Employee Retention' },
  { value: '1,00,000', label: 'Sq. Ft. Facility' },
];

const OPENINGS = [
  {
    title: 'Accounts HoD',
    body: 'Lead the accounts function, own compliance, reporting, and financial controls across the group.',
  },
  {
    title: 'Sr. Electrical Engineer',
    body: 'Own electrical systems and automation across the Jangalpur facility, from maintenance to upgrades.',
  },
  {
    title: 'Project Supervisor',
    body: 'Drive fabrication and installation projects end to end, coordinating site teams and timelines.',
  },
];

export default function CareersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/careers');

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-bg-dark pt-40 pb-16">
        <Container>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Join Our Team
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-2xl">
            <SplitTextReveal>Build your career in steel</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-xl">
            From roll-forming lines to dealer relationships, ABS runs on the craftsmen and thinkers
            behind it. We invest in in-house training so every worker and engineer grows with the
            company.
          </p>
        </Container>
      </section>

      <section className="bg-bg-card border-y border-border-subtle py-16">
        <Container>
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-t border-border-subtle pt-6 text-center">
                <p className="text-text-primary font-bold text-4xl leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-text-muted text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-dark py-24 overflow-hidden">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              What We Stand For
            </p>
            <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
              Values that guide every hire
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <article key={value.title} className="relative h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{value.body}</p>
                </CardGlow>
                <CardNuts />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-mid py-24">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Current Openings
            </p>
            <h2 className="text-text-primary font-bold text-3xl lg:text-4xl leading-tight">
              Roles we&apos;re hiring for
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {OPENINGS.map((role) => (
              <article key={role.title} className="relative h-full">
                <CardGlow className="h-full p-8">
                  <h3 className="text-text-primary font-semibold text-lg mb-3">{role.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{role.body}</p>
                </CardGlow>
                <CardNuts />
              </article>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-text-muted text-base leading-relaxed mb-10">
              Don&apos;t see the right fit? We&apos;re always looking for skilled hands and sharp
              minds across production, sales, and fabrication. Reach out and we&apos;ll keep you in
              mind for the next opening.
            </p>
            <Link
              href="mailto:viren@anilbalajisteel.com?subject=Career%20Enquiry"
              className="inline-flex items-center gap-3 relative z-[2] bg-abs-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-abs-blue-dark transition-colors duration-300"
            >
              Email Your Resume
            </Link>
          </div>
        </Container>
      </section>

      <ContactStrip />
    </main>
  );
}
