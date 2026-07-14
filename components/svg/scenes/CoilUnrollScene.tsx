interface CoilUnrollSceneProps {
  className?: string;
}

export function CoilUnrollScene({ className }: CoilUnrollSceneProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      stroke="var(--abs-line-art)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Coil — concentric arcs suggesting spiral cross-section */}
      <path className="abs-path" d="M80 100 A50 50 0 1 1 80.01 100" />
      <path className="abs-path" d="M80 100 A40 40 0 1 1 80.01 100" />
      <path className="abs-path" d="M80 100 A30 30 0 1 1 80.01 100" />
      <path className="abs-path" d="M80 100 A20 20 0 1 1 80.01 100" />
      <circle className="abs-path" cx="80" cy="100" r="8" />
      {/* Unrolling strip */}
      <path className="abs-path" d="M130 90 L380 90" />
      <path className="abs-path" d="M130 110 L380 110" />
      {/* Direction arrow */}
      <path className="abs-path" d="M360 84 L382 100 L360 116" />
      {/* Width callout markers */}
      <line className="abs-path" x1="240" y1="74" x2="240" y2="90" />
      <line className="abs-path" x1="330" y1="74" x2="330" y2="90" />
      <line className="abs-path" x1="240" y1="80" x2="330" y2="80" />
      <line className="abs-path" x1="236" y1="76" x2="244" y2="76" />
      <line className="abs-path" x1="326" y1="76" x2="334" y2="76" />
      {/* Coil stand */}
      <line className="abs-path" x1="58" y1="155" x2="102" y2="155" />
      <line className="abs-path" x1="63" y1="155" x2="53" y2="182" />
      <line className="abs-path" x1="97" y1="155" x2="107" y2="182" />
      <line className="abs-path" x1="48" y1="182" x2="112" y2="182" />
    </svg>
  );
}
