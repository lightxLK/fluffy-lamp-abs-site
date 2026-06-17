import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';

describe('generateBreadcrumbSchema', () => {
  it('returns BreadcrumbList type', () => {
    const schema = generateBreadcrumbSchema('/products/pipes');
    expect(schema['@type']).toBe('BreadcrumbList');
  });

  it('first item is Home', () => {
    const schema = generateBreadcrumbSchema('/products/pipes');
    expect(schema.itemListElement[0].name).toBe('Home');
    expect(schema.itemListElement[0].position).toBe(1);
  });

  it('includes all path segments', () => {
    const schema = generateBreadcrumbSchema('/products/pipes');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[2].name).toBe('Pipes');
  });
});
