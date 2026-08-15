import { act, render, fireEvent } from '@testing-library/react';
import { ModelSceneController } from '@/components/sections/ModelSceneController';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';
import { gsap } from '@/lib/gsap';

jest.mock('@google/model-viewer', () => ({}));

// jsdom has no IntersectionObserver. This mock records every instance so a
// test can grab the most recently constructed one and fire its callback
// manually with fake entries, the same way the existing StairsScrollScene
// tests spy on ScrollTrigger.create to invoke its captured onUpdate.
class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  callback: IntersectionObserverCallback;
  observedElements: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observedElements.push(el);
  }
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = () => [];
}

function fireIntersection(
  sectionEl: Element,
  isIntersecting: boolean,
  boundingRectCenterY: number,
) {
  const io = MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];
  const entry = {
    target: sectionEl,
    isIntersecting,
    boundingClientRect: {
      top: boundingRectCenterY - 1,
      bottom: boundingRectCenterY + 1,
    } as DOMRectReadOnly,
  } as unknown as IntersectionObserverEntry;
  io.callback([entry], io);
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

describe('ModelSceneController', () => {
  let originalIO: typeof IntersectionObserver;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    originalIO = global.IntersectionObserver;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.IntersectionObserver = MockIntersectionObserver as any;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIO;
    jest.restoreAllMocks();
  });

  it('renders nothing when reduced motion is preferred', () => {
    // jest.setup.ts's default matchMedia stub returns matches: true for any
    // prefers-reduced-motion query, so no override is needed here.
    const { container } = render(<ModelSceneController />);
    expect(container.querySelector('model-viewer')).toBeNull();
  });

  it('mounts no model before any mapped section becomes active', () => {
    mockNormalMotion();
    const { container } = render(<ModelSceneController />);
    expect(container.querySelector('model-viewer')).toBeNull();
    expect(MockIntersectionObserver.instances.length).toBe(1);
  });

  it('mounts and crossfades in the model for a single-model section once it becomes active and loads', () => {
    mockNormalMotion();
    const { container } = render(<ModelSceneController />);
    const section = document.createElement('section');
    section.id = 'cabana-gazebo';

    act(() => {
      fireIntersection(section, true, 400);
    });

    const incoming = container.querySelector('model-viewer');
    expect(incoming).not.toBeNull();
    expect(incoming).toHaveAttribute('src', MODEL_ASSETS.gazebo.src);

    // ModelViewer's own wrapper div carries `bg-border-subtle/40` by
    // default (a card-sized loading placeholder tint) — wrong for a
    // full-viewport layer, where it would wash out the whole page rather
    // than just a loading box. The controller must override it.
    expect(incoming?.parentElement).toHaveClass('bg-transparent');
    expect(incoming?.parentElement).not.toHaveClass('bg-border-subtle/40');
  });

  it('cancels the previous camera-ease tween when a newer model request supersedes an in-flight transition', () => {
    jest.useFakeTimers();
    mockNormalMotion();

    const fakeTween = { kill: jest.fn() } as unknown as ReturnType<typeof gsap.to>;
    const gsapToSpy = jest.spyOn(gsap, 'to').mockReturnValue(fakeTween);

    const { container } = render(<ModelSceneController />);
    const gazeboSection = document.createElement('section');
    gazeboSection.id = 'cabana-gazebo';
    const craftedSection = document.createElement('section');
    craftedSection.id = 'crafted-in-detail';
    const gateSection = document.createElement('section');
    gateSection.id = 'gate-systems';
    document.body.appendChild(gazeboSection);
    document.body.appendChild(craftedSection);
    document.body.appendChild(gateSection);

    // gazebo becomes current (with a captured baseline, needed below for
    // the ease-to-baseline tween to actually be created).
    act(() => {
      fireIntersection(gazeboSection, true, 400);
    });
    const gazeboEl = container.querySelector(
      `model-viewer[src="${MODEL_ASSETS.gazebo.src}"]`,
    ) as unknown as {
      getCameraOrbit: () => { theta: number; phi: number; radius: number };
      getCameraTarget: () => { x: number; y: number; z: number };
    };
    gazeboEl.getCameraOrbit = () => ({ theta: 0, phi: (75 * Math.PI) / 180, radius: 2.5 });
    gazeboEl.getCameraTarget = () => ({ x: 0, y: 1.2, z: 0 });
    act(() => {
      fireEvent(gazeboEl as unknown as Element, new Event('load'));
      jest.advanceTimersByTime(700);
    });

    // Requesting round-stairs triggers gazebo's ease-to-baseline tween —
    // gsap.to is mocked above to return fakeTween instead of a real one.
    act(() => {
      fireIntersection(craftedSection, true, 400);
    });
    const roundStairsEl = container.querySelector(
      `model-viewer[src="${MODEL_ASSETS.roundStairs.src}"]`,
    ) as unknown as {
      getCameraOrbit: () => { theta: number; phi: number; radius: number };
      getCameraTarget: () => { x: number; y: number; z: number };
    };
    roundStairsEl.getCameraOrbit = () => ({ theta: 0, phi: (75 * Math.PI) / 180, radius: 2.5 });
    roundStairsEl.getCameraTarget = () => ({ x: 0, y: 1.2, z: 0 });
    act(() => {
      fireEvent(roundStairsEl as unknown as Element, new Event('load'));
    });

    expect(gsapToSpy).toHaveBeenCalled();
    expect(fakeTween.kill).not.toHaveBeenCalled();

    // A third, different target supersedes the transition before the
    // (mocked-out, never-completing) tween would ever finish on its own.
    act(() => {
      fireIntersection(gateSection, true, 400);
    });

    expect(fakeTween.kill).toHaveBeenCalled();

    gsapToSpy.mockRestore();
    jest.useRealTimers();
    document.body.removeChild(gazeboSection);
    document.body.removeChild(craftedSection);
    document.body.removeChild(gateSection);
  });

  it('ignores IntersectionObserver entries that are not actually intersecting, even when geometrically closer to center', () => {
    mockNormalMotion();
    const { container } = render(<ModelSceneController />);
    const gazeboSection = document.createElement('section');
    gazeboSection.id = 'cabana-gazebo';
    const craftedSection = document.createElement('section');
    craftedSection.id = 'crafted-in-detail';

    const io = MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];

    act(() => {
      // jsdom's default window.innerHeight is 768, so viewport center is
      // 384. gazebo's rect center (400) is geometrically closer to that
      // than crafted's (351) — but gazebo reports isIntersecting: false,
      // so it must be excluded regardless of distance. Without the
      // isIntersecting filter this test picks gazebo and fails.
      io.callback(
        [
          {
            target: gazeboSection,
            isIntersecting: false,
            boundingClientRect: { top: 399, bottom: 401 } as DOMRectReadOnly,
          },
          {
            target: craftedSection,
            isIntersecting: true,
            boundingClientRect: { top: 350, bottom: 352 } as DOMRectReadOnly,
          },
        ] as unknown as IntersectionObserverEntry[],
        io,
      );
    });

    expect(container.querySelector('model-viewer')).toHaveAttribute(
      'src',
      MODEL_ASSETS.roundStairs.src,
    );
  });

  it('ignores a stale crossfade completion when a newer transition supersedes it mid-fade', () => {
    jest.useFakeTimers();
    mockNormalMotion();
    const { container } = render(<ModelSceneController />);
    const gazeboSection = document.createElement('section');
    gazeboSection.id = 'cabana-gazebo';
    const craftedSection = document.createElement('section');
    craftedSection.id = 'crafted-in-detail';

    act(() => {
      fireIntersection(gazeboSection, true, 400);
    });
    const gazeboEl = container.querySelector(
      `model-viewer[src="${MODEL_ASSETS.gazebo.src}"]`,
    ) as unknown as Element;

    // gazebo loads and starts its crossfade — this schedules a 600ms
    // setTimeout(finish, 600) that is NOT tied to React's lifecycle, so it
    // keeps running even after gazebo's <ModelViewer> unmounts below.
    act(() => {
      fireEvent(gazeboEl, new Event('load'));
    });

    // Before that timer fires, a newer target supersedes gazebo. React
    // unmounts gazebo's incoming instance (key changed) and mounts
    // round-stairs as the new incoming model.
    act(() => {
      fireIntersection(craftedSection, true, 400);
    });

    // Advance past gazebo's now-stale crossfade completion. Its finish()
    // must recognize transitionId has moved on and do nothing.
    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(container.querySelector(`model-viewer[src="${MODEL_ASSETS.gazebo.src}"]`)).toBeNull();

    // round-stairs completes its own (unrelated, current) transition
    // normally.
    const roundStairsEl = container.querySelector(
      `model-viewer[src="${MODEL_ASSETS.roundStairs.src}"]`,
    ) as unknown as Element;
    expect(roundStairsEl).not.toBeNull();
    act(() => {
      fireEvent(roundStairsEl, new Event('load'));
      jest.advanceTimersByTime(700);
    });

    expect(container.querySelectorAll('model-viewer').length).toBe(1);
    expect(container.querySelector('model-viewer')).toHaveAttribute(
      'src',
      MODEL_ASSETS.roundStairs.src,
    );

    jest.useRealTimers();
  });

  it('cancels the in-flight fade timer and camera tween on unmount, instead of letting them fire into a gone component', () => {
    jest.useFakeTimers();
    mockNormalMotion();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container, unmount } = render(<ModelSceneController />);
    const gazeboSection = document.createElement('section');
    gazeboSection.id = 'cabana-gazebo';

    act(() => {
      fireIntersection(gazeboSection, true, 400);
    });
    const gazeboEl = container.querySelector(
      `model-viewer[src="${MODEL_ASSETS.gazebo.src}"]`,
    ) as unknown as Element;

    // Fire load (schedules the fade timer) but unmount before it fires —
    // without unmount cleanup, the pending window.setTimeout(finish, 600)
    // would still call setCurrentModel/setIncomingModel on a component
    // React has already torn down.
    act(() => {
      fireEvent(gazeboEl, new Event('load'));
    });
    unmount();
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // React logs "Can't perform a state update on an unmounted component"
    // via console.error if the stale timer's setState calls still ran.
    const unmountedComponentWarning = errorSpy.mock.calls.some((args) =>
      String(args[0]).includes('unmounted component'),
    );
    expect(unmountedComponentWarning).toBe(false);

    errorSpy.mockRestore();
    jest.useRealTimers();
  });
});
