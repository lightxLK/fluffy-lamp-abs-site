'use client';

import { useEffect } from 'react';

const DEVELOPER_URL = 'https://lightxlk.github.io';
const REQUIRED_KEYS = new Set(['l', 'k']);

export function EasterEgg() {
  useEffect(() => {
    const pressedKeys = new Set<string>();

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (REQUIRED_KEYS.has(key)) {
        pressedKeys.add(key);
      }

      const comboComplete =
        event.altKey &&
        event.shiftKey &&
        Array.from(REQUIRED_KEYS).every((requiredKey) => pressedKeys.has(requiredKey));

      if (comboComplete) {
        pressedKeys.clear();
        window.open(DEVELOPER_URL, '_blank', 'noopener,noreferrer');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key.toLowerCase());
    };

    const handleBlur = () => {
      pressedKeys.clear();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return null;
}
