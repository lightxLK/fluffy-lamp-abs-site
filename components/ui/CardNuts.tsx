import Image from 'next/image';

const CORNER_POSITIONS = [
  'top-1.5 left-1.5',
  'top-1.5 right-1.5',
  'bottom-1.5 left-1.5',
  'bottom-1.5 right-1.5',
];

/** Decorative bolt heads for the four corners of a fixed (non-navigational) card. */
export function CardNuts() {
  return (
    <>
      {CORNER_POSITIONS.map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} z-10 block h-5 w-5 pointer-events-none select-none`}
          style={{
            filter:
              'drop-shadow(0 1px 1px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          }}
        >
          <Image src="/nut.png" alt="" width={20} height={20} className="block" />
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/steel-texture.webp)',
              backgroundSize: '128px 128px',
              maskImage: 'url(/nut.png)',
              WebkitMaskImage: 'url(/nut.png)',
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
