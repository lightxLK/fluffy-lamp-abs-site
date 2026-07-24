// Set NEXT_PUBLIC_SITE_ENV=production only in the build that deploys to the
// real anilbalajisteel.com. Every other build (tsa.anilbalajisteel.com,
// local, previews) defaults to non-production, which keeps indexing off —
// see app/robots.ts and app/layout.tsx.
export const IS_PRODUCTION_SITE = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
