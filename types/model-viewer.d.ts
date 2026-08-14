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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}
