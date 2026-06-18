interface RollingMillSceneProps {
  className?: string;
}

export function RollingMillScene({ className }: RollingMillSceneProps) {
  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Roller pairs */}
      <ellipse className="abs-path" cx="60" cy="130" rx="30" ry="20" />
      <ellipse className="abs-path" cx="60" cy="170" rx="30" ry="20" />
      <ellipse className="abs-path" cx="200" cy="130" rx="30" ry="20" />
      <ellipse className="abs-path" cx="200" cy="170" rx="30" ry="20" />
      <ellipse className="abs-path" cx="340" cy="130" rx="30" ry="20" />
      <ellipse className="abs-path" cx="340" cy="170" rx="30" ry="20" />
      {/* Steel sheet */}
      <line className="abs-path" x1="0" y1="148" x2="480" y2="148" />
      <line className="abs-path" x1="0" y1="152" x2="480" y2="152" />
      {/* Sheet spreading right */}
      <path className="abs-path" d="M370 144 L480 138 M370 156 L480 162" />
      {/* Worker silhouette */}
      <circle className="abs-path" cx="440" cy="200" r="12" />
      <line className="abs-path" x1="440" y1="212" x2="440" y2="255" />
      <line className="abs-path" x1="440" y1="225" x2="420" y2="245" />
      <line className="abs-path" x1="440" y1="225" x2="460" y2="240" />
      <line className="abs-path" x1="440" y1="255" x2="425" y2="280" />
      <line className="abs-path" x1="440" y1="255" x2="455" y2="280" />
      {/* Floor + supports */}
      <line className="abs-path" x1="0" y1="295" x2="480" y2="295" />
      <line className="abs-path" x1="30" y1="108" x2="30" y2="295" />
      <line className="abs-path" x1="90" y1="108" x2="90" y2="295" />
      <line className="abs-path" x1="170" y1="108" x2="170" y2="295" />
      <line className="abs-path" x1="230" y1="108" x2="230" y2="295" />
      <line className="abs-path" x1="310" y1="108" x2="310" y2="295" />
      <line className="abs-path" x1="370" y1="108" x2="370" y2="295" />
      {/* Callout line */}
      <line className="abs-path" x1="200" y1="100" x2="200" y2="80" strokeDasharray="3 3" />
      <line className="abs-path" x1="200" y1="80" x2="280" y2="80" />
    </svg>
  );
}
