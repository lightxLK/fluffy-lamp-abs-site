interface FurnaceSceneProps {
  className?: string;
}

export function FurnaceScene({ className }: FurnaceSceneProps) {
  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Ladle body */}
      <path className="abs-path" d="M80 80 L60 220 Q80 240 160 240 Q240 240 260 220 L240 80 Z" />
      {/* Ladle trunnion left */}
      <line className="abs-path" x1="60" y1="120" x2="30" y2="120" />
      <circle className="abs-path" cx="22" cy="120" r="8" />
      {/* Ladle trunnion right */}
      <line className="abs-path" x1="260" y1="120" x2="290" y2="120" />
      <circle className="abs-path" cx="298" cy="120" r="8" />
      {/* Pour spout */}
      <path className="abs-path" d="M60 220 Q40 260 20 300" />
      <path className="abs-path" d="M20 300 L10 340 M20 300 L30 340" />
      {/* Mold */}
      <rect className="abs-path" x="10" y="340" width="60" height="50" />
      <line className="abs-path" x1="10" y1="355" x2="70" y2="355" />
      {/* Heat shimmer */}
      <path className="abs-path" d="M120 60 Q125 40 120 20" strokeDasharray="4 4" />
      <path className="abs-path" d="M160 50 Q165 30 160 10" strokeDasharray="4 4" />
      <path className="abs-path" d="M200 60 Q205 40 200 20" strokeDasharray="4 4" />
      {/* Overhead crane */}
      <line className="abs-path" x1="0" y1="40" x2="320" y2="40" />
      <line className="abs-path" x1="140" y1="40" x2="140" y2="80" />
      <line className="abs-path" x1="180" y1="40" x2="180" y2="80" />
      {/* Floor */}
      <line className="abs-path" x1="0" y1="395" x2="320" y2="395" />
      {/* Height callout */}
      <line className="abs-path" x1="270" y1="80" x2="310" y2="80" strokeDasharray="2 2" />
      <line className="abs-path" x1="270" y1="240" x2="310" y2="240" strokeDasharray="2 2" />
      <line className="abs-path" x1="308" y1="80" x2="308" y2="240" />
      <line className="abs-path" x1="304" y1="80" x2="312" y2="80" />
      <line className="abs-path" x1="304" y1="240" x2="312" y2="240" />
    </svg>
  );
}
