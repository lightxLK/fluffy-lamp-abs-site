const BASE_URL = 'https://www.anilbalajisteel.com';

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generateBreadcrumbSchema(path: string) {
  const segments = path.split('/').filter(Boolean);

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    ...segments.map((seg, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: toTitleCase(seg),
      item: `${BASE_URL}/${segments.slice(0, i + 1).join('/')}`,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
