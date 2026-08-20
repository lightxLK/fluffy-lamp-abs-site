'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/csr-images/csr-1.webp',
  '/csr-images/csr-2.webp',
  '/csr-images/csr-3.webp',
  '/csr-images/csr-4.webp',
  '/csr-images/csr-5.webp',
  '/csr-images/csr-6.webp',
  '/csr-images/csr-7.webp',
];

const SLIDE_DURATION_MS = 6000;

export function CSRImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            draggable={false}
            className="animate-slow-zoom select-none object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}
