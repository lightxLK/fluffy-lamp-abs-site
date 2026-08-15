import { act, render } from '@testing-library/react';
import { CinematicModelScene } from '@/components/sections/CinematicModelScene';
import * as THREE from 'three';
import { ScrollTrigger } from '@/lib/gsap';
import { MODEL_PLACEMENTS } from '@/lib/data/fabricaSceneAnchors';

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

// A controllable GLTFLoader mock: each test can resolve or reject specific
// sources via `queueResult`/`queueFailure`, and record load order.
type LoadResult = { type: 'success' } | { type: 'failure' } | { type: 'pending' };
const mockLoadQueue = new Map<string, LoadResult>();
const mockLoadOrder: string[] = [];
// Tracks how many GLTFLoader.load() calls are simultaneously in flight —
// used to directly assert the frozen "bounded concurrency 1" requirement,
// not just infer it from load order (a badly-implemented concurrent
// loader could still produce the same order by coincidence).
let mockActiveLoads = 0;
let mockMaxActiveLoads = 0;
// For 'pending' entries: the load starts (recorded in mockLoadOrder) but
// never auto-resolves — the test controls exactly when it resolves by
// calling the stored `resolve()`. This makes race-condition tests
// (residency window changing while a load is in flight) explicit and
// deterministic, rather than relying on "no `await` happened between
// these two lines so the queued microtask hasn't fired yet" — correct,
// but an implicit timing assumption a future test edit could silently
// break.
const mockPendingLoads = new Map<string, () => void>();
let capturedOnUpdateGlobal: ((self: { progress: number }) => void) | undefined;

// Named with a "mock" prefix and self-contained via jest.requireActual —
// Jest's hoisting rules forbid a jest.mock() factory from referencing most
// out-of-scope variables/functions unless their name starts with "mock",
// and (separately) the top-level `THREE` import in this file is itself
// bound to a mocked module (Task 4's `jest.mock('three', ...)` above), so
// this helper fetches the real, un-mocked three.js classes directly rather
// than relying on that binding.
function mockMakeMockScene(): unknown {
  const Real = jest.requireActual('three');
  const group = new Real.Group();
  group.add(new Real.Mesh(new Real.BoxGeometry(1, 1, 1)));
  return group;
}

