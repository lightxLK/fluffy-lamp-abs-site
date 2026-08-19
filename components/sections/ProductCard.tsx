'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap, useGSAP } from '@/lib/gsap';
import { CardGlow } from '@/components/ui/CardGlow';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paths = iconRef.current?.querySelectorAll<SVGGeometryElement>('.abs-path');
      if (!paths?.length) return;
      gsap.set(paths, { drawSVG: '100%', fillOpacity: 1 });
    },
    { scope: iconRef },
  );

  const handleEnter = () => {
    const paths = iconRef.current?.querySelectorAll<SVGGeometryElement>('.abs-path');
    if (!paths?.length) return;
    // Same crossfade handoff as the ABS logo scene: the fill starts fading
    // in well before the line finishes drawing, reading as one continuous
    // motion instead of a draw-then-fill sequence.
    gsap
      .timeline({ overwrite: true })
      .fromTo(
        paths,
        { drawSVG: '0%', fillOpacity: 0 },
        { drawSVG: '100%', duration: 2.5, ease: 'power1.inOut', stagger: 0.04 },
      )
      .to(paths, { fillOpacity: 1, duration: 0.7, ease: 'power1.out' }, '-=1.5');
  };

  const handleLeave = () => {
    const paths = iconRef.current?.querySelectorAll<SVGGeometryElement>('.abs-path');
    if (!paths?.length) return;
    gsap.to(paths, {
      drawSVG: '100%',
      fillOpacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    });
  };

  const isShutter = product.slug === 'shutter';

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block aspect-[4/5] rounded overflow-hidden"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <CardGlow className="h-full w-full overflow-hidden rounded">
        <div
          ref={iconRef}
          className={
            isShutter
              ? 'absolute inset-0 flex items-center justify-center text-text-muted opacity-40 group-hover:text-text-primary group-hover:opacity-100 transition-[color,opacity] duration-500 p-10 pb-16'
              : 'absolute inset-0 flex items-center justify-center text-text-muted opacity-40 group-hover:text-text-primary group-hover:opacity-100 transition-[color,opacity] duration-500 p-10'
          }
        >
          <ProductIcon
            slug={product.slug}
            variant="stroke"
            className={isShutter ? 'w-[75%] h-[75%]' : 'w-full h-full'}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/60 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
            {product.category === product.brandLine
              ? product.category
              : `${product.category} · ${product.brandLine}`}
          </p>
          <h3 className="text-text-primary font-semibold text-lg leading-tight mb-2">
            {product.name}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {product.tagline}
          </p>
        </div>
      </CardGlow>
    </Link>
  );
}
