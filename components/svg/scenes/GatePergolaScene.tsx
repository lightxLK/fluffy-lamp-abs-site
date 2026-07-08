import { FABRICA_PATH } from './fabricaPath';

interface GatePergolaSceneProps {
  className?: string;
}

export function GatePergolaScene({ className }: GatePergolaSceneProps) {
  return (
    <svg
      viewBox="0 0 1024 663"
      fill="none"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path className="abs-path" d={FABRICA_PATH} />
    </svg>
  );
}
