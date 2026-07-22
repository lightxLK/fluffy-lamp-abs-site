interface AutomationLineSceneProps {
  className?: string;
}

export function AutomationLineScene({ className }: AutomationLineSceneProps) {
  return (
    <svg
      viewBox="0 0 560 260"
      fill="none"
      stroke="var(--abs-line-art)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Feed coil */}
      <circle className="abs-path" cx="60" cy="150" r="42" />
      <circle className="abs-path" cx="60" cy="150" r="30" />
      <circle className="abs-path" cx="60" cy="150" r="18" />

      {/* Roll-forming line: conveyor with rollers */}
      <line className="abs-path" x1="102" y1="150" x2="440" y2="150" />
      {[150, 210, 270, 330, 390].map((cx) => (
        <circle key={cx} className="abs-path" cx={cx} cy="150" r="14" />
      ))}
      <line className="abs-path" x1="102" y1="192" x2="440" y2="192" strokeDasharray="2 4" />

      {/* PET strap bundle at line-end */}
      <rect className="abs-path" x="450" y="120" width="60" height="60" />
      <line className="abs-path" x1="450" y1="140" x2="510" y2="140" />
      <line className="abs-path" x1="450" y1="160" x2="510" y2="160" />

      {/* IoT monitoring signal above the line */}
      <circle className="abs-path" cx="270" cy="60" r="4" fill="var(--abs-line-art)" />
      <path className="abs-path" d="M270 60 m-16 0 a16 16 0 1 1 32 0" />
      <path className="abs-path" d="M270 60 m-28 0 a28 28 0 1 1 56 0" />
      <line className="abs-path" x1="270" y1="94" x2="270" y2="136" strokeDasharray="2 4" />

      <line className="abs-path" x1="0" y1="230" x2="560" y2="230" strokeDasharray="2 4" />
    </svg>
  );
}
