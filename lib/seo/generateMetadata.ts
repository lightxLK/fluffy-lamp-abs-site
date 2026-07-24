import type { Metadata } from 'next';

const BASE_URL = 'https://www.anilbalajisteel.com';

interface GenerateMetadataParams {
  title: string;
  description: string;
  path: string;
}

// Every route segment's own `openGraph`/`twitter` export replaces (rather than
// merges with) the inherited one during Next's metadata resolution, which
// silently drops the root's file-based opengraph-image/twitter-image unless
// each page re-declares its own `images`. So every call site must carry this.
const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: "Anil Balaji Steel — Eastern India's Most Trusted Steel",
};

export function generateMetadata({ title, description, path }: GenerateMetadataParams): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Anil Balaji Steel',
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}
