import { render } from '@testing-library/react';
import FabricaExperiencePage, { metadata } from '@/app/(site)/services/fabrica/experience/page';

jest.mock('@google/model-viewer', () => ({}));

describe('fabrica experience page', () => {
  it('renders only the model showcase — all six rotating, mouse-interactive cards', () => {
    const { container } = render(<FabricaExperiencePage />);
    const viewers = Array.from(container.querySelectorAll('model-viewer'));
    expect(viewers).toHaveLength(6);
    for (const viewer of viewers) {
      expect(viewer).toHaveAttribute('auto-rotate');
      expect(viewer).toHaveAttribute('camera-controls');
    }
  });

  it('is not independently indexable — it is a variant of /services/fabrica', () => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(String(metadata.alternates?.canonical)).toMatch(/\/services\/fabrica$/);
  });
});
