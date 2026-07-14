interface FactoryFloorSceneProps {
  className?: string;
}

export function FactoryFloorScene({ className }: FactoryFloorSceneProps) {
  return (
    <svg
      viewBox="0 0 600 300"
      fill="none"
      stroke="var(--abs-line-art)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Building boundary */}
      <rect className="abs-path" x="10" y="10" width="580" height="280" />
      {/* Column grid */}
      {([80, 200, 320, 440, 520] as number[]).flatMap((x) =>
        ([50, 150, 250] as number[]).map((y) => (
          <circle key={`col-${x}-${y}`} className="abs-path" cx={x} cy={y} r="4" />
        )),
      )}
      {/* Rolling mill block */}
      <rect className="abs-path" x="50" y="80" width="120" height="60" />
      <line className="abs-path" x1="50" y1="110" x2="170" y2="110" />
      <ellipse className="abs-path" cx="75" cy="110" rx="12" ry="8" />
      <ellipse className="abs-path" cx="110" cy="110" rx="12" ry="8" />
      <ellipse className="abs-path" cx="145" cy="110" rx="12" ry="8" />
      {/* Press block */}
      <rect className="abs-path" x="220" y="60" width="100" height="80" />
      <rect className="abs-path" x="240" y="80" width="60" height="40" />
      {/* Slitter block */}
      <rect className="abs-path" x="370" y="70" width="80" height="70" />
      <line className="abs-path" x1="370" y1="105" x2="450" y2="105" />
      <circle className="abs-path" cx="390" cy="105" r="10" />
      <circle className="abs-path" cx="430" cy="105" r="10" />
      {/* Coiler block */}
      <rect className="abs-path" x="490" y="80" width="80" height="60" />
      <circle className="abs-path" cx="530" cy="110" r="22" />
      <circle className="abs-path" cx="530" cy="110" r="8" />
      {/* Conveyor lines */}
      <line className="abs-path" x1="170" y1="110" x2="220" y2="110" strokeDasharray="6 4" />
      <line className="abs-path" x1="320" y1="105" x2="370" y2="105" strokeDasharray="6 4" />
      <line className="abs-path" x1="450" y1="105" x2="490" y2="110" strokeDasharray="6 4" />
      {/* Worker position dots */}
      <circle className="abs-path" cx="195" cy="130" r="5" />
      <circle className="abs-path" cx="345" cy="90" r="5" />
      <circle className="abs-path" cx="465" cy="130" r="5" />
      <circle className="abs-path" cx="530" cy="170" r="5" />
      {/* Storage racks */}
      <rect className="abs-path" x="50" y="200" width="200" height="60" />
      <line className="abs-path" x1="50" y1="220" x2="250" y2="220" />
      <line className="abs-path" x1="50" y1="240" x2="250" y2="240" />
      <line className="abs-path" x1="100" y1="200" x2="100" y2="260" />
      <line className="abs-path" x1="150" y1="200" x2="150" y2="260" />
      <line className="abs-path" x1="200" y1="200" x2="200" y2="260" />
      {/* Office block */}
      <rect className="abs-path" x="400" y="200" width="170" height="70" />
      <rect className="abs-path" x="415" y="215" width="30" height="20" />
      <rect className="abs-path" x="460" y="215" width="30" height="20" />
      <rect className="abs-path" x="505" y="215" width="30" height="20" />
    </svg>
  );
}
