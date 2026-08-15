'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch {
    return false;
  }
}

export function CinematicModelScene() {
  const [enabled, setEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Gating order: reduced-motion, then WebGL availability — checked once
  // at mount, never re-evaluated on change (same pattern as every other
  // client-only feature-detected component in this repo). Never construct
  // a WebGLRenderer just to discover WebGL isn't available.
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection needs window.matchMedia/canvas, unavailable during SSR
    setEnabled(!reducedMotion && hasWebGL());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Shadow maps must not auto-update every frame in a permanent render
    // loop — needsUpdate is set explicitly (Task 6) when the resident
    // model set changes, and separately via an epsilon-threshold check
    // against the key light's position/intensity (which is otherwise
    // interpolated continuously every frame).
    renderer.shadowMap.autoUpdate = false;
    container.appendChild(renderer.domElement);

    // One continuous ground plane spanning the full ride — this is what
    // makes models read as standing in one world instead of floating.
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshStandardMaterial({ color: 0x1d1d1d, roughness: 0.95, metalness: 0.02 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const hemi = new THREE.HemisphereLight(0x28282b, 0x0d0d0d, 0.6);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0x3667f4, 0.8);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe65a2d, 0.2);
    scene.add(rim);

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={containerRef} className="fixed inset-0 z-0" />;
}
