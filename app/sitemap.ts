import type { MetadataRoute } from 'next';
import { NEWS } from '@/data/news';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.anilbalajisteel.com';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/about/board-of-directors',
  '/services',
  '/services/applications',
  '/services/fabrica',
  '/products',
  '/products/shutter',
  '/products/shutter-accessories',
  '/products/pipes',
  '/products/sheet',
  '/products/plain-sheets',
  '/products/coils',
  '/products/abrasives',
  '/contact',
  '/terms',
  '/careers',
  '/news',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const newsEntries = NEWS.map((article) => ({
    url: `${BASE_URL}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...newsEntries];
}
