import { render, screen } from '@testing-library/react';
import { NetworkSection } from '@/components/sections/NetworkSection';

jest.mock('@/components/animations/DrawSVGSection', () => ({
  DrawSVGSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('NetworkSection', () => {
  it('renders section heading', () => {
    render(<NetworkSection />);
    expect(screen.getByRole('heading', { name: /our network/i })).toBeInTheDocument();
  });

  it('renders stat labels', () => {
    render(<NetworkSection />);
    expect(screen.getByText(/Dealers/i)).toBeInTheDocument();
    expect(screen.getByText(/States/i)).toBeInTheDocument();
  });
});
