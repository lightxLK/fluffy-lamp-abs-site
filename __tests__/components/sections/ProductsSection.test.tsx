import { render, screen } from '@testing-library/react';
import { ProductsSection } from '@/components/sections/ProductsSection';

describe('ProductsSection', () => {
  it('renders all 7 products', () => {
    render(<ProductsSection />);
    expect(screen.getByText('Rolling Shutter Gates')).toBeInTheDocument();
    expect(screen.getByText('Shutter Accessories')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pipes' })).toBeInTheDocument();
    expect(screen.getByText('Roofing Sheets')).toBeInTheDocument();
    expect(screen.getByText('Plain Sheets')).toBeInTheDocument();
    expect(screen.getByText('Slit & Pencil Coils')).toBeInTheDocument();
    expect(screen.getByText('Cutting & Grinding Wheels')).toBeInTheDocument();
  });

  it('each card links to its product page', () => {
    render(<ProductsSection />);
    expect(screen.getByRole('link', { name: /rolling shutter gates/i })).toHaveAttribute(
      'href',
      '/products/shutter',
    );
  });

  it('renders section heading', () => {
    render(<ProductsSection />);
    expect(screen.getByRole('heading', { name: /what we make/i })).toBeInTheDocument();
  });
});
