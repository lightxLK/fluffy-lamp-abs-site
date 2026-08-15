'use client';

import { useRef } from 'react';
import type { ModelViewerElement } from '@google/model-viewer';
import { useGSAP, ScrollTrigger } from '@/lib/gsap';
import { ModelViewer } from '@/components/ui/ModelViewer';
import {
  computeStairsCameraOrbit,
  computeStairsCameraTarget,
  radToDeg,
  type CameraOrbitBaseline,
  type CameraTargetBaseline,
} from '@/lib/three/stairsCamera';

/**
 * Fixed, whole-page scroll companion (not a pinned section): the round
 * staircase sits in a fixed right-side layer for the entire document
 * height, and its camera orbit/descent is driven by scroll progress across
 * the whole page (`document.documentElement`, top to bottom) rather than a
 * single section's local scroll range.
 */
export function StairsScrollScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<ModelViewerElement | null>(null);

  useGSAP(
    () => {
      const el = modelRef.current;
      if (!el) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // See ModelViewer.tsx / the note on Lit's `ReactiveElement` for why
        // setting this before the custom element upgrades is safe.
        el.cameraControls = true;
        return;
      }

      let orbitBaseline: CameraOrbitBaseline | null = null;
      let targetBaseline: CameraTargetBaseline | null = null;
      let trigger: ReturnType<typeof ScrollTrigger.create> | null = null;

      const applyCamera = (progress: number) => {
        if (!orbitBaseline || !targetBaseline) return;
        el.cameraOrbit = computeStairsCameraOrbit(orbitBaseline, progress);
        el.cameraTarget = computeStairsCameraTarget(targetBaseline, progress);
      };

      const captureBaseline = () => {
        const orbit = el.getCameraOrbit();
        const target = el.getCameraTarget();
        orbitBaseline = {
          thetaDeg: Math.round(radToDeg(orbit.theta) * 1e6) / 1e6,
          phiDeg: Math.round(radToDeg(orbit.phi) * 1e6) / 1e6,
          radiusM: orbit.radius,
        };
        targetBaseline = { xM: target.x, yM: target.y, zM: target.z };
        if (trigger) applyCamera(trigger.progress);
      };

      if (el.loaded) {
        captureBaseline();
      } else {
        el.addEventListener('load', captureBaseline);
      }

      // Trigger spans the whole document, not this component's own DOM
      // node — `document.documentElement` covers exactly the page's total
      // scrollable height, so progress 0→1 matches the entire page's
      // scroll length and speed rather than one section's local span.
      trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => applyCamera(self.progress),
      });

      return () => {
        el.removeEventListener('load', captureBaseline);
        trigger?.kill();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div
      ref={wrapperRef}
      className="hidden lg:block fixed top-0 right-0 h-screen w-[38vw] z-0 pointer-events-none"
    >
      <ModelViewer
        ref={modelRef}
        src="/models/round-stairs.glb"
        alt="Round staircase fabricated by ABS Fabrica"
        className="w-full h-full"
        autoRotate={false}
        cameraControls={false}
      />
    </div>
  );
}
