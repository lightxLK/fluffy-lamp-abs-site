interface ConnectorCurvesProps {
  flip?: boolean;
  className?: string;
}

export function ConnectorCurves({ flip, className }: ConnectorCurvesProps) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 overflow-hidden ${className ?? ''}`}
      style={{ height: 120, marginTop: -60, zIndex: 10 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" className="w-full h-full">
        <path
          className="abs-path"
          stroke="var(--abs-line-art)"
          strokeOpacity="0.10"
          strokeWidth="1"
          d={flip ? 'M0 0 C480 120, 960 0, 1440 120' : 'M0 120 C480 0, 960 120, 1440 0'}
        />
        <path
          className="abs-path"
          stroke="var(--abs-line-art)"
          strokeOpacity="0.04"
          strokeWidth="1"
          d={flip ? 'M0 18 C480 105, 960 18, 1440 105' : 'M0 102 C480 18, 960 102, 1440 18'}
        />
      </svg>
    </div>
  );
}
