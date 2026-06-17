import { generateProductSchema } from '@/lib/seo/generateProductSchema';

describe('generateProductSchema', () => {
  it('returns Product type', () => {
    const schema = generateProductSchema({
      name: 'Pipes',
      description: 'Steel pipes',
      category: 'Pipes',
    });
    expect(schema['@type']).toBe('Product');
  });

  it('sets brand to Anil Balaji Steel', () => {
    const schema = generateProductSchema({ name: 'Pipes', description: 'Desc', category: 'Pipes' });
    expect(schema.brand.name).toBe('Anil Balaji Steel');
  });
});