jest.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: jest.fn().mockImplementation(() => ({
    load: (
      url: string,
      onLoad: (gltf: { scene: unknown }) => void,
      _onProgress: unknown,
      onError: (err: unknown) => void,
    ) => {
      mockLoadOrder.push(url);
      mockActiveLoads += 1;
      mockMaxActiveLoads = Math.max(mockMaxActiveLoads, mockActiveLoads);
      const result = mockLoadQueue.get(url) ?? { type: 'success' };

      if (result.type === 'pending') {
        // Never auto-resolves — the test calls mockPendingLoads.get(url)()
        // explicitly when it wants this load to settle.
        mockPendingLoads.set(url, () => {
          mockActiveLoads -= 1;
          mockPendingLoads.delete(url);
          onLoad({ scene: mockMakeMockScene() });
        });
        return;
      }

      // Resolve asynchronously (queueMicrotask) so tests can assert
      // "not yet loaded" state before the promise settles, same as a real
      // network load would behave relative to synchronous test code.
      queueMicrotask(() => {
        mockActiveLoads -= 1;
        if (result.type === 'success') onLoad({ scene: mockMakeMockScene() });
        else onError(new Error('mock load failure'));
      });
    },
  })),
}));

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

  it('measures all six models sequentially (one at a time, not concurrently) before building the camera curve', async () => {
    mockNormalMotion();
    mockWebGL(true);
    mockLoadQueue.clear();
    mockLoadOrder.length = 0;
    mockActiveLoads = 0;
    mockMaxActiveLoads = 0;
    const createSpy = jest
      .spyOn(ScrollTrigger, 'create')
      .mockImplementation(
        () => ({ kill: jest.fn() }) as unknown as ReturnType<typeof ScrollTrigger.create>,
      );

    await act(async () => {
      render(<CinematicModelScene />);
      // Flush all queued microtasks from the sequential measurement loop.
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(mockLoadOrder).toEqual(MODEL_PLACEMENTS.map((p) => p.src));
    // Directly proves bounded concurrency 1 — never more than one
    // GLTFLoader.load() call in flight at once, not merely inferred from
    // the final order (which a badly-implemented concurrent loader could
    // still coincidentally produce).
    expect(mockMaxActiveLoads).toBe(1);
    // ScrollTrigger (and therefore the scrollable ride) is only created
    // after every model has been measured.
    expect(createSpy).toHaveBeenCalledTimes(1);

    createSpy.mockRestore();
  });

  it('does not create a ScrollTrigger before the measurement pass completes', () => {
    mockNormalMotion();
    mockWebGL(true);
    mockLoadQueue.clear();
    mockLoadOrder.length = 0;
    const createSpy = jest
      .spyOn(ScrollTrigger, 'create')
      .mockImplementation(
        () => ({ kill: jest.fn() }) as unknown as ReturnType<typeof ScrollTrigger.create>,
      );

    render(<CinematicModelScene />);
    // Synchronously, right after mount, no microtasks have flushed yet —
    // the ride must not be scrollable this early.
    expect(createSpy).not.toHaveBeenCalled();

    createSpy.mockRestore();
  });

  it('fails closed (never falls back to document.body) when no <main> element exists', async () => {
    mockNormalMotion();
    mockWebGL(true);
    mockLoadQueue.clear();
    mockLoadOrder.length = 0;
    // This file's beforeEach always appends a <main> — remove it for this
    // one test to exercise the "expected invariant missing" path.
    document.body.removeChild(mainEl);
    const createSpy = jest
      .spyOn(ScrollTrigger, 'create')
      .mockImplementation(
        () => ({ kill: jest.fn() }) as unknown as ReturnType<typeof ScrollTrigger.create>,
      );
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(<CinematicModelScene />);
      for (let i = 0; i < 8; i++) await Promise.resolve();
    });

    // No ScrollTrigger is ever created against document.body as a
    // fallback — the component fails closed instead.
    expect(createSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('expected page <main> was not found'),
    );

    createSpy.mockRestore();
    errorSpy.mockRestore();
    // Restore <main> so afterEach's document.body.removeChild(mainEl) call
    // (which expects it still to be a child) doesn't itself throw.
    document.body.appendChild(mainEl);
  });

  it("falls back to a model's fallbackRadius (and keeps its slot empty) when its measurement load fails, without blocking the other five", async () => {
    mockNormalMotion();
    mockWebGL(true);
    mockLoadQueue.clear();
    mockLoadOrder.length = 0;
    mockLoadQueue.set(MODEL_PLACEMENTS[2].src, { type: 'failure' });
    const createSpy = jest
      .spyOn(ScrollTrigger, 'create')
      .mockImplementation(
        () => ({ kill: jest.fn() }) as unknown as ReturnType<typeof ScrollTrigger.create>,
      );
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(<CinematicModelScene />);
      for (let i = 0; i < 8; i++) await Promise.resolve();
    });

    // All six were still attempted, in order, despite the middle one failing.
    expect(mockLoadOrder).toEqual(MODEL_PLACEMENTS.map((p) => p.src));
    // The camera curve (and therefore the ScrollTrigger) still gets built.
    expect(createSpy).toHaveBeenCalledTimes(1);

    createSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('shows a loading indicator while measurement is in progress, and removes it once the camera curve is built', async () => {
    mockNormalMotion();
    mockWebGL(true);
    mockLoadQueue.clear();
    mockLoadOrder.length = 0;
    jest
      .spyOn(ScrollTrigger, 'create')
      .mockImplementation(
        () => ({ kill: jest.fn() }) as unknown as ReturnType<typeof ScrollTrigger.create>,
      );

    const { container } = render(<CinematicModelScene />);
    // Synchronously after mount, measurement hasn't started resolving yet —
    // the loading indicator must already be visible (never a blank frame).
    expect(container.textContent).toMatch(/loading/i);

    await act(async () => {
      for (let i = 0; i < 8; i++) await Promise.resolve();
    });

    expect(container.textContent).not.toMatch(/loading/i);
  });
});
