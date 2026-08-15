import { MODEL_ASSETS } from '@/lib/data/fabricaModels';

describe('MODEL_ASSETS', () => {
  it('has all six model entries with non-empty src and alt', () => {
    const keys = ['gate', 'gateV2', 'gazebo', 'stairs', 'streetLamp', 'roundStairs'] as const;
    for (const key of keys) {
      expect(MODEL_ASSETS[key].src).toMatch(/^\/models\/.+\.glb$/);
      expect(MODEL_ASSETS[key].alt.length).toBeGreaterThan(0);
    }
  });

  it('has unique src paths across all entries', () => {
    const srcs = Object.values(MODEL_ASSETS).map((m) => m.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
