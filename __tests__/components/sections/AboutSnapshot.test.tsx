import { render, screen } from '@testing-library/react';
import { AboutSnapshot } from '@/components/sections/AboutSnapshot';
import { FabricaTeaser } from '@/components/sections/FabricaTeaser';

jest.mock('@/components/animations/DrawSVGSection', () => ({
  DrawSVGSection: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

describe('AboutSnapshot', () => {
  it('renders section heading', () => {
    render(<AboutSnapshot />);
    expect(screen.getByRole('heading', { name: /50 years/i })).toBeInTheDocument();
  });

  it('renders Our Story link', () => {
    render(<AboutSnapshot />);
    expect(screen.getByRole('link', { name: /our story/i })).toBeInTheDocument();
  });
});

describe('FabricaTeaser', () => {
  it('renders Fabrica heading', () => {
    render(<FabricaTeaser />);
    expect(screen.getByRole('heading', { name: /fabrica/i })).toBeInTheDocument();
  });

  it('renders Discover Fabrica link', () => {
    render(<FabricaTeaser />);
    expect(screen.getByRole('link', { name: /discover fabrica/i })).toBeInTheDocument();
  });
});
