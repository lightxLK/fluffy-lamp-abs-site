import { render, screen } from '@testing-library/react';
import { GSAPProvider } from '@/components/animations/GSAPProvider';
import { LenisProvider } from '@/components/animations/LenisProvider';

jest.mock('@/lib/gsap', () => ({ registerGSAP: jest.fn() }));
jest.mock('@/lib/lenis', () => ({
  createLenis: jest.fn(() => ({ lenis: {}, cleanup: jest.fn() })),
}));

describe('GSAPProvider', () => {
  it('renders children without crashing', () => {
    render(
      <GSAPProvider>
        <div data-testid="child">content</div>
      </GSAPProvider>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('LenisProvider', () => {
  it('renders children without crashing', () => {
    render(
      <LenisProvider>
        <div data-testid="child">content</div>
      </LenisProvider>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
