import Image from 'next/image';

const CORNER_POSITIONS = [
  'top-1.5 left-1.5',
  'top-1.5 right-1.5',
  'bottom-1.5 left-1.5',
  'bottom-1.5 right-1.5',
];

const SIZES = {
  lg: { src: '/nut.png', px: 20 },
  sm: { src: '/small-bolt.png', px: 14 },
} as const;

interface CardNutsProps {
  /** 'lg' for content-heavy cards, 'sm' for short/light cards. Defaults to 'lg'. */
  size?: 'lg' | 'sm';
}

/** Decorative bolt heads for the four corners of a fixed (non-navigational) card. */
export function CardNuts({ size = 'lg' }: CardNutsProps) {
  const { src, px } = SIZES[size];

  return (
    <>
      {CORNER_POSITIONS.map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} z-10 block pointer-events-none select-none`}
          style={{
            width: px,
            height: px,
            filter:
              'drop-shadow(0 1px 1px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          }}
        >
          <Image src={src} alt="" width={px} height={px} className="block h-full w-full" />
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/steel-texture.webp)',
              backgroundSize: '128px 128px',
              maskImage: `url(${src})`,
              WebkitMaskImage: `url(${src})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              mixBlendMode: 'soft-light',
              opacity: 0.6,
            }}
          />
        </span>
      ))}
    </>
  );
}
