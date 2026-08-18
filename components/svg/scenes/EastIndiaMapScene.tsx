interface EastIndiaMapSceneProps {
  className?: string;
}

// Plate-carrée projection onto 2500×2843 SVG space
// x = (lon − 68) / 30 × 2500   y = (37 − lat) / 29 × 2843
const HQ = { cx: 1691, cy: 1411 }; // Howrah / West Bengal

const NODES = [
  { cx: 1079, cy: 995, label: 'Lucknow' }, // Uttar Pradesh
  { cx: 1425, cy: 1117, label: 'Patna' }, // Bihar
  { cx: 1441, cy: 1344, label: 'Ranchi' }, // Jharkhand
  { cx: 1483, cy: 1638, label: 'Bhubaneswar' }, // Odisha
  { cx: 1975, cy: 1063, label: 'Dispur' }, // Assam
  { cx: 1941, cy: 1296, label: 'Agartala' }, // Tripura
];

export function EastIndiaMapScene({ className }: EastIndiaMapSceneProps) {
  return (
    <svg viewBox="0 0 2500 2843" fill="none" aria-hidden="true" className={className}>
      {/* Actual India map — WB bright blue, 6 states mid-blue, rest faded.
          Baked-in line colors can't inherit CSS vars, so swap per theme. */}
      <image href="/india-map.svg" width="2500" height="2843" className="light:hidden" />
      <image
        href="/india-map-light.svg"
        width="2500"
        height="2843"
        className="hidden light:inline"
      />

      {/* Dashed connection lines from HQ */}
      {NODES.map((n) => (
        <line
          key={n.label}
          className="abs-path"
          x1={HQ.cx}
          y1={HQ.cy}
          x2={n.cx}
          y2={n.cy}
          stroke="var(--abs-line-art)"
          strokeOpacity="0.35"
          strokeWidth="7"
          strokeDasharray="24 16"
        />
      ))}

      {/* Dealer nodes */}
      {NODES.map((n) => (
        <circle
          key={n.label}
          className="abs-path"
          cx={n.cx}
          cy={n.cy}
          r="22"
          fill="var(--abs-line-art)"
        />
      ))}

      {/* HQ node — Howrah (outer ring + filled centre) */}
      <circle
        className="abs-path"
        cx={HQ.cx}
        cy={HQ.cy}
        r="36"
        stroke="var(--abs-line-art)"
        strokeWidth="7"
      />
      <circle cx={HQ.cx} cy={HQ.cy} r="18" fill="var(--abs-line-art)" />
    </svg>
  );
}
