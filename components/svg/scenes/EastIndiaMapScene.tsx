interface EastIndiaMapSceneProps {
  className?: string;
}

export function EastIndiaMapScene({ className }: EastIndiaMapSceneProps) {
  return (
    <svg
      viewBox="0 0 500 520"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/*
        Coordinate mapping (lon/lat → x/y):
          x = (lon - 79) × 28
          y = (29 - lat) × 35
        Key anchors:
          83°E = 112,  88°E = 252,  89.5°E = 294,  96°E = 476
          27.5°N = 52, 24°N = 175,  22°N = 245,    21.5°N = 263, 17.5°N = 402
      */}
      {/* Bihar — 83–88.5°E, 24–27.5°N */}
      <path
        className="abs-path"
        d="M112 52 L252 52 L262 68 L258 140 L248 165 L225 175 L200 172 L175 175
           L152 170 L130 165 L112 148 L108 90 Z"
      />
      {/* Jharkhand — 83–87.5°E, 21.5–24°N */}
      <path
        className="abs-path"
        d="M112 148 L130 165 L152 170 L175 175 L200 172 L225 175 L238 180
           L230 230 L215 255 L195 268 L168 272 L145 265 L122 252 L105 232
           L100 200 L105 170 Z"
      />
      {/* West Bengal — 85.8–89.5°E, 21.5–27.5°N (elongated N–S strip) */}
      <path
        className="abs-path"
        d="M225 52 L275 52 L290 68 L296 105 L300 145 L298 185 L302 225
           L298 258 L278 278 L255 292 L235 298 L218 288 L210 268 L215 255
           L230 230 L238 180 L225 175 L248 165 L258 140 L262 68 Z"
      />
      {/* Odisha — 81–87°E, 17.5–22.5°N */}
      <path
        className="abs-path"
        d="M56 227 L105 232 L122 252 L145 265 L168 272 L195 268 L210 268
           L218 288 L228 308 L225 345 L212 375 L190 398 L162 408 L135 405
           L108 392 L82 370 L65 342 L58 308 L60 268 Z"
      />
      {/* Assam — 89.5–96°E, 24–28°N */}
      <path
        className="abs-path"
        d="M294 35 L328 28 L382 35 L434 48 L462 62 L468 82 L458 100
           L428 112 L388 118 L348 114 L315 105 L295 88 L290 68 Z"
      />
      {/* Tripura — 91–92.5°E, 22.5–24.5°N */}
      <path
        className="abs-path"
        d="M308 157 L336 148 L354 158 L358 182 L346 200 L322 205 L302 195
           L298 172 Z"
      />
      {/* Siliguri Corridor — thin strip connecting Assam to WB */}
      <rect className="abs-path" x="272" y="52" width="22" height="40" />
      {/* HQ node — Howrah (≈88.3°E, 22.6°N → x=259, y=225) */}
      <circle className="abs-path" cx="259" cy="225" r="8" />
      <circle cx="259" cy="225" r="4" fill="white" />
      {/* Dealer nodes */}
      <circle className="abs-path" cx="250" cy="250" r="5" /> {/* Kolkata */}
      <circle className="abs-path" cx="220" cy="355" r="5" /> {/* Bhubaneswar */}
      <circle className="abs-path" cx="192" cy="88" r="5" /> {/* Patna ~85.1°E,25.6°N */}
      <circle className="abs-path" cx="168" cy="202" r="5" /> {/* Ranchi ~85.3°E,23.3°N */}
      <circle className="abs-path" cx="360" cy="62" r="5" /> {/* Guwahati ~91.7°E,26.1°N */}
      <circle className="abs-path" cx="325" cy="178" r="5" /> {/* Agartala ~91.3°E,23.8°N */}
      {/* Connection lines from HQ (dashed) */}
      <line className="abs-path" x1="259" y1="225" x2="192" y2="88" strokeDasharray="5 4" />
      <line className="abs-path" x1="259" y1="225" x2="168" y2="202" strokeDasharray="5 4" />
      <line className="abs-path" x1="259" y1="225" x2="220" y2="355" strokeDasharray="5 4" />
      <line className="abs-path" x1="259" y1="225" x2="360" y2="62" strokeDasharray="5 4" />
      <line className="abs-path" x1="259" y1="225" x2="325" y2="178" strokeDasharray="5 4" />
    </svg>
  );
}
