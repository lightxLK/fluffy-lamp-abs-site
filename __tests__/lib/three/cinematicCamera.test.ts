// __tests__/lib/three/cinematicCamera.test.ts
import * as THREE from 'three';
import {
  computeFitDistance,
  buildCameraCurves,
  sampleCameraPath,
  normalizeModelToPlacement,
  type SceneAnchor,
  type ModelPlacement,
} from '@/lib/three/cinematicCamera';

describe('computeFitDistance', () => {
  it('returns the same distance for aspect ratios >= 1 (vertical FOV is always the limiting one there)', () => {
    const square = computeFitDistance(5, 45, 1, 1);
    const wide = computeFitDistance(5, 45, 2, 1);
    expect(wide).toBeCloseTo(square, 5);
  });

  it('returns a larger distance for aspect ratios < 1 (horizontal FOV becomes limiting)', () => {
    const square = computeFitDistance(5, 45, 1, 1);
    const narrow = computeFitDistance(5, 45, 0.5, 1);
    expect(narrow).toBeGreaterThan(square);
  });

  it('applies the margin multiplier linearly', () => {
    const noMargin = computeFitDistance(5, 45, 1, 1);
    const withMargin = computeFitDistance(5, 45, 1, 1.35);
    expect(withMargin).toBeCloseTo(noMargin * 1.35, 5);
  });
});

function makeAnchor(overrides: Partial<SceneAnchor> = {}): SceneAnchor {
  return {
    modelSrc: '/models/test.glb',
    camera: {
      lookAt: new THREE.Vector3(0, 0, 0),
      direction: new THREE.Vector3(0, 0, 1),
      fallbackRadius: 2,
    },
    light: {
      key: { position: new THREE.Vector3(1, 1, 1), color: 0xffffff, intensity: 1 },
      rim: { position: new THREE.Vector3(-1, 1, -1), color: 0xffffff, intensity: 0.5 },
      hemi: { skyColor: 0xffffff, groundColor: 0x000000, intensity: 0.6 },
    },
    fog: { color: 0x000000, density: 0.01 },
    background: 0x000000,
    exposure: 1,
    ...overrides,
  };
}

