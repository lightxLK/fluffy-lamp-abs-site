import { render } from '@testing-library/react';
import FabricaExperiencePage, { metadata } from '@/app/(site)/services/fabrica/experience/page';

jest.mock('@google/model-viewer', () => ({}));

describe('fabrica experience page', () => {
  it('wraps its content in a pointer-events-none, relative z-10 layer above the fixed 3D layer', () => {
    // Pointer-events contract (spec "Interaction model"): the fixed 3D
    // layer is `pointer-events-auto` (asserted in the ModelSceneController
    // suite) and the content wrapper is `pointer-events-none`, so drags on
    // inert page background pass through to the model while the wrapper
    // still paints above it via `relative z-10`.
    const { container } = render(<FabricaExperiencePage />);
    const wrapper = container.querySelector('div.pointer-events-none.relative.z-10');
    expect(wrapper).not.toBeNull();
    // The real page content lives inside it, not beside it.
    expect(wrapper!.querySelector('h1')).not.toBeNull();
  });

  it('renders the reduced-motion fallback after the page content, not above the hero', () => {
    const { container } = render(<FabricaExperiencePage />);
    const wrapper = container.querySelector('div.pointer-events-none.relative.z-10')!;
    // jest.setup.ts's matchMedia stub reports prefers-reduced-motion, so
    // ReducedMotionModelFallback renders (and ModelSceneController does
    // not) — every <model-viewer> on the page belongs to the fallback.
    const fallbackModel = container.querySelector('model-viewer');
    expect(fallbackModel).not.toBeNull();
    // DOCUMENT_POSITION_FOLLOWING means the fallback comes *after* the
    // content wrapper in document order, rather than before the <h1>.
    expect(
      wrapper.compareDocumentPosition(fallbackModel!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('is not independently indexable — it is a variant of /services/fabrica', () => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(String(metadata.alternates?.canonical)).toMatch(/\/services\/fabrica$/);
  });
});
