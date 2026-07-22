import { getBreadcrumbLabel } from '@/lib/breadcrumbs';

describe('getBreadcrumbLabel', () => {
  it('returns the mapped label when present', () => {
    expect(getBreadcrumbLabel('/about', 'about')).toBe('About Us');
  });

  it('falls back to title-casing the slug when unmapped', () => {
    expect(getBreadcrumbLabel('/unknown-route', 'unknown-route')).toBe('Unknown Route');
  });
});
