import Image from 'next/image';

const BRANDS = [
  { name: 'SAIL', src: '/Client Logo/sail.png' },
  { name: 'APL Apollo', src: '/Client Logo/apollo.png' },
  { name: 'Nezone', src: '/Client Logo/nezone-bl.png' },
  { name: 'JSW Steel', src: '/Client Logo/jsw.png' },
  { name: 'Jindal Steel', src: '/Client Logo/jindal.png' },
];

const REPEAT = 4;

export function BrandTrustBar() {
  return (
    <section
      className="py-14 bg-bg-dark border-y border-border-subtle overflow-hidden"
      aria-label="Our steel suppliers"
    >
      <p className="text-center text-text-muted text-xs uppercase tracking-widest mb-8">
        Sourced from India&apos;s finest steel mills
      </p>
      <div className="flex w-full overflow-hidden [--gap:4rem] [--duration:22s] gap-(--gap) marquee-mask">
        {Array.from({ length: REPEAT }).map((_, g) => (
          <div
            key={g}
            aria-hidden={g > 0}
            className="flex shrink-0 items-center gap-(--gap) whitespace-nowrap animate-canopy-x"
          >
            {BRANDS.map((brand) => (
              <span
                key={brand.name}
                className="flex h-24 w-48 items-center justify-center shrink-0"
              >
                <Image
                  src={encodeURI(brand.src)}
                  alt={brand.name}
                  width={192}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
