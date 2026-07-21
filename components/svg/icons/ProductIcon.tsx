import { PRODUCT_ICON_PATHS, PRODUCT_ICON_VIEWBOX } from './productIconPaths';

interface ProductIconProps {
  slug: string;
  className?: string;
  variant?: 'fill' | 'stroke';
}

const VIEWBOX = '0 0 384 384';

// Multi-layer shaded illustration rather than a single-color line path — doesn't
// fit the currentColor fill/stroke system below, so it's served as a static asset.
// Inverted in dark theme since it's drawn in black.
const RASTER_ICONS: Record<string, string> = {
  coils: '/products/coils/steel-coil.svg',
};

export function ProductIcon({ slug, className, variant = 'fill' }: ProductIconProps) {
  const rasterSrc = RASTER_ICONS[slug];
  if (rasterSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static SVG asset, not a next/image candidate
      <img
        src={rasterSrc}
        alt=""
        aria-hidden="true"
        className={`${className ?? ''} object-contain invert light:invert-0`}
      />
    );
  }

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
