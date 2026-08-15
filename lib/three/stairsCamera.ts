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

// Camera choreography for scroll-driven sections of the fabrica page.
// Originally built for the round-stairs model; the math is generic
// (baseline + progress -> camera string) and is reused by
// ModelSceneController for any mapped section that drives its camera
// from scroll progress, not just stairs.
export const STAIRS_ROTATION_DEG = 1440;
export const STAIRS_DESCENT_M = 4;

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
