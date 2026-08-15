'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ModelViewerElement } from '@google/model-viewer';
import { ScrollTrigger, gsap } from '@/lib/gsap';
import { ModelViewer } from '@/components/ui/ModelViewer';
import { MODEL_ASSETS, type ModelAsset } from '@/lib/data/fabricaModels';
import type { CameraOrbitBaseline, CameraTargetBaseline } from '@/lib/three/stairsCamera';
import {
  computeStairsCameraOrbit,
  computeStairsCameraTarget,
  radToDeg,
} from '@/lib/three/stairsCamera';

interface ModelScene {
  sectionId: string;
  models: readonly ModelAsset[];
}

export const MODEL_SCENES: readonly ModelScene[] = [
  { sectionId: 'gate-systems', models: [MODEL_ASSETS.gate, MODEL_ASSETS.gateV2] },
  { sectionId: 'cabana-gazebo', models: [MODEL_ASSETS.gazebo] },
  { sectionId: 'interior-landscaping', models: [MODEL_ASSETS.stairs, MODEL_ASSETS.streetLamp] },
  { sectionId: 'crafted-in-detail', models: [MODEL_ASSETS.roundStairs] },
];

interface CameraBaseline {
  orbit: CameraOrbitBaseline;
  target: CameraTargetBaseline;
}

// Sections whose camera is owned by scroll progress rather than idle
// auto-rotate. Exactly the MODEL_SCENES entries with more than one model —
// a single-model section has nothing to choreograph between, so it stays
// on idle drift even while active.
const SCROLL_DRIVEN_SECTION_IDS = new Set(
  MODEL_SCENES.filter((scene) => scene.models.length > 1).map((scene) => scene.sectionId),
);

// Applies scroll-progress choreography to whichever element is passed in,
// using that element's own captured baseline as the starting point.
function applyChoreography(
  el: ModelViewerElement,
  src: string,
  localProgress: number,
  baselines: Map<string, CameraBaseline>,
) {
  const baseline = baselines.get(src);
  if (!baseline) return;
  el.cameraOrbit = computeStairsCameraOrbit(baseline.orbit, localProgress);
  el.cameraTarget = computeStairsCameraTarget(baseline.target, localProgress);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Eases an already-loaded model's camera to a target baseline over
 * `duration` seconds. Returns the GSAP tween so the caller can `kill()` it
 * on unmount — this function has no lifecycle awareness of its own.
 */
function easeCameraTo(
  el: ModelViewerElement,
  from: CameraBaseline,
  to: CameraBaseline,
  duration: number,
  onComplete: () => void,
): gsap.core.Tween {
  const proxy = { t: 0 };
  return gsap.to(proxy, {
    t: 1,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      const t = proxy.t;
      el.cameraOrbit = `${lerp(from.orbit.thetaDeg, to.orbit.thetaDeg, t)}deg ${lerp(from.orbit.phiDeg, to.orbit.phiDeg, t)}deg ${lerp(from.orbit.radiusM, to.orbit.radiusM, t)}m`;
      el.cameraTarget = `${lerp(from.target.xM, to.target.xM, t)}m ${lerp(from.target.yM, to.target.yM, t)}m ${lerp(from.target.zM, to.target.zM, t)}m`;
    },
    onComplete,
  });
}

function captureBaseline(el: ModelViewerElement): CameraBaseline {
  const orbit = el.getCameraOrbit();
  const target = el.getCameraTarget();
  return {
    orbit: {
      thetaDeg: Math.round(radToDeg(orbit.theta) * 1e6) / 1e6,
      phiDeg: Math.round(radToDeg(orbit.phi) * 1e6) / 1e6,
      radiusM: orbit.radius,
    },
    target: { xM: target.x, yM: target.y, zM: target.z },
  };
}

