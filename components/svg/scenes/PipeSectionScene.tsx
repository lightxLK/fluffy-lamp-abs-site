interface PipeSectionSceneProps {
  className?: string;
}

export function PipeSectionScene({ className }: PipeSectionSceneProps) {
  return (
    <svg
      viewBox="0 0 500 200"
      fill="none"
      stroke="var(--abs-line-art)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Round pipe cross-section */}
      <circle className="abs-path" cx="90" cy="100" r="60" />
      <circle className="abs-path" cx="90" cy="100" r="48" />
      <line className="abs-path" x1="90" y1="40" x2="90" y2="52" strokeDasharray="2 3" />
      <line className="abs-path" x1="138" y1="100" x2="150" y2="100" />
      <path className="abs-path" d="M138 100 Q144 100 144 94" />
      <line className="abs-path" x1="150" y1="92" x2="150" y2="108" />

      {/* Square pipe cross-section */}
      <rect className="abs-path" x="220" y="40" width="120" height="120" />
      <rect className="abs-path" x="234" y="54" width="92" height="92" />
      <line className="abs-path" x1="220" y1="30" x2="220" y2="40" />
      <line className="abs-path" x1="340" y1="30" x2="340" y2="40" />
      <line className="abs-path" x1="220" y1="34" x2="340" y2="34" />

      {/* RHS pipe cross-section */}
      <rect className="abs-path" x="390" y="60" width="90" height="60" />
      <rect className="abs-path" x="402" y="72" width="66" height="36" />
      <line className="abs-path" x1="480" y1="60" x2="492" y2="60" />
      <line className="abs-path" x1="480" y1="120" x2="492" y2="120" />
      <line className="abs-path" x1="490" y1="60" x2="490" y2="120" />

      {/* Ground reference */}
      <line className="abs-path" x1="0" y1="180" x2="500" y2="180" strokeDasharray="2 4" />
    </svg>
  );
}
