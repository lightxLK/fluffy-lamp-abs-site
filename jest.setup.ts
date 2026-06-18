import '@testing-library/jest-dom';

// jsdom does not implement window.matchMedia — stub it so animation guards
// (prefers-reduced-motion) short-circuit in tests, keeping DOM unmodified by GSAP
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});
