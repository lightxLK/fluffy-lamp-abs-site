'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface NavLinkSwapProps {
  label: string;
  href: string;
  active: boolean;
  open: boolean;
  className?: string;
}

const ENTRANCE_DELAY = 0.45;
const SWAP_DURATION = 0.5;
const SWAP_STAGGER = 0.025;

function shuffledIndices(length: number) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function NavLinkSwap({ label, href, active, open, className }: NavLinkSwapProps) {
  const primaryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const secondaryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const chars = label.split('');

  useEffect(() => {
    gsap.set(charRefs.current, { opacity: 0, x: '150%' });
    gsap.set(secondaryRefs.current, { y: '100%' });
  }, [label]);

  useLayoutEffect(() => {
    const charEls = charRefs.current;
    if (!charEls.length) return;

    if (open) {
      gsap.to(charEls, {
        duration: 1.5,
        x: '0%',
        ease: 'elastic.out(1, 0.25)',
        stagger: 0.01,
        delay: ENTRANCE_DELAY,
      });
      gsap.to(charEls, {
        duration: 0.75,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.01,
        delay: ENTRANCE_DELAY,
      });
    } else {
      gsap.set(charEls, { opacity: 0, x: '150%' });
    }
  }, [open]);

  const handleEnter = () => {
    const order = shuffledIndices(chars.length);
    gsap.killTweensOf([...primaryRefs.current, ...secondaryRefs.current]);

    chars.forEach((_, i) => {
      const delay = order.indexOf(i) * SWAP_STAGGER;
      const primary = primaryRefs.current[i];
      const secondary = secondaryRefs.current[i];
      if (!primary || !secondary) return;

      gsap.to(primary, { y: '-100%', duration: SWAP_DURATION, ease: 'power3.out', delay });
      gsap.to(secondary, { y: '0%', duration: SWAP_DURATION, ease: 'power3.out', delay });
    });
  };

  // No animated exit — snaps straight back so the entry swap can replay
  // cleanly on the next hover, instead of mirroring it as its own animation.
  const handleLeave = () => {
    gsap.killTweensOf([...primaryRefs.current, ...secondaryRefs.current]);
    gsap.set(primaryRefs.current, { y: '0%' });
    gsap.set(secondaryRefs.current, { y: '100%' });
  };

  return (
    <Link
      href={href}
      className={[className, active ? 'text-abs-blue' : 'text-text-primary'].join(' ')}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="sr-only">{label}</span>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          className="char relative inline-block overflow-hidden align-top"
          aria-hidden="true"
        >
          <span
            ref={(el) => {
              primaryRefs.current[i] = el;
            }}
            className="relative inline-block whitespace-pre"
          >
            {char}
          </span>
          <span
            ref={(el) => {
              secondaryRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 inline-block whitespace-pre"
          >
            {char}
          </span>
        </span>
      ))}
    </Link>
  );
}
