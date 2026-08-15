import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import type { ModelViewerElement } from '@google/model-viewer';
import { ModelViewer } from '@/components/ui/ModelViewer';

jest.mock('@google/model-viewer', () => ({}));

describe('ModelViewer', () => {
  it('renders a model-viewer element with the given src and alt', () => {
    const { container } = render(<ModelViewer src="/models/gazebo.glb" alt="Gazebo" />);
    const el = container.querySelector('model-viewer');
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute('src', '/models/gazebo.glb');
    expect(el).toHaveAttribute('alt', 'Gazebo');
  });

  it('enables camera-controls and auto-rotate by default', () => {
    const { container } = render(<ModelViewer src="/models/gazebo.glb" alt="Gazebo" />);
    const el = container.querySelector('model-viewer');
    expect(el).toHaveAttribute('camera-controls');
    expect(el).toHaveAttribute('auto-rotate');
  });

  it('omits camera-controls and auto-rotate when disabled via props', () => {
    const { container } = render(
      <ModelViewer
        src="/models/gazebo.glb"
        alt="Gazebo"
        cameraControls={false}
        autoRotate={false}
      />,
    );
    const el = container.querySelector('model-viewer');
    expect(el).not.toHaveAttribute('camera-controls');
    expect(el).not.toHaveAttribute('auto-rotate');
  });

  it('forwards the ref to the underlying model-viewer element', () => {
    const ref = createRef<ModelViewerElement>();
    render(<ModelViewer ref={ref} src="/models/gazebo.glb" alt="Gazebo" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('model-viewer');
  });

  it('applies className to the wrapper', () => {
    const { container } = render(
      <ModelViewer src="/models/gazebo.glb" alt="Gazebo" className="h-72" />,
    );
    expect(container.firstChild).toHaveClass('h-72');
  });

  it('starts hidden and fades in once the model finishes loading', () => {
    const { container } = render(<ModelViewer src="/models/gazebo.glb" alt="Gazebo" />);
    const el = container.querySelector('model-viewer') as HTMLElement;
    expect(el.style.opacity).toBe('0');
    fireEvent(el, new Event('load'));
    expect(el.style.opacity).toBe('1');
  });

  it('is already visible if the model reports itself as loaded before the effect runs', () => {
    // `loaded` is a readonly getter on the real element, not a plain
    // property — a ref callback runs synchronously during commit, before
    // any effect, so defining the getter there accurately simulates the
    // model already being loaded (e.g. a cache hit) by the time
    // ModelViewer's own effect checks it.
    const handleRef = (node: ModelViewerElement | null) => {
      if (node) {
        Object.defineProperty(node, 'loaded', { configurable: true, get: () => true });
      }
    };
    const { container } = render(
      <ModelViewer ref={handleRef} src="/models/gazebo.glb" alt="Gazebo" />,
    );
    const el = container.querySelector('model-viewer') as HTMLElement;
    expect(el.style.opacity).toBe('1');
  });
});
