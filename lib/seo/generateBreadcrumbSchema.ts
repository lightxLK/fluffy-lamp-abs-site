import { getBreadcrumbLabel } from '@/lib/breadcrumbs';
import { NEWS } from '@/data/news';
import { SITE_URL as BASE_URL } from '@/lib/env';

export function generateBreadcrumbSchema(path: string) {
  const segments = path.split('/').filter(Boolean);

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    ...segments.map((seg, i) => {
      const itemPath = `/${segments.slice(0, i + 1).join('/')}`;
      const isNewsArticle = segments[0] === 'news' && i === 1;
      const name = isNewsArticle
        ? (NEWS.find((a) => a.slug === seg)?.title ?? getBreadcrumbLabel(itemPath, seg))
        : getBreadcrumbLabel(itemPath, seg);

      return {
        '@type': 'ListItem',
        position: i + 2,
        name,
        item: `${BASE_URL}${itemPath}`,
      };
    }),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
