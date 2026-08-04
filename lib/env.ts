// Set NEXT_PUBLIC_SITE_ENV=production only in the build that deploys to the
// real anilbalajisteel.com. Every other build (tsa.anilbalajisteel.com,
// local, previews) defaults to non-production, which keeps indexing off —
// see app/robots.ts and app/layout.tsx.
export const IS_PRODUCTION_SITE = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

// Absolute origin for metadata/schema URLs (og:image, canonical, sitemap,
// structured data). Tracks IS_PRODUCTION_SITE so dev builds on the staging
// subdomain resolve OG tags to a host that's actually reachable.
export const SITE_URL = IS_PRODUCTION_SITE
  ? 'https://anilbalajisteel.com'
  : 'https://tsa.anilbalajisteel.com';
