'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import type { ModelViewerElement } from '@google/model-viewer';
import { cn } from '@/lib/utils';

interface ModelViewerProps {
  src: string;
  alt: string;
  className?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  /**
   * Whether this component fades itself in on its own `load` event
   * (default). Set `false` when the *caller* owns fade timing — e.g.
   * ModelSceneController, which crossfades between two viewers and needs
   * the incoming one to stay hidden until its own choreography says
   * otherwise. With `false` the element renders at opacity 0 and never
   * changes it itself; the caller drives `style.opacity` imperatively
   * (the 0.6s CSS transition below still animates those writes, and React
   * never overwrites them because the style prop's value stays constant).
   */
  fadeOnLoad?: boolean;
}

export const ModelViewer = forwardRef<ModelViewerElement, ModelViewerProps>(function ModelViewer(
  { src, alt, className, autoRotate = true, cameraControls = true, fadeOnLoad = true },
  forwardedRef,
) {
  const [loaded, setLoaded] = useState(false);
  const elementRef = useRef<ModelViewerElement | null>(null);

  // @google/model-viewer throws `HTMLElement is not defined` if its module
  // scope ever runs on the server (confirmed under Node directly) — this
  // dynamic import only ever executes client-side, after mount.
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  // `src` is fixed for the lifetime of a ModelViewer instance in this
  // feature's actual usage (the gazebo and stairs cards each mount once
  // with a hardcoded src, never swap sources) — this effect intentionally
  // runs once on mount rather than depending on `src`, so there's no
  // stale-model race between an old model's `loaded` state and a new
  // source's load to reason about. If a future consumer needs to swap
  // `src` at runtime, this effect needs revisiting to track which source
  // produced a given `load` event, not just re-adding `[src]` here.
  useEffect(() => {
    if (!fadeOnLoad) return;
    const el = elementRef.current;
    if (!el) return;
    // `loaded` can already be true by the time this effect runs (e.g. a
    // cached model resolves before React commits) — a `load` listener
    // attached only after that point would never fire. Check the current
    // state first, and only fall back to listening if it isn't loaded yet.
    if (el.loaded) {
      setLoaded(true);
      return;
    }
    const handleLoad = () => setLoaded(true);
    el.addEventListener('load', handleLoad);
    return () => el.removeEventListener('load', handleLoad);
  }, [fadeOnLoad]);

  return (
    <div className={cn('relative overflow-hidden bg-bg-card', className)}>
      <model-viewer
        ref={(node: ModelViewerElement | null) => {
          elementRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        src={src}
        alt={alt}
        loading="lazy"
        shadow-intensity="1"
        interaction-prompt="none"
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        auto-rotate-delay="0"
        rotation-per-second="45deg"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          opacity: fadeOnLoad && loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
    </div>
  );
});
