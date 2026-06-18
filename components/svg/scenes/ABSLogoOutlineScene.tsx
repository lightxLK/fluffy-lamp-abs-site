interface ABSLogoOutlineSceneProps {
  className?: string;
}

export function ABSLogoOutlineScene({ className }: ABSLogoOutlineSceneProps) {
  return (
    <svg
      viewBox="0 0 300 120"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* A */}
      <path className="abs-path" d="M10 100 L40 20 L70 100" />
      <line className="abs-path" x1="22" y1="70" x2="58" y2="70" />
      {/* B */}
      <line className="abs-path" x1="90" y1="20" x2="90" y2="100" />
      <path className="abs-path" d="M90 20 L114 20 Q134 20 134 40 Q134 60 90 60" />
      <path className="abs-path" d="M90 60 L118 60 Q142 60 142 80 Q142 100 90 100" />
      {/* S */}
      <path
        className="abs-path"
        d="M222 30 Q222 20 202 20 L176 20 Q156 20 156 40 Q156 60 176 60
           L202 60 Q222 60 222 80 Q222 100 202 100 L176 100 Q156 100 156 90"
      />
    </svg>
  );
}
