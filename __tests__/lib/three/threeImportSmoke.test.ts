// __tests__/lib/three/threeImportSmoke.test.ts
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

describe('three.js import resolution', () => {
  it('resolves the core three module', () => {
    expect(THREE.Vector3).toBeDefined();
    expect(new THREE.Vector3(1, 2, 3).x).toBe(1);
  });

  it("resolves three/addons GLTFLoader under this repo's bundler/Jest config", () => {
    expect(GLTFLoader).toBeDefined();
    expect(typeof GLTFLoader).toBe('function');
  });
});
