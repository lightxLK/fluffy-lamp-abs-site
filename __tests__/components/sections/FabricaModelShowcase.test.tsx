import { render } from '@testing-library/react';
import { FabricaModelShowcase } from '@/components/sections/FabricaModelShowcase';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';

jest.mock('@google/model-viewer', () => ({}));

describe('FabricaModelShowcase', () => {
  it('renders all six models as auto-rotating, mouse-interactive cards', () => {
    const { container } = render(<FabricaModelShowcase />);
    const viewers = Array.from(container.querySelectorAll('model-viewer'));

    expect(viewers).toHaveLength(6);
    const srcs = viewers.map((el) => el.getAttribute('src'));
    expect(srcs.sort()).toEqual(
      Object.values(MODEL_ASSETS)
        .map((m) => m.src)
        .sort(),
    );

    for (const viewer of viewers) {
      expect(viewer).toHaveAttribute('auto-rotate');
      expect(viewer).toHaveAttribute('camera-controls');
    }
  });
});
