// lib/data/fabricaSceneAnchors.ts
import * as THREE from 'three';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';
import type { ModelPlacement, SceneAnchor } from '@/lib/three/cinematicCamera';

// Brand palette (app/globals.css): --abs-bg-dark #0d0d0d, --abs-bg-card
// #1d1d1d, --abs-bg-mid #28282b, blue accent #3667F4 (CardGlow's `colors`
// array), warm-orange glow #E65A2D (CardGlow's `glowColor` "230 90 45").
const BRAND_KEY_BLUE = 0x3667f4;
const BRAND_RIM_ORANGE = 0xe65a2d;
const BRAND_HEMI_SKY = 0x28282b;
const BRAND_HEMI_GROUND = 0x0d0d0d;

// Six world positions spaced 30 units apart along +X — one continuous
// stretch the camera travels down, in page order.
const SPACING = 30;

function placement(src: string, index: number): ModelPlacement {
  return {
    src,
    worldPosition: new THREE.Vector3(index * SPACING, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: 1,
  };
}

export const MODEL_PLACEMENTS: readonly ModelPlacement[] = [
  placement(MODEL_ASSETS.gate.src, 0),
  placement(MODEL_ASSETS.gateV2.src, 1),
  placement(MODEL_ASSETS.gazebo.src, 2),
  placement(MODEL_ASSETS.stairs.src, 3),
  placement(MODEL_ASSETS.streetLamp.src, 4),
  placement(MODEL_ASSETS.roundStairs.src, 5),
];

// Background drifts from near-black brand dark toward a warmer dusk tone
// across the ride; key light stays brand blue, rim light carries the
// warm accent and ramps up toward the finale.
function anchor(
  index: number,
  opts: { fallbackRadius: number; background: number; exposure: number },
): SceneAnchor {
  const worldPosition = MODEL_PLACEMENTS[index].worldPosition;
  const t = index / (MODEL_PLACEMENTS.length - 1);
  return {
    modelSrc: MODEL_PLACEMENTS[index].src,
    camera: {
      lookAt: worldPosition.clone(),
      direction: new THREE.Vector3(0.6, 0.35, 1),
      fallbackRadius: opts.fallbackRadius,
    },
    light: {
      key: {
        position: worldPosition.clone().add(new THREE.Vector3(8, 10, 8)),
        color: BRAND_KEY_BLUE,
        intensity: 0.8 + t * 0.4,
      },
      rim: {
        position: worldPosition.clone().add(new THREE.Vector3(-8, 6, -8)),
        color: BRAND_RIM_ORANGE,
        intensity: 0.2 + t * 0.7,
      },
      hemi: { skyColor: BRAND_HEMI_SKY, groundColor: BRAND_HEMI_GROUND, intensity: 0.6 },
    },
    fog: { color: opts.background, density: 0.015 },
    background: opts.background,
    exposure: opts.exposure,
  };
}

export const SCENE_ANCHORS: readonly SceneAnchor[] = [
  anchor(0, { fallbackRadius: 2.5, background: 0x0d0d0d, exposure: 1.0 }),
  anchor(1, { fallbackRadius: 2.5, background: 0x141414, exposure: 1.0 }),
  anchor(2, { fallbackRadius: 3.0, background: 0x1d1d1d, exposure: 1.0 }),
  anchor(3, { fallbackRadius: 3.5, background: 0x201a16, exposure: 1.0 }),
  anchor(4, { fallbackRadius: 3.5, background: 0x241c14, exposure: 1.0 }),
  anchor(5, { fallbackRadius: 3.0, background: 0x28180f, exposure: 1.0 }),
];
