import { PRODUCT_ICON_PATHS, PRODUCT_ICON_VIEWBOX } from './productIconPaths';
import { CoilsIcon } from './CoilsIcon';

interface ProductIconProps {
  slug: string;
  className?: string;
  variant?: 'fill' | 'stroke';
}

const VIEWBOX = '0 0 384 384';

// Multi-layer shaded illustration rather than a single-color line path — doesn't
// fit the currentColor fill/stroke system below, so it renders via its own
// component. Its paths still carry the .abs-path class and a stroke so the
// same DrawSVG hover animation other product icons get still applies.
const CUSTOM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  coils: CoilsIcon,
};

export function ProductIcon({ slug, className, variant = 'fill' }: ProductIconProps) {
  const CustomIcon = CUSTOM_ICONS[slug];
  if (CustomIcon) return <CustomIcon className={className} />;

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
