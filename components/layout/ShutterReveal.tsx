'use client';

import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/shutter-reveal.mp4';

// Chroma-key thresholds tuned for a bright green screen. KEY_LOW..KEY_HIGH
// is a feather band so the shutter's silhouette edge doesn't look jagged.
const KEY_LOW = 40;
const KEY_HIGH = 90;

export function ShutterReveal({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const video = videoRef.current;
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

    const handleEnded = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(rafId);
      onComplete();
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch(() => handleEnded());
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[70]" aria-hidden>
      <video ref={videoRef} src={VIDEO_SRC} muted playsInline preload="auto" className="hidden" />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
