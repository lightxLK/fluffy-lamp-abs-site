// lib/three/cinematicCamera.ts
import * as THREE from 'three';

export interface ModelPlacement {
  src: string;
  worldPosition: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
}

export interface LightSpec {
  position: THREE.Vector3;
  color: number;
  intensity: number;
}

export interface HemiLightSpec {
  skyColor: number;
  groundColor: number;
  intensity: number;
}

export interface SceneAnchor {
  modelSrc: string;
  camera: {
    lookAt: THREE.Vector3;
    direction: THREE.Vector3;
    fallbackRadius: number;
  };
  light: {
    key: LightSpec;
    rim: LightSpec;
    hemi: HemiLightSpec;
  };
  fog: { color: number; density: number };
  background: number;
  exposure: number;
}

export type MeasuredRadii = Record<string, number>;

export interface CameraCurves {
  position: THREE.CatmullRomCurve3;
  lookAt: THREE.CatmullRomCurve3;
}

export interface SampledCameraState {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fog: { color: THREE.Color; density: number };
  background: THREE.Color;
  exposure: number;
  light: {
    key: { position: THREE.Vector3; color: THREE.Color; intensity: number };
    rim: { position: THREE.Vector3; color: THREE.Color; intensity: number };
    hemi: { skyColor: THREE.Color; groundColor: THREE.Color; intensity: number };
  };
}

const DEFAULT_MARGIN = 1.35;

/**
 * Distance at which a sphere of `radius` fills the camera frustum, using
 * whichever of the vertical/horizontal FOV is more restrictive for the
 * given aspect ratio — a vertical-FOV-only formula under-fits on narrow
 * viewports, where the horizontal frustum is the limiting dimension.
 */
export function computeFitDistance(
  radius: number,
  verticalFovDeg: number,
  aspect: number,
  margin: number = DEFAULT_MARGIN,
): number {
  const verticalFovRad = THREE.MathUtils.degToRad(verticalFovDeg);
  const horizontalFovRad = 2 * Math.atan(Math.tan(verticalFovRad / 2) * aspect);
  const limitingFovRad = Math.min(verticalFovRad, horizontalFovRad);
  return (radius / Math.sin(limitingFovRad / 2)) * margin;
}

function resolveRadius(anchor: SceneAnchor, measured: MeasuredRadii): number {
  const value = measured[anchor.modelSrc];
  return typeof value === 'number' && Number.isFinite(value) ? value : anchor.camera.fallbackRadius;
}

/**
 * Builds the camera's position/look-at curves once, from real (or
 * fallback) measured radii and the current viewport aspect ratio. Called
 * once after the measurement pass, and again only on resize — never
 * per-frame. See Global Constraints: "Curve immutability."
 */
export function buildCameraCurves(
  anchors: readonly SceneAnchor[],
  measured: MeasuredRadii,
  verticalFovDeg: number,
  aspect: number,
): CameraCurves {
  const positions = anchors.map((anchor) => {
    const radius = resolveRadius(anchor, measured);
    const distance = computeFitDistance(radius, verticalFovDeg, aspect);
    const direction = anchor.camera.direction.clone().normalize();
    return anchor.camera.lookAt.clone().addScaledVector(direction, distance);
  });
  const lookAts = anchors.map((anchor) => anchor.camera.lookAt.clone());

  return {
    position: new THREE.CatmullRomCurve3(positions, false, 'centripetal', 0.5),
    lookAt: new THREE.CatmullRomCurve3(lookAts, false, 'centripetal', 0.5),
  };
}

function lerpNum(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpLight(a: LightSpec, b: LightSpec, t: number) {
  return {
    position: a.position.clone().lerp(b.position, t),
    color: new THREE.Color(a.color).lerp(new THREE.Color(b.color), t),
    intensity: lerpNum(a.intensity, b.intensity, t),
  };
}

/**
 * Samples the already-built curves and interpolates atmosphere between
 * the two anchors bracketing `t`. Pure: returns a plain data object,
 * never mutates a `THREE.Camera`/`Scene`/light directly — the caller
 * applies the result.
 */
export function sampleCameraPath(
  t: number,
  anchors: readonly SceneAnchor[],
  curves: CameraCurves,
): SampledCameraState {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  const segs = anchors.length - 1;
  const segF = clamped * segs;
  const seg = Math.min(segs - 1, Math.max(0, Math.floor(segF)));
  const localT = segF - seg;
  const a = anchors[seg];
  const b = anchors[seg + 1];

  const position = curves.position.getPoint(clamped);
  const lookAt = curves.lookAt.getPoint(clamped);

  const fogColor = new THREE.Color(a.fog.color).lerp(new THREE.Color(b.fog.color), localT);
  const background = new THREE.Color(a.background).lerp(new THREE.Color(b.background), localT);
  const density = lerpNum(a.fog.density, b.fog.density, localT);
  const exposure = lerpNum(a.exposure, b.exposure, localT);

  return {
    position,
    lookAt,
    fog: { color: fogColor, density },
    background,
    exposure,
    light: {
      key: lerpLight(a.light.key, b.light.key, localT),
      rim: lerpLight(a.light.rim, b.light.rim, localT),
      hemi: {
        skyColor: new THREE.Color(a.light.hemi.skyColor).lerp(
          new THREE.Color(b.light.hemi.skyColor),
          localT,
        ),
        groundColor: new THREE.Color(a.light.hemi.groundColor).lerp(
          new THREE.Color(b.light.hemi.groundColor),
          localT,
        ),
        intensity: lerpNum(a.light.hemi.intensity, b.light.hemi.intensity, localT),
      },
    },
  };
}

/**
 * Applies the authored rotation/scale, measures the resulting world-space
 * bounding box, then translates the group so that box's center sits at
 * `placement.worldPosition`. Returns the post-normalization bounding-sphere
 * radius. Order matters: rotation/scale must be applied and
 * `updateMatrixWorld` called before measuring — see Global Constraints:
 * "Model normalization order."
 */
export function normalizeModelToPlacement(root: THREE.Object3D, placement: ModelPlacement): number {
  root.rotation.copy(placement.rotation);
  root.scale.setScalar(placement.scale);
  root.position.set(0, 0, 0);
  root.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  const offset = placement.worldPosition.clone().sub(center);
  root.position.copy(offset);
  root.updateMatrixWorld(true);

  const finalSphere = new THREE.Box3().setFromObject(root).getBoundingSphere(new THREE.Sphere());
  return finalSphere.radius;
}
