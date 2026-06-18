import { render, screen } from '@testing-library/react';
import { ProductsSection } from '@/components/sections/ProductsSection';

describe('ProductsSection', () => {
  it('renders all 7 products', () => {
    render(<ProductsSection />);
    expect(screen.getByText('Rolling Shutter Profiles')).toBeInTheDocument();
    expect(screen.getByText('Steel Coils')).toBeInTheDocument();
    expect(screen.getByText('Flat Bars & Angles')).toBeInTheDocument();
  });

  it('each card links to its product page', () => {
    render(<ProductsSection />);
    expect(screen.getByRole('link', { name: /rolling shutter profiles/i })).toHaveAttribute(
      'href',
      '/products/shutter',
    );
  });

  it('renders section heading', () => {
    render(<ProductsSection />);
    expect(screen.getByRole('heading', { name: /what we make/i })).toBeInTheDocument();
  });
});
