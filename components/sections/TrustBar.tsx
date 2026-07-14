const STATS = [
  '50 Years',
  '250+ Dealers',
  '1,00,000 MT Capacity',
  '85% West Bengal',
  '70+ Professionals',
];

const REPEAT = 4;

export function TrustBar() {
  return (
    <section
      className="bg-bg-card border-y border-border-subtle overflow-hidden py-5"
      aria-label="Trust statistics"
    >
      <div className="flex w-full overflow-hidden [--gap:4rem] [--duration:28s] gap-(--gap) marquee-mask">
        {Array.from({ length: REPEAT }).map((_, g) => (
          <div
            key={g}
            aria-hidden={g > 0}
            className="flex shrink-0 gap-(--gap) whitespace-nowrap animate-canopy-x"
          >
            {STATS.map((stat) => (
              <span
                key={stat}
                className="text-text-muted text-xs font-medium uppercase tracking-widest flex items-center gap-4"
              >
                {stat}
                <span
                  className="w-1 h-1 rounded-full bg-abs-blue inline-block"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
