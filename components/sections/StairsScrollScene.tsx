'use client';

import { useRef } from 'react';
import type { ModelViewerElement } from '@google/model-viewer';
import { useGSAP, ScrollTrigger } from '@/lib/gsap';
import { Container } from '@/components/layout/Container';
import { ModelViewer } from '@/components/ui/ModelViewer';
import {
  computeStairsCameraOrbit,
  computeStairsCameraTarget,
  radToDeg,
  type CameraOrbitBaseline,
  type CameraTargetBaseline,
} from '@/lib/three/stairsCamera';

export function StairsScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const modelRef = useRef<ModelViewerElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const el = modelRef.current;
      if (!section || !el) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Setting this before the custom element upgrades is safe:
        // model-viewer is built on Lit's `ReactiveElement`, which queues
        // and correctly applies instance properties set before upgrade —
        // this isn't a plain-DOM-property assignment that could be lost.
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
          // Rounded to 6 decimal places: radians->degrees->radians round
          // trips through model-viewer's own getCameraOrbit() can leave
          // sub-millidegree float noise (e.g. 75.00000000000001) that has
          // no visual effect but would otherwise leak into the rendered
          // cameraOrbit string.
          thetaDeg: Math.round(radToDeg(orbit.theta) * 1e6) / 1e6,
          phiDeg: Math.round(radToDeg(orbit.phi) * 1e6) / 1e6,
          radiusM: orbit.radius,
        };
        targetBaseline = { xM: target.x, yM: target.y, zM: target.z };
        // If the model finishes loading after the trigger already exists
        // (e.g. the visitor scrolled past before the GLB arrived and isn't
        // scrolling anymore), don't leave the camera at its default until
        // the next scroll event — sync it to the current progress now.
        if (trigger) applyCamera(trigger.progress);
      };

      // Same race as ModelViewer's own loading state: `el.loaded` can
      // already be true by the time this effect runs, in which case a
      // `load` listener attached now would never fire. Capture immediately
      // if it's already loaded; otherwise wait for the event.
      if (el.loaded) {
        captureBaseline();
      } else {
        el.addEventListener('load', captureBaseline);
      }

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: true,
        onUpdate: (self) => applyCamera(self.progress),
      });

      return () => {
        el.removeEventListener('load', captureBaseline);
        trigger?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-bg-dark py-24 overflow-hidden">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Crafted in Detail
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight">
            Every step, considered
          </h2>
        </div>
        <ModelViewer
          ref={modelRef}
          src="/models/round-stairs.glb"
          alt="Round staircase fabricated by ABS Fabrica"
          className="w-full h-[70vh]"
          autoRotate={false}
          cameraControls={false}
        />
      </Container>
    </section>
  );
}
