import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

jest.mock('next/navigation', () => ({ usePathname: jest.fn() }));

const mockedUsePathname = usePathname as jest.Mock;

describe('Breadcrumbs', () => {
  it('renders nothing on the home page', () => {
    mockedUsePathname.mockReturnValue('/');
    const { container } = render(<Breadcrumbs />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the crumb chain for a nested product page', () => {
    mockedUsePathname.mockReturnValue('/products/coils');
    render(<Breadcrumbs />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');

    const current = screen.getByText('Coils');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).not.toBe('A');
  });

  it('renders the real article title for a news slug', () => {
    mockedUsePathname.mockReturnValue('/news/abs-fabrica-launched');
    render(<Breadcrumbs />);

    expect(screen.getByText('ABS Fabrica Launches, Led by Ms. Komal Agarwal')).toBeInTheDocument();
  });
});
