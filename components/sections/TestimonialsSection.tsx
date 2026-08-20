'use client';

import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/data/testimonials';
import { Container } from '@/components/layout/Container';

const REPEAT = 2;

// Roughly matches the old CSS marquee's pace (a full row used to take ~100s
// to scroll its own width at typical card sizes).
const AUTO_SPEED_PX_PER_SEC = 90;

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      // The track holds two identical copies back to back — half its
      // scrollWidth is exactly one copy, which is the wrap period.
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!draggingRef.current && !hoveredRef.current && !reduceMotion) {
        positionRef.current -= AUTO_SPEED_PX_PER_SEC * dt;
      }

      const half = halfWidthRef.current;
      if (half > 0) {
        let wrapped = positionRef.current % half;
        if (wrapped > 0) wrapped -= half;
        positionRef.current = wrapped;
      }

      track.style.transform = `translateX(${positionRef.current}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartPositionRef.current = positionRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - dragStartXRef.current;
    positionRef.current = dragStartPositionRef.current + delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-bg-mid overflow-hidden"
      aria-label="Customer testimonials"
    >
      <Container>
        <p className="text-center text-text-muted text-xs uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-center text-text-primary font-bold text-3xl lg:text-4xl mb-12">
          What Our Partners Say
        </h2>
      </Container>

      <div
        className={`w-full overflow-hidden [--gap:1.5rem] marquee-mask select-none touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={(event) => {
          hoveredRef.current = false;
          endDrag(event);
        }}
        onPointerCancel={endDrag}
        onPointerEnter={() => {
          hoveredRef.current = true;
        }}
      >
        <div ref={trackRef} className="flex w-max items-stretch gap-(--gap)">
          {Array.from({ length: REPEAT }).flatMap((_, g) =>
            TESTIMONIALS.map((testimonial, i) => (
              <div
                key={`${g}-${i}`}
                className="w-[300px] md:w-[360px] shrink-0 whitespace-normal rounded-xl border border-border-subtle bg-bg-card p-6 md:p-8"
              >
                <p
                  aria-hidden="true"
                  className="text-abs-blue text-4xl font-serif leading-none mb-3"
                >
                  &ldquo;
                </p>
                <h3 className="text-text-primary font-semibold text-base mb-3">
                  {testimonial.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{testimonial.quote}</p>
                <p className="text-text-primary text-xs font-semibold mt-4">— {testimonial.name}</p>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
