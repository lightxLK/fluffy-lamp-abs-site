import { render } from '@testing-library/react';
import { CardGlow } from '@/components/ui/CardGlow';

describe('CardGlow', () => {
  it('always includes pointer-events-auto on its root, even with a custom className', () => {
    const { container } = render(<CardGlow className="h-full p-8">content</CardGlow>);
    expect(container.firstChild).toHaveClass('pointer-events-auto');
    expect(container.firstChild).toHaveClass('h-full');
  });
});
