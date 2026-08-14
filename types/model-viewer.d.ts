import type { ModelViewerElement } from '@google/model-viewer';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<ModelViewerElement>,
  ModelViewerElement
> & {
  src?: string;
  alt?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'auto-rotate-delay'?: string;
  'shadow-intensity'?: string;
  'interaction-prompt'?: string;
};

// @types/react 19 moved the JSX namespace from the global scope to
// `React.JSX` (see node_modules/@types/react/index.d.ts). Augmenting
// `declare global { namespace JSX {} }` no longer merges into the
// namespace TS actually resolves under the "react-jsx" transform, so the
// augmentation has to target the `react` module's `JSX` namespace instead.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}
