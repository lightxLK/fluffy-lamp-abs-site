import type { Metadata } from 'next';

const BASE_URL = 'https://www.anilbalajisteel.com';

interface GenerateMetadataParams {
  title: string;
  description: string;
  path: string;
}

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
    },
  };
}
