import { SPL_SCENE_PATHS } from './splScenePaths';

interface SPLSceneProps {
  className?: string;
}

// Source art is potrace output baked at 10x (see the g transform below), so
// stroke width is scaled up to compensate — same reasoning as
// PRODUCT_ICON_STROKE_SCALE in productIconPaths.ts.
const STROKE_WIDTH = 16;

export function SPLScene({ className }: SPLSceneProps) {
  return (
    <svg viewBox="0 0 1600 900" aria-hidden="true" className={className}>
      <g
        transform="translate(0,900) scale(0.1,-0.1)"
        fill="var(--abs-line-art)"
        stroke="var(--abs-line-art)"
      >
        {SPL_SCENE_PATHS.map((d, i) => (
          <path
            key={i}
            className="abs-path"
            d={d}
            fillOpacity={0}
            strokeWidth={STROKE_WIDTH}
            fillRule="evenodd"
          />
        ))}
      </g>
    </svg>
  );
}
