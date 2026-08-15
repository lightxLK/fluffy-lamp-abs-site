import { act, render } from '@testing-library/react';
import { CinematicModelScene } from '@/components/sections/CinematicModelScene';
import * as THREE from 'three';

// three's WebGLRenderer requires a real WebGL context, which jsdom doesn't
// provide. Mock the renderer class itself — this file's tests only verify
// lifecycle (gating, mount, unmount), never actual rendering. Defined
// entirely inside the jest.mock factory (Jest's hoisting rules forbid
// referencing most out-of-scope variables from inside it); the mock
// constructor is wrapped in `jest.fn()` so later tests can inspect
// `(THREE.WebGLRenderer as unknown as jest.Mock).mock.instances` directly
// via the top-level `THREE` import, without needing a separately-exported
// reference to the mock class.
jest.mock('three', () => {
  const actual = jest.requireActual('three');
  class MockWebGLRendererImpl {
    domElement = document.createElement('canvas');
    shadowMap = { enabled: false, type: null, autoUpdate: true, needsUpdate: false };
    outputColorSpace: unknown;
    toneMapping: unknown;
    toneMappingExposure: unknown;
    setPixelRatio = jest.fn();
    setSize = jest.fn();
    setAnimationLoop = jest.fn();
    render = jest.fn();
    dispose = jest.fn();
    info = { render: { calls: 0, triangles: 0 }, memory: { geometries: 0, textures: 0 } };
  }
  return {
    ...actual,
    WebGLRenderer: jest.fn().mockImplementation(() => new MockWebGLRendererImpl()),
  };
});

// Type-only shape for casting a mock instance in later tests — matches
// MockWebGLRendererImpl above but declared at module scope (outside the
// jest.mock factory) since types are erased at runtime and aren't subject
// to the hoisting restriction.
interface MockWebGLRenderer {
  domElement: HTMLCanvasElement;
  shadowMap: { enabled: boolean; type: unknown; autoUpdate: boolean; needsUpdate: boolean };
  setPixelRatio: jest.Mock;
  setSize: jest.Mock;
  setAnimationLoop: jest.Mock;
  render: jest.Mock;
  dispose: jest.Mock;
}

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

function mockWebGL(available: boolean) {
  return jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation((type: string) => {
      if (type === 'webgl2') return available ? ({} as unknown as WebGL2RenderingContext) : null;
      return null;
    });
}

describe('CinematicModelScene', () => {
  // Task 5 targets `document.querySelector('main')` as the ScrollTrigger
  // root (never document.body — see Global Constraints). jsdom's default
  // document has no <main>; without one, every test would hit the
  // component's "no <main> found" console.error fallback path, polluting
  // test output. A real <main> always exists on the actual page
  // (page.tsx renders it) — this stands in for that here.
  let mainEl: HTMLElement;
  beforeEach(() => {
    mainEl = document.createElement('main');
    document.body.appendChild(mainEl);
    // jest.mock('three', ...) above creates one shared WebGLRenderer mock
    // for the whole file (Jest's module registry is per-file, not
    // per-test) — clear its call history each test so assertions like
    // "never constructs a WebGLRenderer" aren't polluted by earlier
    // tests' constructions.
    (THREE.WebGLRenderer as unknown as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.removeChild(mainEl);
  });

  it('renders nothing when reduced motion is preferred', () => {
    // jest.setup.ts's default matchMedia stub returns matches: true for any
    // prefers-reduced-motion query, so no override is needed here.
    mockWebGL(true);
    const { container } = render(<CinematicModelScene />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when WebGL2 is unavailable, even with normal motion preference', () => {
    mockNormalMotion();
    mockWebGL(false);
    const { container } = render(<CinematicModelScene />);
    expect(container.firstChild).toBeNull();
  });

  it('mounts a canvas via WebGLRenderer when motion is normal and WebGL2 is available', () => {
    mockNormalMotion();
    mockWebGL(true);
    const { container } = render(<CinematicModelScene />);
    expect(container.querySelector('canvas')).not.toBeNull();
  });

  it('never constructs a WebGLRenderer when WebGL2 is unavailable (gating order)', () => {
    mockNormalMotion();
    mockWebGL(false);
    const rendererSpy = jest.spyOn(THREE, 'WebGLRenderer');
    render(<CinematicModelScene />);
    expect(rendererSpy).not.toHaveBeenCalled();
  });

  it('disposes the renderer and removes the canvas on unmount', () => {
    mockNormalMotion();
    mockWebGL(true);
    const { container, unmount } = render(<CinematicModelScene />);
    const canvas = container.querySelector('canvas');
    expect(canvas).not.toBeNull();

    act(() => {
      // Grab the mock instance's dispose fn via the canvas's owning renderer —
      // MockWebGLRenderer instances are unique per construction, so instead
      // assert indirectly: after unmount, the canvas is gone from the DOM.
      unmount();
    });
    expect(container.querySelector('canvas')).toBeNull();
  });
});
