import { render, fireEvent } from '@testing-library/react';
import { StairsScrollScene } from '@/components/sections/StairsScrollScene';
import { ScrollTrigger } from '@/lib/gsap';
import { STAIRS_ROTATION_DEG, STAIRS_DESCENT_M } from '@/lib/three/stairsCamera';

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

describe('StairsScrollScene', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('enables camera controls and skips scroll-driven animation when reduced motion is preferred', () => {
    // jest.setup.ts's default matchMedia stub returns matches: true for any
    // prefers-reduced-motion query, so no override is needed for this branch.
    const { container } = render(<StairsScrollScene />);
    const el = container.querySelector('model-viewer') as unknown as { cameraControls?: boolean };
    expect(el).not.toBeNull();
    expect(el?.cameraControls).toBe(true);
  });

  it('renders without throwing when reduced motion is not preferred', () => {
    mockNormalMotion();
    expect(() => render(<StairsScrollScene />)).not.toThrow();
  });

  it('drives cameraOrbit/cameraTarget from the captured baseline through the real ScrollTrigger.onUpdate callback', () => {
    mockNormalMotion();

    let capturedConfig: {
      trigger?: unknown;
      end?: string;
      onUpdate?: (self: { progress: number }) => void;
    } | null = null;
    const createSpy = jest
      .spyOn(ScrollTrigger, 'create')
      // Partial mock of ScrollTrigger's config/instance shapes — the real
      // types require far more than this test needs to assert against.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementation((config: any) => {
        capturedConfig = config;
        return { kill: jest.fn(), progress: 0 } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      });

    const { container } = render(<StairsScrollScene />);
    const el = container.querySelector('model-viewer') as unknown as {
      loaded: boolean;
      getCameraOrbit: () => { theta: number; phi: number; radius: number };
      getCameraTarget: () => { x: number; y: number; z: number };
      cameraOrbit: string;
      cameraTarget: string;
    };

    // theta=10deg, phi=75deg, radius=2.5m expressed in the radians/meters
    // getCameraOrbit()/getCameraTarget() actually return.
    el.getCameraOrbit = () => ({
      theta: (10 * Math.PI) / 180,
      phi: (75 * Math.PI) / 180,
      radius: 2.5,
    });
    el.getCameraTarget = () => ({ x: 0, y: 1.2, z: 0 });

    fireEvent(el as unknown as Element, new Event('load'));

    expect(capturedConfig).not.toBeNull();
    // The trigger spans the whole document (not a local section), so
    // progress matches the entire page's scroll length, not one section's.
    expect(capturedConfig!.trigger).toBe(document.documentElement);
    expect(capturedConfig!.end).toBe('bottom bottom');
    capturedConfig!.onUpdate!({ progress: 0.5 });

    expect(el.cameraOrbit).toBe(`${10 + STAIRS_ROTATION_DEG * 0.5}deg 75deg 2.5m`);
    expect(el.cameraTarget).toBe(`0m ${1.2 - STAIRS_DESCENT_M * 0.5}m 0m`);

    createSpy.mockRestore();
  });

  // This test registers a real custom element under the 'model-viewer' tag
  // name via `customElements.define`, which is irreversible for the life of
  // the test file's jsdom environment — it MUST run last in this file, or
  // every subsequent test's `<model-viewer>` would upgrade to this fake
  // always-loaded class instead of staying a generic, unregistered element.
  it('captures the baseline immediately (without waiting for a load event) when the model is already loaded', () => {
    mockNormalMotion();

    class FakeAlreadyLoadedModelViewer extends HTMLElement {
      get loaded() {
        return true;
      }
      getCameraOrbit() {
        return { theta: (10 * Math.PI) / 180, phi: (75 * Math.PI) / 180, radius: 2.5 };
      }
      getCameraTarget() {
        return { x: 0, y: 1.2, z: 0 };
      }
      cameraOrbit = '';
      cameraTarget = '';
      cameraControls = false;
    }
    if (!customElements.get('model-viewer')) {
      customElements.define('model-viewer', FakeAlreadyLoadedModelViewer);
    }

    let capturedConfig: { onUpdate?: (self: { progress: number }) => void } | null = null;
    const createSpy = jest
      .spyOn(ScrollTrigger, 'create')
      // Partial mock of ScrollTrigger's config/instance shapes — the real
      // types require far more than this test needs to assert against.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementation((config: any) => {
        capturedConfig = config;
        return { kill: jest.fn(), progress: 0 } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      });

    const { container } = render(<StairsScrollScene />);
    const el = container.querySelector('model-viewer') as unknown as {
      cameraOrbit: string;
      cameraTarget: string;
    };

    // No `fireEvent(el, new Event('load'))` — the baseline must already be
    // captured from `el.loaded` being true at the moment the effect ran.
    expect(capturedConfig).not.toBeNull();
    capturedConfig!.onUpdate!({ progress: 0.25 });

    expect(el.cameraOrbit).toBe(`${10 + STAIRS_ROTATION_DEG * 0.25}deg 75deg 2.5m`);
    expect(el.cameraTarget).toBe(`0m ${1.2 - STAIRS_DESCENT_M * 0.25}m 0m`);

    createSpy.mockRestore();
  });
});
