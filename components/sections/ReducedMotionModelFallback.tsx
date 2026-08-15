'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { ModelViewer } from '@/components/ui/ModelViewer';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';

const GATE_MODELS = [
  { name: 'Ornamental Gate', asset: MODEL_ASSETS.gate },
  { name: 'Modern Gate', asset: MODEL_ASSETS.gateV2 },
];

const LANDSCAPE_MODELS = [
  { name: 'Structural Stairs', asset: MODEL_ASSETS.stairs },
  { name: 'Street Lamp', asset: MODEL_ASSETS.streetLamp },
];

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch {
    return false;
  }
}

function ModelCard({ name, asset }: { name: string; asset: { src: string; alt: string } }) {
  return (
    <article className="relative h-full">
      <CardGlow className="h-full p-8">
        <h3 className="text-text-primary font-semibold text-lg mb-4">{name}</h3>
        <ModelViewer
          src={asset.src}
          alt={asset.alt}
          className="w-full h-72"
          autoRotate={false}
          cameraControls
        />
      </CardGlow>
      <CardNuts />
    </article>
  );
}

export function ReducedMotionModelFallback() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection needs window.matchMedia/canvas, unavailable during SSR
    setShowFallback(reducedMotion || !hasWebGL());
  }, []);

  if (!showFallback) return null;

  return (
    <>
      <section className="bg-bg-dark py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {GATE_MODELS.map((gate) => (
              <ModelCard key={gate.asset.src} name={gate.name} asset={gate.asset} />
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-bg-card py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModelCard name="Gazebo" asset={MODEL_ASSETS.gazebo} />
            {LANDSCAPE_MODELS.map((item) => (
              <ModelCard key={item.asset.src} name={item.name} asset={item.asset} />
            ))}
            <ModelCard name="Round Staircase" asset={MODEL_ASSETS.roundStairs} />
          </div>
        </Container>
      </section>
    </>
  );
}
