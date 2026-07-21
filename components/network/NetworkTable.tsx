import { NETWORK_STATES } from '@/data/network';
import { cn } from '@/lib/utils';

interface NetworkTableProps {
  selected: string;
  onSelect: (slug: string) => void;
}

export function NetworkTable({ selected, onSelect }: NetworkTableProps) {
  return (
    <ul className="flex flex-col gap-3" role="list">
      {NETWORK_STATES.map((state) => {
        const isActive = state.slug === selected;
        return (
          <li key={state.slug}>
            <button
              type="button"
              onClick={() => onSelect(state.slug)}
              aria-pressed={isActive}
              className={cn(
                'relative z-[2] flex w-full items-center justify-between rounded-md px-5 py-4 text-left transition-colors duration-300',
                isActive ? 'bg-abs-blue text-white' : 'bg-bg-card text-text-body hover:bg-bg-mid',
              )}
            >
              <span className={cn('text-sm', isActive && 'font-semibold')}>{state.name}</span>
              <span className={cn('text-sm', isActive && 'font-semibold')}>{state.dealers}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
