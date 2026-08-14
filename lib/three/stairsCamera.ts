export interface CameraOrbitBaseline {
  thetaDeg: number;
  phiDeg: number;
  radiusM: number;
}

export interface CameraTargetBaseline {
  xM: number;
  yM: number;
  zM: number;
}

export const STAIRS_ROTATION_DEG = 720;
// Initial visual-tuning value, not a derived constant – adjust after
// browser verification against the actual round-stairs.glb model's real
// scale (Task 7's manual verification), without changing the semantics
// above (theta rotates, target y descends, everything else fixed).
export const STAIRS_DESCENT_M = 1.5;

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function clampProgress(progress: number): number {
  return Math.min(1, Math.max(0, progress));
}

export function computeStairsCameraOrbit(baseline: CameraOrbitBaseline, progress: number): string {
  const p = clampProgress(progress);
  const theta = baseline.thetaDeg + STAIRS_ROTATION_DEG * p;
  return `${theta}deg ${baseline.phiDeg}deg ${baseline.radiusM}m`;
}

export function computeStairsCameraTarget(
  baseline: CameraTargetBaseline,
  progress: number,
): string {
  const p = clampProgress(progress);
  const y = baseline.yM - STAIRS_DESCENT_M * p;
  return `${baseline.xM}m ${y}m ${baseline.zM}m`;
}
