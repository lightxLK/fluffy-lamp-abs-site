export const BREADCRUMB_LABELS: Record<string, string> = {
  '/about': 'About Us',
  '/about/board-of-directors': 'Board of Directors',
  '/products': 'Products',
  '/products/coils': 'Coils',
  '/products/pipes': 'Pipes',
  '/products/roofing-sheet': 'Roofing Sheets',
  '/products/plain-sheets': 'Plain Sheets',
  '/products/shutter': 'Rolling Shutters',
  '/products/shutter-accessories': 'Shutter Accessories',
  '/products/abrasives': 'Abrasives',
  '/services': 'Services',
  '/services/fabrica': 'Fabrica',
  '/services/applications': 'Applications',
  '/careers': 'Careers',
  '/contact': 'Contact Us',
  '/terms': 'Terms & Conditions',
  '/news': 'Community',
};

export function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getBreadcrumbLabel(path: string, fallbackSlug: string): string {
  return BREADCRUMB_LABELS[path] ?? toTitleCase(fallbackSlug);
}
