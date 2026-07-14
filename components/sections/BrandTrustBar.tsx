const BRANDS = ['SAIL', 'JSW Steel', 'Tata Steel', 'Jindal Steel', 'Bhushan Steel', 'Mittal Steel'];

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
      <div className="flex w-full overflow-hidden [--gap:5rem] [--duration:22s] gap-(--gap) marquee-mask">
        {Array.from({ length: REPEAT }).map((_, g) => (
          <div
            key={g}
            aria-hidden={g > 0}
            className="flex shrink-0 gap-(--gap) whitespace-nowrap animate-canopy-x"
          >
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="text-text-muted text-sm font-semibold uppercase tracking-widest"
              >
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
