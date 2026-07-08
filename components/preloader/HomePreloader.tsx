'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { gsap, CustomEase } from '@/lib/gsap';

let easesRegistered = false;
function ensureEases() {
  if (easesRegistered) return;
  CustomEase.create('hop', '0.9, 0, 0.1, 1');
  CustomEase.create('glide', '0.8, 0, 0.2, 1');
  easesRegistered = true;
}

interface HomePreloaderProps {
  children: ReactNode;
}

const SLOT_ROTATIONS = [-15, 5, -7.5, 10, -2.5];
const SLOT_IMAGES = ['/4.webp', '/1.webp', null, '/2.webp', '/3.webp'];
const CENTER_SLOT = 2;
const SLOT_SCALE = 0.2;
const SLOT_GAP = 40;

const GREETINGS = ['নমস্কার', 'नमस्ते', 'hello', 'ନମସ୍କାର'];
const GREETING_START = 0.08;
const GREETING_ENTER = 0.06;
const GREETING_HOLD = 0.09;
const GREETING_EXIT = 0.06;
const GREETING_CYCLE = GREETING_ENTER + GREETING_HOLD + GREETING_EXIT;

const TL_DELAY = 0.15;
const BAR_FILL_DURATION = 0.9;
const BAR_CLOSE_DURATION = 0.7;
const CLIP_OPEN_DURATION = 0.6;
const CLIP_OPEN_OFFSET = 0.45; // clip-path wipe starts this far into the bar-close tween
const SLOT_CONVERGE_DURATION = 0.9;
const SLOT_SPREAD_DURATION = 0.9;
const HERO_SCALE_DURATION = 0.9;

const OVERLAY_COVERED = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const OVERLAY_OPEN = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';

export function HomePreloader({ children }: HomePreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const greetingRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const slots = slotRefs.current;
    const greetings = greetingRefs.current;
    if (slots.some((slot) => !slot) || !overlayRef.current || !barRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(overlayRef.current, { clipPath: OVERLAY_OPEN });
      gsap.set(slots, { clearProps: 'all' });
      gsap.set(greetings, { opacity: 0 });
      return;
    }

    ensureEases();
    document.body.style.overflow = 'hidden';

    const vw = window.innerWidth;
    const slotWidth = vw * SLOT_SCALE;
    const rowWidth = slotWidth * 5 + SLOT_GAP * 4;
    const centeredX0 = (vw - rowWidth) / 2;
    const offScreenX0 = centeredX0 - vw * 1.3;

    const centeredX = slots.map(
      (_, i) => centeredX0 + i * (slotWidth + SLOT_GAP) + slotWidth / 2 - vw / 2,
    );
    const offScreenX = slots.map(
      (_, i) => offScreenX0 + i * (slotWidth + SLOT_GAP) + slotWidth / 2 - vw / 2,
    );

    gsap.set(overlayRef.current, { clipPath: OVERLAY_COVERED });
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left' });
    gsap.set(greetings, { opacity: 0, y: 8 });
    gsap.set(slots, {
      scale: SLOT_SCALE,
      x: (i) => offScreenX[i],
      rotation: (i) => SLOT_ROTATIONS[i],
      borderRadius: '2.5rem',
      pointerEvents: 'none',
    });

    const tl = gsap.timeline({
      delay: TL_DELAY,
      onComplete: () => {
        document.body.style.overflow = '';
        gsap.set(overlayRef.current, { display: 'none' });
        gsap.set([slots[0], slots[1], slots[3], slots[4]], { display: 'none' });
        gsap.set(slots[CENTER_SLOT], { clearProps: 'all' });
      },
    });

    tl.to(barRef.current, {
      scaleX: 1,
      duration: BAR_FILL_DURATION,
      ease: 'glide',
      onComplete: () => gsap.set(barRef.current, { transformOrigin: 'right' }),
    });

    tl.to(barRef.current, { scaleX: 0, duration: BAR_CLOSE_DURATION, ease: 'hop' });

    tl.to(
      overlayRef.current,
      { clipPath: OVERLAY_OPEN, duration: CLIP_OPEN_DURATION, ease: 'hop' },
      `<${CLIP_OPEN_OFFSET}`,
    );

    tl.to(
      slots,
      { x: (i) => centeredX[i], duration: SLOT_CONVERGE_DURATION, ease: 'glide', stagger: 0.02 },
      '<',
    );

    tl.to(
      [slots[0], slots[1]],
      { x: '-100vw', duration: SLOT_SPREAD_DURATION, ease: 'glide' },
      'spread',
    );
    tl.to(
      [slots[3], slots[4]],
      { x: '100vw', duration: SLOT_SPREAD_DURATION, ease: 'glide' },
      'spread',
    );

    tl.to(
      slots[CENTER_SLOT],
      {
        scale: 1,
        x: 0,
        rotation: 0,
        borderRadius: 0,
        pointerEvents: 'auto',
        duration: HERO_SCALE_DURATION,
        ease: 'glide',
      },
      '<',
    );

    // Cards start converging as soon as the clip-path wipe begins.
    const cardsRevealAt = BAR_FILL_DURATION + CLIP_OPEN_OFFSET;
    const lastWord = greetings.length - 1;

    greetings.forEach((word, i) => {
      const start = GREETING_START + i * GREETING_CYCLE;
      const exitStart =
        i === lastWord ? cardsRevealAt - GREETING_EXIT : start + GREETING_ENTER + GREETING_HOLD;

      tl.to(word, { opacity: 1, y: 0, duration: GREETING_ENTER, ease: 'power2.out' }, start).to(
        word,
        { opacity: 0, y: -8, duration: GREETING_EXIT, ease: 'power2.in' },
        exitStart,
      );
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`.home-preloader-overlay{display:none !important}`}</style>
      </noscript>
      <div
        ref={overlayRef}
        className="home-preloader-overlay fixed inset-0 z-50 bg-bg-dark"
        style={{ clipPath: OVERLAY_COVERED }}
      >
        <div ref={barRef} className="absolute top-0 left-0 w-full h-1.5 bg-abs-blue" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          {GREETINGS.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                greetingRefs.current[i] = el;
              }}
              className="absolute text-white text-3xl md:text-5xl font-medium tracking-tight text-center"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        {SLOT_ROTATIONS.map((_, i) =>
          i === CENTER_SLOT ? (
            <div
              key={i}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden origin-center [backface-visibility:hidden]"
            >
              {children}
            </div>
          ) : (
            <div
              key={i}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden origin-center [backface-visibility:hidden]"
              aria-hidden="true"
            >
              <Image
                src={SLOT_IMAGES[i]!}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
                priority
              />
            </div>
          ),
        )}
      </div>
    </>
  );
}