// `getCameraOrbit`/`getCameraTarget` are only defined once the real
// @google/model-viewer custom element implementation has registered
// itself (it's imported dynamically at runtime — see ModelViewer.tsx —
// and is entirely mocked out to `{}` in this component's own test suite,
// where `<model-viewer>` is just a generic unknown element with no such
// methods). Guard against their absence rather than throwing: on a
// genuinely loaded model in production these are always present by the
// time `load` fires, so this only ever short-circuits in that
// test-double scenario, skipping baseline capture (the caller's existing
// "no baseline" fallback path — a hard cut via `startFade()` with no
// camera easing — already handles that gracefully).
function tryCaptureBaseline(el: ModelViewerElement): CameraBaseline | null {
  if (typeof el.getCameraOrbit !== 'function' || typeof el.getCameraTarget !== 'function') {
    return null;
  }
  return captureBaseline(el);
}

export function ModelSceneController() {
  const [enabled, setEnabled] = useState(false);
  const [cameraControls, setCameraControls] = useState(false);
  const [currentModel, setCurrentModel] = useState<ModelAsset | null>(null);
  const [incomingModel, setIncomingModel] = useState<ModelAsset | null>(null);
  // Mirrors of currentElRef/incomingElRef held in state, not just refs, so
  // effects can depend on "which DOM element is mounted right now" and run
  // exactly once per element rather than on every unrelated render (see the
  // note after this block for why the ref callbacks below are trivial).
  const [currentEl, setCurrentEl] = useState<ModelViewerElement | null>(null);
  const [incomingEl, setIncomingEl] = useState<ModelViewerElement | null>(null);

  const currentModelRef = useRef<ModelAsset | null>(null);
  const incomingModelRef = useRef<ModelAsset | null>(null);
  const transitionIdRef = useRef(0);
  const currentElRef = useRef<ModelViewerElement | null>(null);
  const incomingElRef = useRef<ModelViewerElement | null>(null);
  const baselinesRef = useRef<Map<string, CameraBaseline>>(new Map());
  const activeSectionIdRef = useRef<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  // Set true on a manual-drag camera-change event, cleared 1s after the
  // last such event fires idle (see handleCameraChange/idleTimerRef below).
  // Read by the ScrollTrigger onUpdate handler to suppress scroll-driven
  // camera writes while the user is mid-drag.
  const userInteractionActiveRef = useRef(false);
  // Keyed by sectionId; guards trigger creation below against re-creating a
  // trigger that already exists (see that effect's comment for why creation
  // can be attempted more than once).
  const scrollTriggersRef = useRef<Map<string, ReturnType<typeof ScrollTrigger.create>>>(new Map());
  // Exposed for Task 5 (multi-model ScrollTrigger progress) to call directly.
  const requestModelRef = useRef<(next: ModelAsset) => void>(() => {});
  // Handles to the in-flight fade timer / camera-ease tween, if any —
  // `transitionId` protects against a *stale* completion acting on the
  // wrong model, but doesn't itself stop the timer/tween from running.
  // These let unmount actually cancel that outstanding async work instead
  // of leaving it to fire into a component that's gone.
  // Typed as `number | null` (not `ReturnType<typeof window.setTimeout>`)
  // because this project's tsconfig pulls in both "dom" lib and @types/node
  // — under that combination TS resolves `ReturnType<typeof window.setTimeout>`
  // to `NodeJS.Timeout`, which doesn't match what `window.setTimeout(...)`
  // (explicitly the DOM overload, correct for this browser-only code path)
  // actually returns at the call site: a `number`.
  const fadeTimerRef = useRef<number | null>(null);
  const cameraTweenRef = useRef<gsap.core.Tween | null>(null);
  // See fadeTimerRef's comment above for why this is `number | null` rather
  // than `ReturnType<typeof window.setTimeout>`: this project's tsconfig
  // pulls in both "dom" lib and @types/node, so that type resolves to
  // `NodeJS.Timeout`, which doesn't match what `window.setTimeout(...)`
  // (the DOM overload, correct here) actually returns — a `number`.
  const idleTimerRef = useRef<number | null>(null);

  const handleCameraChange = useCallback((event: Event) => {
    const detail = (event as CustomEvent<{ source?: string }>).detail;
    if (detail?.source !== 'user-interaction') return;
    userInteractionActiveRef.current = true;
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      userInteractionActiveRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection needs window.matchMedia, unavailable during SSR
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setCameraControls(window.matchMedia('(pointer: fine)').matches);
  }, []);

  // Unmount-only cleanup (empty deps — this must NOT re-run on every
  // render, only when the component actually goes away). Bumping
  // transitionId makes any subsequent stray `onLoaded`/`finish` call
  // recognize itself as stale even if something below fails to cancel;
  // the explicit clearTimeout/kill() stop the work from running at all.
  useEffect(() => {
    return () => {
      transitionIdRef.current += 1;
      if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
      cameraTweenRef.current?.kill();
    };
  }, []);

  // Stable identity across every render (useCallback with no deps) — React
  // only invokes a ref callback when its *identity* changes, so an inline
  // (non-memoized) ref function gets called with `null` then the same
  // element again on every unrelated re-render. These two callbacks do
  // nothing but record the element; all per-element logic (listeners,
  // baseline capture) lives in effects below keyed on the resulting state,
  // so it runs exactly once per actual element mount/unmount.
  const onCurrentRef = useCallback((el: ModelViewerElement | null) => {
    currentElRef.current = el;
    setCurrentEl(el);
  }, []);
  const onIncomingRef = useCallback((el: ModelViewerElement | null) => {
    incomingElRef.current = el;
    setIncomingEl(el);
  }, []);

  // Attaches/detaches the camera-change listener as the current/incoming
  // element identity actually changes. An effect keyed on this state (rather
  // than an inline addEventListener inside the stable ref callbacks above)
  // gives an explicit, guaranteed cleanup function — the ref callbacks are
  // deliberately stable so React doesn't re-invoke them on unrelated
  // renders, which means they'd have no reliable point to remove a listener
  // added inline.
  useEffect(() => {
    if (!currentEl) return;
    currentEl.addEventListener('camera-change', handleCameraChange);
    return () => currentEl.removeEventListener('camera-change', handleCameraChange);
  }, [currentEl, handleCameraChange]);

  useEffect(() => {
    if (!incomingEl) return;
    incomingEl.addEventListener('camera-change', handleCameraChange);
    return () => incomingEl.removeEventListener('camera-change', handleCameraChange);
  }, [incomingEl, handleCameraChange]);

  // Kills whatever fade timer/camera tween is currently in flight, if any.
  // `transitionId` alone only stops a *stale completion* from committing
  // (its onComplete/finish checks the id) — it does nothing to stop an
  // still-running tween's onUpdate from continuing to write cameraOrbit/
  // cameraTarget every frame, or the timer from eventually firing at all.
  // Called both here (a newer request supersedes an in-flight transition)
  // and in the unmount effect below (the two are separate concerns: this
  // one runs on every supersession while the component is still alive,
  // the unmount one is the final catch-all for when it isn't).
  const cancelInFlightTransitionWork = useCallback(() => {
    cameraTweenRef.current?.kill();
    cameraTweenRef.current = null;
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    // `startFade` zeroes the *current* model's opacity and relies on
    // `finish()` (600ms later) to promote the incoming model into its
    // place. Cancelling that timer means `finish()` never runs, so without
    // this the outgoing model stays mounted at opacity 0 forever and the
    // whole layer goes blank (React won't reset it — its style prop value
    // never changed). Restoring visibility here is also correct when a
    // *third* target supersedes a mid-fade transition: that new
    // transition's own `startFade` re-zeroes this element when it actually
    // begins fading, so the current model simply stays visible until then.
    if (currentElRef.current) currentElRef.current.style.opacity = '1';
  }, []);

  const requestModel = useCallback(
    (next: ModelAsset) => {
      if (incomingModelRef.current?.src === next.src) return;

      if (currentModelRef.current?.src === next.src) {
        // The target is already current — but if there's a *different*
        // model mid-transition (e.g. scroll crossed the 0.5 midpoint to
        // request models[1], then reversed back below it before models[1]
        // finished loading), that pending transition must be cancelled
        // here. Otherwise its eventual `load` event still sees a
        // transitionId it recognizes as authoritative and crossfades in a
        // model the visitor scrolled back away from.
        if (incomingModelRef.current) {
          cancelInFlightTransitionWork();
          transitionIdRef.current += 1;
          incomingModelRef.current = null;
          setIncomingModel(null);
        }
        return;
      }

      // Starting a genuinely new transition. If a previous one was already
      // mid-fade (its ease-to-baseline tween running, or its 600ms fade
      // timer scheduled), that work is now stale — cancel it rather than
      // letting it keep mutating a camera that's about to belong to a
      // different model, or fire its completion later against a
      // transitionId that's about to change anyway.
      cancelInFlightTransitionWork();

      transitionIdRef.current += 1;
      incomingModelRef.current = next;
      setIncomingModel(next);
    },
    [cancelInFlightTransitionWork],
  );
  // "Latest ref" pattern: keeps requestModelRef.current pointing at the
  // newest `requestModel` closure so the IntersectionObserver callback
  // (and Task 5's ScrollTrigger onUpdate) can call a stable ref without
  // needing to appear in that effect's dependency array. Writing a ref
  // during render is intentional and doesn't affect what's rendered this
  // pass — it's read only from effects/callbacks, never render output.
  // eslint-disable-next-line react-hooks/refs -- latest-ref pattern, read only from effects/callbacks, not render output
  requestModelRef.current = requestModel;

  const runCrossfade = useCallback((myTransition: number) => {
    const incomingElNow = incomingElRef.current;
    const incoming = incomingModelRef.current;
    if (!incomingElNow || !incoming) return;

    const finish = () => {
      if (transitionIdRef.current !== myTransition) return;
      // This transition completed normally — its timer already fired
      // (that's how we got here) and its ease-to-baseline tween (if any)
      // already finished, so both handles are stale references at this
      // point regardless. Clear them so a *later* transition's
      // cancelInFlightTransitionWork() doesn't try to kill/clear
      // something that already ran to completion.
      fadeTimerRef.current = null;
      cameraTweenRef.current = null;
      currentModelRef.current = incoming;
      incomingModelRef.current = null;
      currentElRef.current = incomingElNow;
      incomingElRef.current = null;
      setCurrentModel(incoming);
      setIncomingModel(null);
    };

    const startFade = () => {
      if (transitionIdRef.current !== myTransition) {
        // A newer request superseded this one while we were waiting for
        // the load event — discard without crossfading in. (React has
        // already unmounted this element via the key change that
        // accompanied the newer setIncomingModel call; this just stops
        // the in-flight fade sequence from acting on stale refs.)
        incomingModelRef.current = null;
        incomingElRef.current = null;
        setIncomingModel(null);
        return;
      }
      incomingElNow.style.opacity = '1';
      const currentElNow = currentElRef.current;
      if (currentElNow) currentElNow.style.opacity = '0';
      fadeTimerRef.current = window.setTimeout(finish, 600);
    };

    const currentElNow = currentElRef.current;
    const currentSrc = currentModelRef.current?.src;
    const currentBaseline = currentSrc ? baselinesRef.current.get(currentSrc) : null;
    const incomingBaseline = baselinesRef.current.get(incoming.src);

    if (currentElNow && currentBaseline && incomingBaseline) {
      // Read the model's *live* camera (which may have drifted from
      // auto-rotate) as the "from" state, ease to baseline, then fade.
      const live = captureBaseline(currentElNow);
      cameraTweenRef.current = easeCameraTo(currentElNow, live, currentBaseline, 0.4, startFade);
    } else {
      startFade();
    }
  }, []);

  // Baseline capture + crossfade kickoff for the incoming model. Keyed on
  // [incomingEl, incomingModel] so this runs exactly when either actually
  // changes — not the every-render churn an inline ref-callback listener
  // would cause. `myTransition` is captured fresh each time this effect
  // runs, always matching the transitionId that was current when this
  // particular (incomingEl, incomingModel) pair was set.
  useEffect(() => {
    const el = incomingEl;
    if (!el || !incomingModel) return;
    const myTransition = transitionIdRef.current;

    const onLoaded = () => {
      if (transitionIdRef.current !== myTransition) {
        incomingModelRef.current = null;
        incomingElRef.current = null;
        setIncomingModel(null);
        return;
      }
      const baseline = tryCaptureBaseline(el);
      if (baseline) baselinesRef.current.set(incomingModel.src, baseline);
      runCrossfade(myTransition);
    };

    if (el.loaded) {
      onLoaded();
      return;
    }
    el.addEventListener('load', onLoaded);
    return () => el.removeEventListener('load', onLoaded);
  }, [incomingEl, incomingModel, runCrossfade]);

  // Baseline capture for the current model — covers the very first model
  // shown on the page, which is set directly as `currentModel` and never
  // passes through the incoming/crossfade path above.
  useEffect(() => {
    const el = currentEl;
    if (!el || !currentModel || baselinesRef.current.has(currentModel.src)) return;

    const capture = () => {
      const baseline = tryCaptureBaseline(el);
      if (baseline) baselinesRef.current.set(currentModel.src, baseline);
    };
    if (el.loaded) {
      capture();
      return;
    }
    el.addEventListener('load', capture);
    return () => el.removeEventListener('load', capture);
  }, [currentEl, currentModel]);

  useEffect(() => {
    if (!enabled) return;

    const sectionEls = MODEL_SCENES.map((scene) => ({
      scene,
      el: document.getElementById(scene.sectionId),
    })).filter((entry): entry is { scene: ModelScene; el: HTMLElement } => entry.el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const viewportCenter = window.innerHeight / 2;
        let closest: { scene: ModelScene; distance: number } | null = null;

        for (const entry of entries) {
          // IntersectionObserver reports entries both when an element
          // starts AND stops intersecting the root — an element leaving
          // the center band still produces a callback entry. Skip those;
          // only a currently-intersecting section is a valid "closest"
          // candidate, regardless of how close its (now stale) rect is.
          if (!entry.isIntersecting) continue;
          // Matched by id rather than by object identity against the
          // document.getElementById-derived `sectionEls` snapshot above:
          // element ids are unique, so a real observed element's id
          // uniquely identifies its scene, and this doesn't depend on the
          // entry's target being the exact same reference captured when
          // this effect set up `sectionEls` (irrelevant in production,
          // since only elements passed to observer.observe() ever produce
          // entries here, but avoids an identity-comparison pitfall).
          const targetId = (entry.target as HTMLElement).id;
          const match = MODEL_SCENES.find((scene) => scene.sectionId === targetId);
          if (!match) continue;
          const rectCenter = (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2;
          const distance = Math.abs(rectCenter - viewportCenter);
          if (!closest || distance < closest.distance) {
            closest = { scene: match, distance };
          }
        }

        if (closest && closest.scene.sectionId !== activeSectionIdRef.current) {
          activeSectionIdRef.current = closest.scene.sectionId;
          setActiveSectionId(closest.scene.sectionId);
          requestModelRef.current(closest.scene.models[0]);
        }
      },
      { rootMargin: '-49% 0px -49% 0px', threshold: 0 },
    );

    for (const { el } of sectionEls) observer.observe(el);

    return () => observer.disconnect();
  }, [enabled]);

  // Scroll choreography for the two multi-model sections. Each section's
  // trigger is created once and lives for the page's lifetime (not just
  // while that section is active) — the authority rule inside onUpdate is
  // what stops an inactive section's trigger from acting on anything.
  //
  // Creation is idempotent (guarded by scrollTriggersRef, keyed by
  // sectionId) and retried whenever activeSectionId changes, not just once
  // on mount: this component is a fixed overlay that can mount before the
  // page's own section elements exist in the DOM yet (e.g. content still
  // hydrating/streaming in), so `document.getElementById` may miss on the
  // first attempt. Re-running on every active-section change gives it
  // another chance to pick up a section that's since appeared, without ever
  // recreating (and re-killing) a trigger that already exists.
  useEffect(() => {
    if (!enabled) return;

    for (const scene of MODEL_SCENES) {
      if (scene.models.length <= 1) continue;
      if (scrollTriggersRef.current.has(scene.sectionId)) continue;
      const el = document.getElementById(scene.sectionId);
      if (!el) continue;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        onUpdate: (self) => {
          // Authority rule: only the active section may drive the camera
          // or request a model swap — both multi-model sections' triggers
          // live for the page's lifetime and keep firing on scroll even
          // while a different section is active.
          if (activeSectionIdRef.current !== scene.sectionId) return;
          if (userInteractionActiveRef.current) return;

          const progress = self.progress;
          const inFirstHalf = progress < 0.5;
          const target = inFirstHalf ? scene.models[0] : scene.models[1];
          const localProgress = inFirstHalf ? progress * 2 : (progress - 0.5) * 2;

          // Always go through requestModel — never skip it just because
          // `target` already equals `currentModel`. requestModel's own
          // guards (below) are what cancel a *different* pending
          // transition when scroll reverses back to the already-current
          // model before that pending one finishes loading; if this
          // handler only called requestModel on a mismatch, that
          // cancellation path would never run for exactly the reversal
          // case it exists to handle.
          requestModelRef.current(target);

          if (currentModelRef.current?.src === target.src) {
            const targetEl = currentElRef.current;
            if (targetEl)
              applyChoreography(targetEl, target.src, localProgress, baselinesRef.current);
          }
        },
      });
      scrollTriggersRef.current.set(scene.sectionId, trigger);
    }
  }, [enabled, activeSectionId]);

  // Unmount-only: kill every trigger this component ever created, however
  // many creation attempts above it took to find each section's element.
  // Intentionally reads scrollTriggersRef.current inside the cleanup itself
  // (not a variable captured at effect-setup time) — this ref is a Map
  // that the trigger-creation effect above keeps mutating for as long as
  // the component is mounted, so a snapshot taken when this effect first
  // runs (empty, since it mounts before that effect has created anything)
  // would miss every trigger created afterward.
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps -- see comment above
      for (const trigger of scrollTriggersRef.current.values()) trigger.kill();
      scrollTriggersRef.current.clear();
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      {currentModel && (
        <ModelViewer
          key={currentModel.src}
          ref={onCurrentRef}
          src={currentModel.src}
          alt={currentModel.alt}
          className="w-full h-full bg-transparent"
          fadeOnLoad={false}
          // Camera ownership is XOR: exactly one system may write this
          // element's camera at a time. `activeSectionId` flips on the same
          // tick as `requestModel`, so keying off it alone would hand
          // auto-rotate to a still-mounted, mid-crossfade-out model while
          // the ease-to-baseline tween is about to start writing its
          // cameraOrbit/cameraTarget. Any in-flight incoming model means a
          // transition owns this camera, so auto-rotate must stay off.
          autoRotate={
            incomingModel === null &&
            !(activeSectionId !== null && SCROLL_DRIVEN_SECTION_IDS.has(activeSectionId))
          }
          cameraControls={cameraControls}
        />
      )}
      {incomingModel && (
        <ModelViewer
          key={incomingModel.src}
          ref={onIncomingRef}
          src={incomingModel.src}
          alt={incomingModel.alt}
          className="absolute inset-0 w-full h-full bg-transparent"
          fadeOnLoad={false}
          autoRotate={false}
          cameraControls={cameraControls}
        />
      )}
    </div>
  );
}
