import { render, screen } from '@testing-library/react';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

describe('WhatsAppButton', () => {
  it('renders a link to WhatsApp', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });

  it('opens in a new tab', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
