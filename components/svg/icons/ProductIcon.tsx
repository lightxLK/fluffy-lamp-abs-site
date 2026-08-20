import {
  PRODUCT_ICON_PATHS,
  PRODUCT_ICON_VIEWBOX,
  PRODUCT_ICON_TRANSFORM,
  PRODUCT_ICON_STROKE_SCALE,
  PRODUCT_ICON_FILL_RULE,
} from './productIconPaths';

interface ProductIconProps {
  slug: string;
  className?: string;
  variant?: 'fill' | 'stroke';
  strokeWidth?: number;
}

const VIEWBOX = '0 0 384 384';

export function ProductIcon({
  slug,
  className,
  variant = 'fill',
  strokeWidth = 3,
}: ProductIconProps) {
  const path = PRODUCT_ICON_PATHS[slug];
  if (!path) return null;
  const viewBox = PRODUCT_ICON_VIEWBOX[slug] ?? VIEWBOX;
  const transform = PRODUCT_ICON_TRANSFORM[slug];
  // A transform's scale shrinks stroke width along with the path, so icons
  // whose transform scales down (e.g. potrace output baked at 10x) need
  // their stroke width scaled back up to read at the same weight as icons
  // with no scale in their transform.
  const strokeScale = PRODUCT_ICON_STROKE_SCALE[slug] ?? 1;
  const fillRule = PRODUCT_ICON_FILL_RULE[slug] ?? 'evenodd';

  if (variant === 'stroke') {
    return (
      <svg viewBox={viewBox} aria-hidden="true" className={className}>
        <path
          className="abs-path"
          d={path}
          transform={transform}
          fill="currentColor"
          fillOpacity="0"
          stroke="currentColor"
          strokeWidth={strokeWidth * strokeScale}
          fillRule={fillRule}
        />
      </svg>
    );
  }

  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} transform={transform} fillRule={fillRule} />
    </svg>
  );
}
