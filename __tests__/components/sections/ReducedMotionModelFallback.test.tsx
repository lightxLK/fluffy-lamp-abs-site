import { render } from '@testing-library/react';
import { ReducedMotionModelFallback } from '@/components/sections/ReducedMotionModelFallback';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';

jest.mock('@google/model-viewer', () => ({}));

function mockNormalMotion() {
  return jest.spyOn(window, 'matchMedia').mockReturnValue({
    matches: false,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as MediaQueryList);
}

describe('ReducedMotionModelFallback', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing when reduced motion is not preferred', () => {
    mockNormalMotion();
    const { container } = render(<ReducedMotionModelFallback />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all six models as static, drag-only cards when reduced motion is preferred', () => {
    // jest.setup.ts's default matchMedia stub returns matches: true for
    // prefers-reduced-motion, so no override needed here.
    const { container } = render(<ReducedMotionModelFallback />);
    const viewers = Array.from(container.querySelectorAll('model-viewer'));

    expect(viewers).toHaveLength(6);
    const srcs = viewers.map((el) => el.getAttribute('src'));
    expect(srcs.sort()).toEqual(
      Object.values(MODEL_ASSETS)
        .map((m) => m.src)
        .sort(),
    );

    // The reduced-motion contract (matching the original StairsScrollScene
    // reduced-motion branch) is manual-only: camera-controls on, no
    // automatic motion. auto-rotate here would itself be motion the
    // visitor's OS-level preference asked to suppress.
    for (const viewer of viewers) {
      expect(viewer).not.toHaveAttribute('auto-rotate');
      expect(viewer).toHaveAttribute('camera-controls');
    }
  });
});
