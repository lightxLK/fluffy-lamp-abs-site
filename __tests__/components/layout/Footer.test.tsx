import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders company name', () => {
    render(<Footer />);
    expect(screen.getAllByText(/anil balaji steel/i).length).toBeGreaterThan(0);
  });

  it('renders contact phone number', () => {
    render(<Footer />);
    expect(screen.getByText(/90072 11599/)).toBeInTheDocument();
  });

  it('renders contact email', () => {
    render(<Footer />);
    expect(screen.getByText(/viren@anilbalajisteel\.com/)).toBeInTheDocument();
  });

  it('renders all company nav links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /careers/i })).toBeInTheDocument();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
