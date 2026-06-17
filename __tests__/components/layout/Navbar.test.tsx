import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/layout/Navbar';

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('Navbar', () => {
  it('renders the ABS logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('ABS')).toBeInTheDocument();
  });

  it('renders all primary nav links', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });

  it('has accessible mobile menu button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });
});
