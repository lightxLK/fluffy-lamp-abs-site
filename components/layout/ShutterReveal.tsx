'use client';

import { useEffect, useRef, useState } from 'react';
import { SHUTTER_VIDEO_SRC, SHUTTER_AUDIO_SRC } from '@/lib/shutterVideo';

// Chroma-key thresholds tuned for a bright green screen. KEY_LOW..KEY_HIGH
// is a feather band so the shutter's silhouette edge doesn't look jagged.
const KEY_LOW = 40;
const KEY_HIGH = 90;

// Once the shutter finishes opening, the overlay dissolves rather than
// cutting away instantly — this is how long that fade takes before the
// gate is told the reveal is done and unmounts this component.
const FADE_OUT_MS = 600;

export function ShutterReveal({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const video = videoRef.current;
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onComplete();
      return;
    }

    let rafId = 0;
    let cancelled = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (cancelled) return;
      if (video.videoWidth && video.videoHeight) {
        if (!keyCanvasRef.current) {
          keyCanvasRef.current = document.createElement('canvas');
        }
        const keyCanvas = keyCanvasRef.current;
        keyCanvas.width = video.videoWidth;
        keyCanvas.height = video.videoHeight;
        const keyCtx = keyCanvas.getContext('2d', { willReadFrequently: true });

        if (keyCtx) {
          keyCtx.drawImage(video, 0, 0);
          const frame = keyCtx.getImageData(0, 0, keyCanvas.width, keyCanvas.height);
          const data = frame.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const diff = g - Math.max(r, b);

            if (diff > KEY_HIGH) {
              data[i + 3] = 0;
            } else if (diff > KEY_LOW) {
              data[i + 3] = 255 * (1 - (diff - KEY_LOW) / (KEY_HIGH - KEY_LOW));
            }
          }
          keyCtx.putImageData(frame, 0, 0);

          // Cover-fit the keyed frame onto the full-screen canvas.
          const scale = Math.max(canvas.width / keyCanvas.width, canvas.height / keyCanvas.height);
          const drawW = keyCanvas.width * scale;
          const drawH = keyCanvas.height * scale;
          const dx = (canvas.width - drawW) / 2;
          const dy = (canvas.height - drawH) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(keyCanvas, dx, dy, drawW, drawH);
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    let fadeTimeout = 0;

    const handleEnded = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(rafId);
      audio?.pause();
      // Leave the last drawn frame on the canvas and fade the whole overlay
      // out, rather than cutting straight to the site behind it.
      setFadingOut(true);
      fadeTimeout = window.setTimeout(onComplete, FADE_OUT_MS);
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch(() => handleEnded());
    // The chroma-key video itself is silent (kept `muted` so the browser
    // never blocks its autoplay); this separate track supplies the shutter
    // sound effect. Play errors (e.g. no user-activation left) are
    // swallowed — the reveal still works, just silently.
    audio?.play().catch(() => {});
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.clearTimeout(fadeTimeout);
      window.removeEventListener('resize', resize);
      video.removeEventListener('ended', handleEnded);
      audio?.pause();
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity ease-out ${
        fadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_OUT_MS}ms` }}
      aria-hidden
    >
      <video
        ref={videoRef}
        src={SHUTTER_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />
      <audio ref={audioRef} src={SHUTTER_AUDIO_SRC} preload="auto" className="hidden" />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
