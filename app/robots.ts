import type { MetadataRoute } from 'next';
import { IS_PRODUCTION_SITE } from '@/lib/env';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_SITE) {
    // Staging/testing deploy (e.g. tsa.anilbalajisteel.com) — keep it out of
    // search entirely until DNS cuts over to the real domain.
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.anilbalajisteel.com/sitemap.xml',
  };
}
