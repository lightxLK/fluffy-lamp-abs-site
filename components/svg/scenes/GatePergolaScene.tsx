interface GatePergolaSceneProps {
  className?: string;
}

export function GatePergolaScene({ className }: GatePergolaSceneProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Gate posts */}
      <rect className="abs-path" x="20" y="60" width="20" height="220" />
      <rect className="abs-path" x="200" y="60" width="20" height="220" />
      {/* Gate header */}
      <rect className="abs-path" x="20" y="60" width="200" height="14" />
      {/* Finials */}
      {([35, 60, 85, 110, 135, 160, 185] as number[]).map((x) => (
        <path key={`fin-${x}`} className="abs-path" d={`M${x} 60 L${x + 5} 42 L${x + 10} 60`} />
      ))}
      {/* Gate bars */}
      {([40, 65, 90, 115, 140, 165, 190] as number[]).map((x) => (
        <line key={`bar-${x}`} className="abs-path" x1={x + 5} y1="74" x2={x + 5} y2="280" />
      ))}
      {/* Gate rails */}
      <line className="abs-path" x1="20" y1="130" x2="220" y2="130" />
      <line className="abs-path" x1="20" y1="220" x2="220" y2="220" />
      {/* Pergola posts */}
      <line className="abs-path" x1="260" y1="100" x2="260" y2="280" />
      <line className="abs-path" x1="360" y1="100" x2="360" y2="280" />
      {/* Pergola rafters */}
      {([100, 128, 156, 184, 212] as number[]).map((y) => (
        <line key={`raf-${y}`} className="abs-path" x1="245" y1={y} x2="375" y2={y} />
      ))}
      {/* Pergola beam */}
      <line className="abs-path" x1="245" y1="95" x2="375" y2="95" />
      {/* Pergola bracing */}
      <line className="abs-path" x1="260" y1="100" x2="360" y2="215" />
      <line className="abs-path" x1="360" y1="100" x2="260" y2="215" />
      {/* Floor */}
      <line className="abs-path" x1="0" y1="285" x2="400" y2="285" />
    </svg>
  );
}
