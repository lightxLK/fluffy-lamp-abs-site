import { generateOrganizationSchema } from '@/lib/seo/generateOrganizationSchema';

describe('generateOrganizationSchema', () => {
  it('returns Organization type', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
  });

  it('contains correct name', () => {
    const schema = generateOrganizationSchema();
    expect(schema.name).toBe('Anil Balaji Steel Pvt. Ltd.');
  });

  it('contains phone number', () => {
    const schema = generateOrganizationSchema();
    expect(schema.telephone).toBe('+919007211599');
  });
});
