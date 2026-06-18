import { render } from '@testing-library/react';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';

describe('DrawSVGSection', () => {
  it('renders children', () => {
    const { container } = render(
      <DrawSVGSection selector=".abs-path">
        <svg>
          <path className="abs-path" d="M0 0 L100 100" />
        </svg>
      </DrawSVGSection>,
    );
    expect(container.querySelector('.abs-path')).toBeInTheDocument();
  });

  it('applies className to wrapper div', () => {
    const { container } = render(
      <DrawSVGSection selector=".abs-path" className="relative">
        <svg />
      </DrawSVGSection>,
    );
    expect(container.firstChild).toHaveClass('relative');
  });
});