describe('buildCameraCurves', () => {
  it('constructs both curves with centripetal parameterization, not the default', () => {
    const anchors = [
      makeAnchor({
        modelSrc: '/models/0.glb',
        camera: {
          lookAt: new THREE.Vector3(0, 0, 0),
          direction: new THREE.Vector3(0, 0, 1),
          fallbackRadius: 2,
        },
      }),
      makeAnchor({
        modelSrc: '/models/1.glb',
        camera: {
          lookAt: new THREE.Vector3(10, 0, 0),
          direction: new THREE.Vector3(0, 0, 1),
          fallbackRadius: 2,
        },
      }),
    ];
    const { position, lookAt } = buildCameraCurves(anchors, {}, 45, 1);
    expect(position.curveType).toBe('centripetal');
    expect(lookAt.curveType).toBe('centripetal');
  });

  it('uses the measured radius when present', () => {
    const anchor = makeAnchor({
      modelSrc: '/models/a.glb',
      camera: {
        lookAt: new THREE.Vector3(0, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 999,
      },
    });
    const anchor2 = makeAnchor({
      modelSrc: '/models/b.glb',
      camera: {
        lookAt: new THREE.Vector3(10, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 2,
      },
    });
    const { position } = buildCameraCurves([anchor, anchor2], { '/models/a.glb': 3 }, 45, 1);
    const first = position.getPoint(0);
    // distance derived from measured radius 3, not fallbackRadius 999 —
    // camera.z at anchor 0 should be close to computeFitDistance(3, 45, 1),
    // nowhere near a distance derived from 999.
    const expectedDistance = computeFitDistance(3, 45, 1);
    expect(first.z).toBeCloseTo(expectedDistance, 3);
  });

  it('falls back to fallbackRadius when a src has no measured entry', () => {
    const anchor = makeAnchor({
      modelSrc: '/models/missing.glb',
      camera: {
        lookAt: new THREE.Vector3(0, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 4,
      },
    });
    const anchor2 = makeAnchor({
      modelSrc: '/models/other.glb',
      camera: {
        lookAt: new THREE.Vector3(10, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 2,
      },
    });
    const { position } = buildCameraCurves([anchor, anchor2], {}, 45, 1);
    const first = position.getPoint(0);
    const expectedDistance = computeFitDistance(4, 45, 1);
    expect(first.z).toBeCloseTo(expectedDistance, 3);
  });
});

describe('sampleCameraPath', () => {
  it("exactly reproduces the middle anchor's own atmosphere values at its own curve parameter (3 anchors, t=0.5)", () => {
    const a0 = makeAnchor({
      modelSrc: '/models/0.glb',
      camera: {
        lookAt: new THREE.Vector3(0, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 2,
      },
      fog: { color: 0x111111, density: 0.01 },
      background: 0x111111,
      exposure: 0.8,
    });
    const a1 = makeAnchor({
      modelSrc: '/models/1.glb',
      camera: {
        lookAt: new THREE.Vector3(10, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 2,
      },
      fog: { color: 0x222222, density: 0.02 },
      background: 0x222222,
      exposure: 1.0,
    });
    const a2 = makeAnchor({
      modelSrc: '/models/2.glb',
      camera: {
        lookAt: new THREE.Vector3(20, 0, 0),
        direction: new THREE.Vector3(0, 0, 1),
        fallbackRadius: 2,
      },
      fog: { color: 0x333333, density: 0.03 },
      background: 0x333333,
      exposure: 1.2,
    });
    const anchors = [a0, a1, a2];
    const curves = buildCameraCurves(anchors, {}, 45, 1);

    // With 3 anchors, t=0.5 lands exactly on segment index 1 with localT=0,
    // which must reproduce anchor[1]'s own values exactly (no lerp bleed).
    const state = sampleCameraPath(0.5, anchors, curves);
    expect(state.exposure).toBeCloseTo(1.0, 6);
    expect(state.fog.density).toBeCloseTo(0.02, 6);
    expect(state.background.getHex()).toBe(0x222222);
    expect(state.lookAt.x).toBeCloseTo(10, 3);
  });

  it('clamps t outside [0,1]', () => {
    const anchors = [
      makeAnchor({ modelSrc: '/models/0.glb', exposure: 0.5 }),
      makeAnchor({
        modelSrc: '/models/1.glb',
        camera: {
          lookAt: new THREE.Vector3(10, 0, 0),
          direction: new THREE.Vector3(0, 0, 1),
          fallbackRadius: 2,
        },
        exposure: 1.5,
      }),
    ];
    const curves = buildCameraCurves(anchors, {}, 45, 1);
    const below = sampleCameraPath(-1, anchors, curves);
    const above = sampleCameraPath(2, anchors, curves);
    expect(below.exposure).toBeCloseTo(0.5, 3);
    expect(above.exposure).toBeCloseTo(1.5, 3);
  });
});

describe('normalizeModelToPlacement', () => {
  it('translates the model so its measured visual-bounds center sits at worldPosition, and returns a matching bounding-sphere radius', () => {
    const group = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2));
    // Simulate a GLB whose own local origin is far from its visual geometry.
    box.position.set(5, 3, -2);
    group.add(box);

    const placement: ModelPlacement = {
      src: '/models/offset.glb',
      worldPosition: new THREE.Vector3(10, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
      scale: 1,
    };

    const radius = normalizeModelToPlacement(group, placement);

    const finalBox = new THREE.Box3().setFromObject(group);
    const center = finalBox.getCenter(new THREE.Vector3());
    expect(center.x).toBeCloseTo(10, 3);
    expect(center.y).toBeCloseTo(0, 3);
    expect(center.z).toBeCloseTo(0, 3);

    // A 2x2x2 box's bounding-sphere radius is half its space diagonal: sqrt(3).
    expect(radius).toBeCloseTo(Math.sqrt(3), 3);
  });

  it('accounts for authored scale when computing the radius', () => {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2)));

    const placement: ModelPlacement = {
      src: '/models/scaled.glb',
      worldPosition: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
      scale: 2,
    };

    const radius = normalizeModelToPlacement(group, placement);
    expect(radius).toBeCloseTo(Math.sqrt(3) * 2, 3);
  });
});
