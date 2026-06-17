interface ProductSchemaParams {
  name: string;
  description: string;
  category: string;
}

export function generateProductSchema({ name, description, category }: ProductSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    category,
    brand: {
      '@type': 'Brand',
      name: 'Anil Balaji Steel',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Anil Balaji Steel Pvt. Ltd.',
    },
  };
}
