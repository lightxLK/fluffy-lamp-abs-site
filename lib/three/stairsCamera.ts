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

// Camera now choreographs across the entire page's scroll length (not one
// section), so both values scale up from the original single-section
// tuning to stay visually meaningful over that much longer scroll range.
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
