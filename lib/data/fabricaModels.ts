export interface ModelAsset {
  src: string;
  alt: string;
}

export const MODEL_ASSETS = {
  gate: { src: '/models/gate.glb', alt: 'Ornamental gate 3D model' },
  gateV2: { src: '/models/gate-v2.glb', alt: 'Modern gate 3D model' },
  gazebo: { src: '/models/gazebo.glb', alt: 'Gazebo 3D model' },
  stairs: { src: '/models/stairs.glb', alt: 'Structural stairs 3D model' },
  streetLamp: { src: '/models/street-lamp.glb', alt: 'Street lamp 3D model' },
  roundStairs: {
    src: '/models/round-stairs.glb',
    alt: 'Round staircase fabricated by ABS Fabrica',
  },
} as const satisfies Record<string, ModelAsset>;
