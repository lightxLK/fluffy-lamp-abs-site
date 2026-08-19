import { render, screen } from '@testing-library/react';
import { TrustBar } from '@/components/sections/TrustBar';
import { BrandTrustBar } from '@/components/sections/BrandTrustBar';

describe('TrustBar', () => {
  it('renders stat text', () => {
    render(<TrustBar />);
    expect(screen.getAllByText(/50 Years/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/427 Dealers/i).length).toBeGreaterThan(0);
  });
});

describe('BrandTrustBar', () => {
  it('renders supplier logos', () => {
    render(<BrandTrustBar />);
    expect(screen.getAllByAltText(/SAIL/i).length).toBeGreaterThan(0);
    expect(screen.getAllByAltText(/Jindal Steel/i).length).toBeGreaterThan(0);
  });
});
