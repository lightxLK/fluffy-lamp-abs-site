import { generateMetadata } from '@/lib/seo/generateMetadata';

describe('generateMetadata', () => {
  it('returns title and description', () => {
    const meta = generateMetadata({
      title: 'Pipes',
      description: 'Steel pipes',
      path: '/products/pipes',
    });
    expect(meta.title).toBe('Pipes');
    expect(meta.description).toBe('Steel pipes');
  });

  it('sets canonical URL from path', () => {
    const meta = generateMetadata({ title: 'Pipes', description: 'Desc', path: '/products/pipes' });
    expect((meta.alternates as { canonical: string }).canonical).toBe(
      'https://www.anilbalajisteel.com/products/pipes',
    );
  });

  it('sets openGraph url', () => {
    const meta = generateMetadata({ title: 'Pipes', description: 'Desc', path: '/products/pipes' });
    expect((meta.openGraph as { url: string }).url).toBe(
      'https://www.anilbalajisteel.com/products/pipes',
    );
  });
});
