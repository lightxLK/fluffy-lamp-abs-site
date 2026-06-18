import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/HeroSection';

jest.mock('@/components/animations/SplitTextReveal', () => ({
  SplitTextReveal: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [() => {}, null],
}));

jest.mock('embla-carousel-autoplay', () => ({
  __esModule: true,
  default: () => ({ destroy: jest.fn() }),
}));

describe('HeroSection', () => {
  it('renders the first slide headline', () => {
    render(<HeroSection />);
    expect(screen.getByText(/India's Most Trusted Steel/i)).toBeInTheDocument();
  });

  it('renders 3 slide navigation buttons', () => {
    render(<HeroSection />);
    expect(screen.getAllByRole('button', { name: /slide/i }).length).toBe(3);
  });

  it('renders primary CTA link', () => {
    render(<HeroSection />);
    expect(screen.getByRole('link', { name: /explore products/i })).toBeInTheDocument();
  });
});
