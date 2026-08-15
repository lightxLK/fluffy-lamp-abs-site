import { render } from '@testing-library/react';
import FabricaExperiencePage, { metadata } from '@/app/(site)/services/fabrica/experience/page';

jest.mock('@google/model-viewer', () => ({}));

describe('fabrica experience page', () => {
  it('renders the page content directly, with no pointer-events-blocking wrapper', () => {
    const { container } = render(<FabricaExperiencePage />);
    expect(container.querySelector('h1')).not.toBeNull();
    expect(container.querySelector('.pointer-events-none.relative.z-10')).toBeNull();
  });

  it('renders the model showcase after the main page content, before the contact strip', () => {
    const { container } = render(<FabricaExperiencePage />);
    const heading = container.querySelector('h1')!;
    const showcaseModel = container.querySelector('model-viewer');
    expect(showcaseModel).not.toBeNull();
    // DOCUMENT_POSITION_FOLLOWING means the showcase comes *after* the hero
    // heading in document order.
    expect(
      heading.compareDocumentPosition(showcaseModel!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('is not independently indexable — it is a variant of /services/fabrica', () => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(String(metadata.alternates?.canonical)).toMatch(/\/services\/fabrica$/);
  });
});
