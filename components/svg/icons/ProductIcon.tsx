import {
  PRODUCT_ICON_PATHS,
  PRODUCT_ICON_VIEWBOX,
  PRODUCT_ICON_TRANSFORM,
} from './productIconPaths';

interface ProductIconProps {
  slug: string;
  className?: string;
  variant?: 'fill' | 'stroke';
}

const VIEWBOX = '0 0 384 384';

export function ProductIcon({ slug, className, variant = 'fill' }: ProductIconProps) {
  const path = PRODUCT_ICON_PATHS[slug];
  if (!path) return null;
  const viewBox = PRODUCT_ICON_VIEWBOX[slug] ?? VIEWBOX;
  const transform = PRODUCT_ICON_TRANSFORM[slug];

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
          strokeWidth="3"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} transform={transform} fillRule="evenodd" />
    </svg>
  );
}
