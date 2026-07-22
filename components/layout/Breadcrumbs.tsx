'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getBreadcrumbLabel, toTitleCase } from '@/lib/breadcrumbs';
import { NEWS } from '@/data/news';

interface Crumb {
  href: string;
  label: string;
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split('/').filter(Boolean);

  const crumbs: Crumb[] = [{ href: '/', label: 'Home' }];

  segments.forEach((seg, i) => {
    const href = `/${segments.slice(0, i + 1).join('/')}`;
    const isNewsArticle = segments[0] === 'news' && i === 1;
    const label = isNewsArticle
      ? (NEWS.find((a) => a.slug === seg)?.title ?? toTitleCase(seg))
      : getBreadcrumbLabel(href, seg);

    crumbs.push({ href, label });
  });

  return crumbs;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const crumbs = buildCrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="fixed top-24 inset-x-0 z-40 pointer-events-none">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 py-3 pointer-events-auto">
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-text-muted/50 text-xs">
                  /
                </span>
              )}
              {i === crumbs.length - 1 ? (
                <span
                  aria-current="page"
                  className="text-text-primary text-xs font-semibold uppercase tracking-widest"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-text-muted hover:text-text-primary transition-colors text-xs font-semibold uppercase tracking-widest"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
