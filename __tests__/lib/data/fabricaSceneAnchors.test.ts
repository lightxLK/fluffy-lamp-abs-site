// __tests__/lib/data/fabricaSceneAnchors.test.ts
import { MODEL_PLACEMENTS, SCENE_ANCHORS } from '@/lib/data/fabricaSceneAnchors';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';

describe('fabricaSceneAnchors', () => {
  it('has one placement and one anchor per model, in the spec-defined page order', () => {
    // Encodes the actual required order (gate, gate-v2, gazebo, stairs,
    // street-lamp, round-stairs) directly, rather than deriving it from
    // Object.values(MODEL_ASSETS) — deriving it from the other module
    // under test would let both drift together silently if MODEL_ASSETS'
    // own key order ever changed.
    const expectedSrcs = [
      MODEL_ASSETS.gate.src,
      MODEL_ASSETS.gateV2.src,
      MODEL_ASSETS.gazebo.src,
      MODEL_ASSETS.stairs.src,
      MODEL_ASSETS.streetLamp.src,
      MODEL_ASSETS.roundStairs.src,
    ];
    expect(MODEL_PLACEMENTS.map((p) => p.src)).toEqual(expectedSrcs);
    expect(SCENE_ANCHORS.map((a) => a.modelSrc)).toEqual(expectedSrcs);
  });

  it("every anchor's lookAt equals its placement's worldPosition (v1 constraint)", () => {
    SCENE_ANCHORS.forEach((anchor, i) => {
      const placement = MODEL_PLACEMENTS[i];
      expect(anchor.camera.lookAt.x).toBeCloseTo(placement.worldPosition.x, 6);
      expect(anchor.camera.lookAt.y).toBeCloseTo(placement.worldPosition.y, 6);
      expect(anchor.camera.lookAt.z).toBeCloseTo(placement.worldPosition.z, 6);
    });
  });

  it('every anchor has a positive fallbackRadius and a non-zero camera direction', () => {
    SCENE_ANCHORS.forEach((anchor) => {
      expect(anchor.camera.fallbackRadius).toBeGreaterThan(0);
      expect(anchor.camera.direction.length()).toBeGreaterThan(0);
    });
  });

  it('world positions are distinct across all six placements', () => {
    const keys = MODEL_PLACEMENTS.map(
      (p) => `${p.worldPosition.x},${p.worldPosition.y},${p.worldPosition.z}`,
    );
    expect(new Set(keys).size).toBe(keys.length);
  });
});
