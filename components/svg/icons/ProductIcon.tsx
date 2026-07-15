import { PRODUCT_ICON_PATHS, PRODUCT_ICON_VIEWBOX } from './productIconPaths';

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

  if (variant === 'stroke') {
    return (
      <svg viewBox={viewBox} fill="none" aria-hidden="true" className={className}>
        <path
          className="abs-path"
          d={path}
          stroke="currentColor"
          strokeWidth="3"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} fillRule="evenodd" />
    </svg>
  );
}
