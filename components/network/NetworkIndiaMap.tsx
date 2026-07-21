import { INDIA_STATE_PATHS, INDIA_MAP_VIEWBOX } from '@/components/network/indiaStatePaths';
import { NETWORK_STATES } from '@/data/network';
import { cn } from '@/lib/utils';

interface NetworkIndiaMapProps {
  selected: string;
  onSelect: (slug: string) => void;
  className?: string;
}

export function NetworkIndiaMap({ selected, onSelect, className }: NetworkIndiaMapProps) {
  return (
    <svg
      viewBox={INDIA_MAP_VIEWBOX}
      fill="none"
      role="img"
      aria-label="Map of India"
      className={className}
    >
      <image href="/india-map.svg" width="2500" height="2843" className="light:hidden" />
      <image
        href="/india-map-light.svg"
        width="2500"
        height="2843"
        className="hidden light:inline"
      />

      {NETWORK_STATES.map((state) => {
        const d = INDIA_STATE_PATHS[state.slug];
        if (!d) return null;
        const isActive = state.slug === selected;
        return (
          <path
            key={state.slug}
            d={d}
            onClick={() => onSelect(state.slug)}
            role="button"
            aria-pressed={isActive}
            aria-label={state.name}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(state.slug);
            }}
            stroke="var(--color-abs-blue)"
            strokeWidth={isActive ? 10 : 0}
            className={cn(
              'cursor-pointer fill-abs-blue/0 transition-[fill,stroke-width] duration-300 outline-none hover:fill-abs-blue/30',
              isActive && 'fill-abs-blue/55',
            )}
          />
        );
      })}
    </svg>
  );
}
