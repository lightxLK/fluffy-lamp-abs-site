import { PRODUCT_ICON_PATHS } from './productIconPaths';

interface ProductIconProps {
  slug: string;
  className?: string;
  variant?: 'fill' | 'stroke';
}

const VIEWBOX = '0 0 384 384';

export function ProductIcon({ slug, className, variant = 'fill' }: ProductIconProps) {
  const path = PRODUCT_ICON_PATHS[slug];
  if (!path) return null;

  if (variant === 'stroke') {
    return (
      <svg viewBox={VIEWBOX} fill="none" aria-hidden="true" className={className}>
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
    <svg viewBox={VIEWBOX} fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} fillRule="evenodd" />
    </svg>
  );
}
