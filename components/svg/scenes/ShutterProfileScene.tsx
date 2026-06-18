interface ShutterProfileSceneProps {
  className?: string;
}

export function ShutterProfileScene({ className }: ShutterProfileSceneProps) {
  return (
    <svg
      viewBox="0 0 500 100"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Flat profile — lath + interlocking hooks */}
      <rect className="abs-path" x="10" y="35" width="70" height="18" />
      <path className="abs-path" d="M10 35 Q10 22 22 22 L68 22 Q80 22 80 35" />
      <path className="abs-path" d="M10 53 Q10 66 22 66 L68 66 Q80 66 80 53" />

      {/* Round profile */}
      <rect className="abs-path" x="110" y="35" width="70" height="18" rx="9" />
      <path className="abs-path" d="M110 35 Q110 22 122 22 L168 22 Q180 22 180 35" />
      <path className="abs-path" d="M110 53 Q110 66 122 66 L168 66 Q180 66 180 53" />

      {/* Diamond profile */}
      <path className="abs-path" d="M210 35 L245 42 L280 35 L245 28 Z" />
      <path className="abs-path" d="M210 53 L245 60 L280 53 L245 46 Z" />
      <line className="abs-path" x1="210" y1="35" x2="210" y2="53" />
      <line className="abs-path" x1="280" y1="35" x2="280" y2="53" />

      {/* Gear profile */}
      <path
        className="abs-path"
        d="M310 33 L320 30 L330 33 L340 30 L350 33 L360 30 L370 33 L380 30 L380 53 L370 56 L360 53 L350 56 L340 53 L330 56 L320 53 L310 56 Z"
      />
      <path className="abs-path" d="M310 20 Q310 14 316 14 L374 14 Q380 14 380 20" />
      <path className="abs-path" d="M310 69 Q310 75 316 75 L374 75 Q380 75 380 69" />

      {/* Perforated profile */}
      <rect className="abs-path" x="410" y="32" width="80" height="24" />
      <circle className="abs-path" cx="428" cy="44" r="5" />
      <circle className="abs-path" cx="450" cy="44" r="5" />
      <circle className="abs-path" cx="472" cy="44" r="5" />
      <path className="abs-path" d="M410 32 Q410 20 420 20 L470 20 Q480 20 480 32" />
      <path className="abs-path" d="M410 56 Q410 68 420 68 L470 68 Q480 68 480 56" />

      {/* Shared: ground reference line */}
      <line className="abs-path" x1="0" y1="90" x2="500" y2="90" strokeDasharray="2 4" />
    </svg>
  );
}
