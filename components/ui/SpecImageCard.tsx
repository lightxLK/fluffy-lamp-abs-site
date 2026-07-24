import Image from 'next/image';
import { CardGlow } from '@/components/ui/CardGlow';
import { CardNuts } from '@/components/ui/CardNuts';

interface SpecImageCardProps {
  name: string;
  image: string;
  specs: string[];
}

export function SpecImageCard({ name, image, specs }: SpecImageCardProps) {
  return (
    <div className="relative h-full">
      <CardGlow className="h-full overflow-hidden">
        <div className="relative z-[2] aspect-[4/3] bg-[#A5B8C2]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4"
          />
        </div>
        <div className="p-8">
          <h3 className="text-text-primary font-semibold text-lg mb-4">{name}</h3>
          <ul className="space-y-2">
            {specs.map((s) => (
              <li key={s} className="text-text-muted text-sm leading-relaxed">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </CardGlow>
      <CardNuts />
    </div>
  );
}
