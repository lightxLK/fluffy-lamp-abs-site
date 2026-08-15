'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ScrollTrigger } from '@/lib/gsap';
import { MODEL_PLACEMENTS, SCENE_ANCHORS } from '@/lib/data/fabricaSceneAnchors';
import {
  buildCameraCurves,
  normalizeModelToPlacement,
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

    let cancelled = false;
    const measurementCache: MeasuredRadii = {};
    let curves: CameraCurves | null = null;
    const scrollProgressRef = { current: 0 };
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

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
            object.traverse((node) => {
              if (node instanceof THREE.Mesh) node.castShadow = true;
            });
            scene.add(object);
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
          // this anchor's authored fallbackRadius.
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

      renderer.render(scene, camera);
    }

    measureAndBuild();

    return () => {
      cancelled = true;
      scrollTrigger?.kill();
      renderer.setAnimationLoop(null);
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
