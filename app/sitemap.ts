import type { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

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
  '/products/chequered-plate',
  '/products/plain-sheets',
  '/contact',
  '/terms',
  '/careers',
  '/news',
];

function getNewsSlugs(): string[] {
  try {
    const newsDir = join(process.cwd(), 'content', 'news');
    return readdirSync(newsDir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => `/news/${f.replace('.mdx', '')}`);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const newsRoutes = getNewsSlugs();
  const allRoutes = [...STATIC_ROUTES, ...newsRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}
