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

// jsdom has no dedicated SVGPathElement class — all SVG tags are generic SVGElement,
// which lacks getTotalLength/getPointAtLength. Stub them so DrawSVG-style GSAP
// animations (stroke-dash length calc) don't throw.
if (typeof SVGElement !== 'undefined') {
  // @ts-expect-error - jsdom's SVGElement doesn't type this method, but code paths call it
  SVGElement.prototype.getTotalLength = () => 100;
  // @ts-expect-error - same as above
  SVGElement.prototype.getPointAtLength = () => ({ x: 0, y: 0 }) as DOMPoint;
}

// jsdom does not implement ResizeObserver — stub it so components that observe
// element size (e.g. GlassSurface's displacement map recompute) don't throw
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
