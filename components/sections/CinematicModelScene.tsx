'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ScrollTrigger } from '@/lib/gsap';
import { MODEL_PLACEMENTS, SCENE_ANCHORS } from '@/lib/data/fabricaSceneAnchors';
import {
  buildCameraCurves,
  normalizeModelToPlacement,
  sampleCameraPath,
  type CameraCurves,
  type MeasuredRadii,
} from '@/lib/three/cinematicCamera';

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch {
    return false;
  }
}

function loadModel(src: string): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => resolve(gltf.scene),
      undefined,
      (err) => reject(err instanceof Error ? err : new Error(String(err))),
    );
  });
}

function disposeObject(object: THREE.Object3D) {
  // Guard against double-disposal: a GLTF export commonly reuses one
  // material instance (and its textures) across several mesh nodes in the
  // same object graph — without these sets, traverse() would call
  // `.dispose()` on the same material/texture once per mesh that
  // references it, not once total.
  const disposedMaterials = new Set<THREE.Material>();
  const disposedTextures = new Set<THREE.Texture>();

  object.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    node.geometry.dispose();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      if (disposedMaterials.has(material)) continue;
      disposedMaterials.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture && !disposedTextures.has(value)) {
          disposedTextures.add(value);
          value.dispose();
        }
      }
      material.dispose();
    }
  });
}

