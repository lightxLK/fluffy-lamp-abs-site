import { render, screen } from '@testing-library/react';
import { WhyABS } from '@/components/sections/WhyABS';
import { CSRTeaser } from '@/components/sections/CSRTeaser';
import { ContactStrip } from '@/components/sections/ContactStrip';

describe('WhyABS', () => {
  it('renders 6 reason cards', () => {
    render(<WhyABS />);
    expect(screen.getAllByRole('article').length).toBe(6);
  });

  it('renders section heading', () => {
    render(<WhyABS />);
    expect(screen.getByRole('heading', { name: /why abs/i })).toBeInTheDocument();
  });
});

describe('CSRTeaser', () => {
  it('renders Community heading', () => {
    render(<CSRTeaser />);
    expect(screen.getByRole('heading', { name: /community/i })).toBeInTheDocument();
  });
});

describe('ContactStrip', () => {
  it('renders WhatsApp link', () => {
    render(<ContactStrip />);
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  });

  it('renders Get in Touch link', () => {
    render(<ContactStrip />);
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
  });
});
