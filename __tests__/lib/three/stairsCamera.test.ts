import {
  computeStairsCameraOrbit,
  computeStairsCameraTarget,
  radToDeg,
  STAIRS_ROTATION_DEG,
  STAIRS_DESCENT_M,
} from '@/lib/three/stairsCamera';

describe('radToDeg', () => {
  it('converts radians to degrees', () => {
    expect(radToDeg(Math.PI)).toBeCloseTo(180);
    expect(radToDeg(0)).toBe(0);
  });
});

describe('computeStairsCameraOrbit', () => {
  const baseline = { thetaDeg: 10, phiDeg: 75, radiusM: 2.5 };

  it('returns the baseline unchanged at progress 0', () => {
    expect(computeStairsCameraOrbit(baseline, 0)).toBe('10deg 75deg 2.5m');
  });

  it('rotates theta by the full sweep at progress 1, leaving phi and radius fixed', () => {
    expect(computeStairsCameraOrbit(baseline, 1)).toBe(`${10 + STAIRS_ROTATION_DEG}deg 75deg 2.5m`);
  });

  it('clamps progress above 1', () => {
    expect(computeStairsCameraOrbit(baseline, 1.5)).toBe(computeStairsCameraOrbit(baseline, 1));
  });

  it('clamps progress below 0', () => {
    expect(computeStairsCameraOrbit(baseline, -0.5)).toBe(computeStairsCameraOrbit(baseline, 0));
  });
});

describe('computeStairsCameraTarget', () => {
  const baseline = { xM: 0, yM: 1.2, zM: 0 };

  it('returns the baseline unchanged at progress 0', () => {
    expect(computeStairsCameraTarget(baseline, 0)).toBe('0m 1.2m 0m');
  });

  it('descends target y by the full amount at progress 1, leaving x and z fixed', () => {
    expect(computeStairsCameraTarget(baseline, 1)).toBe(`0m ${1.2 - STAIRS_DESCENT_M}m 0m`);
  });

  it('clamps progress outside [0, 1]', () => {
    expect(computeStairsCameraTarget(baseline, 2)).toBe(computeStairsCameraTarget(baseline, 1));
    expect(computeStairsCameraTarget(baseline, -1)).toBe(computeStairsCameraTarget(baseline, 0));
  });
});
