interface CSRShelterSceneProps {
  className?: string;
}

export function CSRShelterScene({ className }: CSRShelterSceneProps) {
  return (
    <svg
      viewBox="0 0 500 260"
      fill="none"
      stroke="var(--abs-line-art)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Modular PPGL shelter, pitched roof */}
      <path className="abs-path" d="M60 150 L150 90 L240 150" />
      <rect className="abs-path" x="75" y="150" width="150" height="80" />
      <path className="abs-path" d="M60 150 L60 168" />
      <path className="abs-path" d="M240 150 L240 168" />
      <line className="abs-path" x1="150" y1="90" x2="150" y2="150" strokeDasharray="2 4" />
      {/* Entrance arch */}
      <path className="abs-path" d="M115 230 L115 190 A35 35 0 0 1 185 190 L185 230" />

      {/* Paw print, floating above the shelter */}
      <circle className="abs-path" cx="330" cy="70" r="16" />
      <circle className="abs-path" cx="304" cy="48" r="8" />
      <circle className="abs-path" cx="330" cy="38" r="8" />
      <circle className="abs-path" cx="356" cy="48" r="8" />

      {/* Care heart, orbiting connector */}
      <path
        className="abs-path"
        d="M415 130 C415 118, 400 118, 400 130 C400 140, 415 150, 415 158 C415 150, 430 140, 430 130 C430 118, 415 118, 415 130 Z"
      />
      <path className="abs-path" d="M240 150 Q330 190 400 145" strokeDasharray="2 5" />

      <line className="abs-path" x1="0" y1="230" x2="500" y2="230" strokeDasharray="2 4" />
    </svg>
  );
}
