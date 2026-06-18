import { render, screen } from '@testing-library/react';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';

describe('SplitTextReveal', () => {
  it('renders children text', () => {
    render(<SplitTextReveal>Steel</SplitTextReveal>);
    expect(screen.getByText('Steel')).toBeInTheDocument();
  });

  it('applies className to wrapper span', () => {
    const { container } = render(<SplitTextReveal className="text-4xl">Steel</SplitTextReveal>);
    expect(container.querySelector('span')).toHaveClass('text-4xl');
  });
});
