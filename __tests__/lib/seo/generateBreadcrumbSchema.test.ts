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

  it('uses the shared label map for mapped routes', () => {
    const schema = generateBreadcrumbSchema('/about');
    expect(schema.itemListElement[1].name).toBe('About Us');
  });

  it('uses the real article title for news slugs', () => {
    const schema = generateBreadcrumbSchema('/news/abs-fabrica-launched');
    expect(schema.itemListElement[2].name).toBe('ABS Fabrica Launches, Led by Ms. Komal Agarwal');
  });
});
