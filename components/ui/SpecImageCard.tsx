import Image from 'next/image';

interface SpecImageCardProps {
  name: string;
  image: string;
  specs: string[];
  imagePadding?: string;
  imageObjectPosition?: string;
  textAlign?: string;
}

export function SpecImageCard({
  name,
  image,
  specs,
  imagePadding = 'p-4',
  imageObjectPosition = 'object-center',
  textAlign = 'text-left',
}: SpecImageCardProps) {
  return (
    <div className="h-full">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-contain ${imageObjectPosition} ${imagePadding}`}
        />
      </div>
      <div className={`p-8 pt-4 ${textAlign}`}>
        <h3 className="text-text-primary font-semibold text-lg mb-4">{name}</h3>
        <ul className="space-y-2">
          {specs.map((s) => (
            <li key={s} className="text-text-muted text-sm leading-relaxed">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