export function CinematicModelScene() {
  const [enabled, setEnabled] = useState(false);
  const [measuring, setMeasuring] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Gating order: reduced-motion, then WebGL availability — checked once
  // at mount, never re-evaluated on change (same pattern as every other
  // client-only feature-detected component in this repo). Never construct
  // a WebGLRenderer just to discover WebGL isn't available.
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection needs window.matchMedia/canvas, unavailable during SSR
    setEnabled(!reducedMotion && hasWebGL());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Shadow maps must not auto-update every frame in a permanent render
    // loop — needsUpdate is set explicitly (Task 6) when the resident
    // model set changes, and separately via an epsilon-threshold check
    // against the key light's position/intensity (which is otherwise
    // interpolated continuously every frame).
    renderer.shadowMap.autoUpdate = false;
    container.appendChild(renderer.domElement);

    // One continuous ground plane spanning the full ride — this is what
    // makes models read as standing in one world instead of floating.
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshStandardMaterial({ color: 0x1d1d1d, roughness: 0.95, metalness: 0.02 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const hemi = new THREE.HemisphereLight(0x28282b, 0x0d0d0d, 0.6);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0x3667f4, 0.8);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe65a2d, 0.2);
    scene.add(rim);

    scene.fog = new THREE.FogExp2(SCENE_ANCHORS[0].fog.color, SCENE_ANCHORS[0].fog.density);

    let cancelled = false;
    const measurementCache: MeasuredRadii = {};
    let curves: CameraCurves | null = null;
    const scrollProgressRef = { current: 0 };
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

    type ResidencyState = 'idle' | 'loading' | 'resident' | 'disposed' | 'failed';
    const residency = new Map<string, ResidencyState>();
    const residentObjects = new Map<string, THREE.Object3D>();

    function windowFor(t: number) {
      const index = Math.round(t * (MODEL_PLACEMENTS.length - 1));
      return {
        start: Math.max(0, index - 1),
        end: Math.min(MODEL_PLACEMENTS.length - 1, index + 1),
      };
    }

    function updateResidency(t: number) {
      const { start: windowStart, end: windowEnd } = windowFor(t);

      MODEL_PLACEMENTS.forEach((placement, i) => {
        const inWindow = i >= windowStart && i <= windowEnd;
        const state = residency.get(placement.src) ?? 'idle';

        if (inWindow && (state === 'idle' || state === 'disposed')) {
          residency.set(placement.src, 'loading');
          loadModel(placement.src)
            .then((object) => {
              if (cancelled || residency.get(placement.src) !== 'loading') return;
              // Re-check against the *live* scroll position at resolution
              // time, not the `t` this request started under — the model
              // may have left the residency window while this load was in
              // flight. A late result must never become resident just
              // because the request started while it was still wanted.
              const liveWindow = windowFor(scrollProgressRef.current);
              const stillWanted = i >= liveWindow.start && i <= liveWindow.end;
              if (!stillWanted) {
                disposeObject(object);
                residency.set(placement.src, 'disposed');
                return;
              }
              normalizeModelToPlacement(object, placement);
              object.traverse((node) => {
                if (node instanceof THREE.Mesh) node.castShadow = true;
              });
              scene.add(object);
              residentObjects.set(placement.src, object);
              residency.set(placement.src, 'resident');
              renderer.shadowMap.needsUpdate = true;
            })
            .catch((err) => {
              console.error(
                `[CinematicModelScene] residency load failed for ${placement.src}`,
                err,
              );
              residency.set(placement.src, 'failed');
            });
        }

        if (!inWindow && state === 'resident') {
          const object = residentObjects.get(placement.src);
          if (object) {
            scene.remove(object);
            disposeObject(object);
            residentObjects.delete(placement.src);
            renderer.shadowMap.needsUpdate = true;
          }
          residency.set(placement.src, 'disposed');
        }
      });
    }

    // Shadow-map invalidation is keyed off the key light specifically —
    // it's the only shadow-casting light (`key.castShadow = true`, set
    // above) — compared against a snapshot from the last frame that
    // actually invalidated the shadow map. Position/intensity move
    // continuously as sampleCameraPath interpolates between anchors;
    // invalidating on every frame would defeat autoUpdate=false entirely,
    // so only a materially different light state re-triggers it.
    const lastShadowKeyPosition = new THREE.Vector3();
    let lastShadowKeyIntensity = 0;
    const SHADOW_POSITION_EPSILON_SQ = 0.25; // 0.5 units, squared
    const SHADOW_INTENSITY_EPSILON = 0.05;

    function renderFrame() {
      if (!curves) return;
      const state = sampleCameraPath(scrollProgressRef.current, SCENE_ANCHORS, curves);

      camera.position.copy(state.position);
      camera.lookAt(state.lookAt);
      scene.background = state.background;
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(state.fog.color);
        scene.fog.density = state.fog.density;
      }
      renderer.toneMappingExposure = state.exposure;

      key.position.copy(state.light.key.position);
      key.color.copy(state.light.key.color);
      key.intensity = state.light.key.intensity;
      rim.position.copy(state.light.rim.position);
      rim.color.copy(state.light.rim.color);
      rim.intensity = state.light.rim.intensity;
      hemi.color.copy(state.light.hemi.skyColor);
      hemi.groundColor.copy(state.light.hemi.groundColor);
      hemi.intensity = state.light.hemi.intensity;

      const keyMoved =
        key.position.distanceToSquared(lastShadowKeyPosition) > SHADOW_POSITION_EPSILON_SQ;
      const keyDimmed = Math.abs(key.intensity - lastShadowKeyIntensity) > SHADOW_INTENSITY_EPSILON;
      if (keyMoved || keyDimmed) {
        renderer.shadowMap.needsUpdate = true;
        lastShadowKeyPosition.copy(key.position);
        lastShadowKeyIntensity = key.intensity;
      }

      updateResidency(scrollProgressRef.current);
      renderer.render(scene, camera);
    }

    function startAnimationLoop() {
      renderer.setAnimationLoop(renderFrame);
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Curve immutability: rebuild only here, from the same measured
      // data — never inside renderFrame. scrollProgressRef is untouched,
      // so the ride continues from the same position after the rebuild.
      if (Object.keys(measurementCache).length > 0 || curves) {
        curves = buildCameraCurves(SCENE_ANCHORS, measurementCache, camera.fov, camera.aspect);
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        renderer.setAnimationLoop(null);
      } else if (curves) {
        startAnimationLoop();
      }
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    async function measureAndBuild() {
      for (let i = 0; i < MODEL_PLACEMENTS.length; i++) {
        if (cancelled) return;
        const placement = MODEL_PLACEMENTS[i];
        try {
          const object = await loadModel(placement.src);
          if (cancelled) return;
          const radius = normalizeModelToPlacement(object, placement);
          measurementCache[placement.src] = radius;
          if (i === 0) {
            // Promote the first anchor's model directly into the visible
            // scene — it's needed immediately, before any scroll happens.
            // Register it in residentObjects/residency too, so unmount
            // actually disposes it and updateResidency doesn't
            // immediately try to re-load it.
            object.traverse((node) => {
              if (node instanceof THREE.Mesh) node.castShadow = true;
            });
            scene.add(object);
            residentObjects.set(placement.src, object);
            residency.set(placement.src, 'resident');
            renderer.shadowMap.needsUpdate = true;
          } else {
            // Metadata-only retention: dispose everything except the
            // measured radius for every model not being promoted now.
            // Task 6's residency window re-loads models as the camera
            // approaches them.
            disposeObject(object);
          }
        } catch (err) {
          console.error(`[CinematicModelScene] measurement failed for ${placement.src}`, err);
          // No entry in measurementCache — buildCameraCurves falls back to
          // this anchor's authored fallbackRadius. Also mark residency
          // 'failed' permanently: without this, updateResidency (above)
          // would see the default 'idle' state and retry loadModel every
          // time this anchor enters the residency window, contradicting
          // the frozen loading-miss policy ("permanently empty for the
          // session").
          residency.set(placement.src, 'failed');
        }
      }

      if (cancelled) return;
      curves = buildCameraCurves(SCENE_ANCHORS, measurementCache, camera.fov, camera.aspect);
      setMeasuring(false);

      // Global Constraints: ScrollTrigger's trigger is the page's own
      // <main> element — never document.body (content outside <main>
      // would stretch the 0→1 mapping) and never this component's own
      // `container` div (position: fixed, no natural scroll height).
      // <main> is a hard invariant (page.tsx always renders exactly one),
      // never document.body — fail closed rather than silently accepting
      // a trigger element the spec explicitly ruled out. If this ever
      // fires, the ride stays static at the first anchor (curves are
      // still built, the first model is still visible) rather than
      // scrolling against the wrong contract.
      const scrollRoot = document.querySelector('main');
      if (!scrollRoot) {
        console.error(
          '[CinematicModelScene] expected page <main> was not found — scroll-driven camera path disabled for this session',
        );
      } else {
        scrollTrigger = ScrollTrigger.create({
          trigger: scrollRoot,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        });
      }

      startAnimationLoop();
    }

    measureAndBuild();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      scrollTrigger?.kill();
      renderer.setAnimationLoop(null);
      residentObjects.forEach((object) => disposeObject(object));
      residentObjects.clear();
      renderer.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-0" />
      {measuring && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <p className="text-text-muted text-sm uppercase tracking-widest">Loading scene…</p>
        </div>
      )}
    </>
  );
}
