import { Container } from '@/components/layout/Container';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';
import { ModelViewer } from '@/components/ui/ModelViewer';
import { MODEL_ASSETS } from '@/lib/data/fabricaModels';

const MODELS = [
  { name: 'Ornamental Gate', asset: MODEL_ASSETS.gate },
  { name: 'Modern Gate', asset: MODEL_ASSETS.gateV2 },
  { name: 'Gazebo', asset: MODEL_ASSETS.gazebo },
  { name: 'Structural Stairs', asset: MODEL_ASSETS.stairs },
  { name: 'Street Lamp', asset: MODEL_ASSETS.streetLamp },
  { name: 'Round Staircase', asset: MODEL_ASSETS.roundStairs },
];

function ModelCard({ name, asset }: { name: string; asset: { src: string; alt: string } }) {
  return (
    <article className="relative h-full">
      <CardGlow className="h-full p-8">
        <h3 className="text-text-primary font-semibold text-lg mb-4">{name}</h3>
        <ModelViewer
          src={asset.src}
          alt={asset.alt}
          className="w-full h-72"
          autoRotate
          cameraControls
        />
      </CardGlow>
      <CardNuts />
    </article>
  );
}

export function FabricaModelShowcase() {
  return (
    <section className="bg-bg-dark pt-32 pb-24 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map((model) => (
            <ModelCard key={model.asset.src} name={model.name} asset={model.asset} />
          ))}
        </div>
      </Container>
    </section>
  );
}
