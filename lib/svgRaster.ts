import type { Point } from './svgGeometry';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('failed to load svg as image'));
    img.src = src;
  });
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

const RASTER_SIZE = 300;
const ALPHA_THRESHOLD = 20;
const DILATE = 2;
const EROSION = 2;

function dilate(
  mask: Uint8Array<ArrayBuffer>,
  width: number,
  height: number,
  radius: number,
): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let hit = false;
      for (let oy = -radius; oy <= radius && !hit; oy++) {
        const ny = y + oy;
        if (ny < 0 || ny >= height) continue;
        for (let ox = -radius; ox <= radius; ox++) {
          const nx = x + ox;
          if (nx < 0 || nx >= width) continue;
          if (mask[ny * width + nx]) {
            hit = true;
            break;
          }
        }
      }
      out[y * width + x] = hit ? 1 : 0;
    }
  }
  return out;
}

/**
 * Scatters `count` points across the area enclosed by a traced line-art SVG.
 *
 * Hand-traced outlines (potrace and similar) encode their border as a thin
 * closed ribbon of fill — sometimes an outer + inner subpath, sometimes a
 * single self-touching "keyhole" loop — and at any grid resolution cheap
 * enough to compute path-fill math for in real time, that ribbon is often
 * thinner than one grid cell, so naive rasterization in JS aliases right
 * through it. The browser's own SVG renderer doesn't have that problem, so
 * this rasterizes via an offscreen canvas and flood-fills the real pixels:
 * ink pixels are the drawn line, flood-fill from the canvas border finds the
 * true exterior, and whatever background is left unreached is the enclosed
 * interior — the state's area — regardless of how the path encodes its hole.
 */
export async function sampleDotsViaRaster(
  svgText: string,
  viewBox: string,
  count: number,
  seedStr: string,
): Promise<Point[]> {
  const [vbX, vbY, vbW, vbH] = viewBox.trim().split(/\s+/).map(Number);
  if (!vbW || !vbH) return [];

  const aspect = vbW / vbH;
  const width = aspect >= 1 ? RASTER_SIZE : Math.round(RASTER_SIZE * aspect);
  const height = aspect >= 1 ? Math.round(RASTER_SIZE / aspect) : RASTER_SIZE;

  const blob = new Blob([svgText], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  let img: HTMLImageElement;
  try {
    img = await loadImage(url);
  } finally {
    URL.revokeObjectURL(url);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  let pixels: Uint8ClampedArray;
  try {
    pixels = ctx.getImageData(0, 0, width, height).data;
  } catch {
    return []; // canvas tainted (shouldn't happen for same-origin public/ assets)
  }

  const size = width * height;
  let ink = new Uint8Array(size);
  for (let i = 0; i < size; i++) ink[i] = pixels[i * 4 + 3] > ALPHA_THRESHOLD ? 1 : 0;

  // Sub-pixel-thin traced lines anti-alias to partial coverage in spots,
  // leaving 1px gaps a naive flood-fill leaks straight through — closing
  // (dilating the ink mask) bridges those gaps before we look for the
  // enclosed interior. Dots still end up sampled clear of the *dilated*
  // mask, so this also doubles as extra edge clearance.
  ink = dilate(ink, width, height, DILATE);

  const idx = (x: number, y: number) => y * width + x;
  const exterior = new Uint8Array(size);
  const queue: number[] = [];
  const seed = (x: number, y: number) => {
    const i = idx(x, y);
    if (!ink[i] && !exterior[i]) {
      exterior[i] = 1;
      queue.push(i);
    }
  };
  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }
  while (queue.length) {
    const c = queue.pop()!;
    const cx = c % width;
    const cy = (c / width) | 0;
    if (cx > 0) seed(cx - 1, cy);
    if (cx < width - 1) seed(cx + 1, cy);
    if (cy > 0) seed(cx, cy - 1);
    if (cy < height - 1) seed(cx, cy + 1);
  }

  const isInterior = (x: number, y: number) => {
    const i = idx(x, y);
    return !ink[i] && !exterior[i];
  };

  // Erode so dots stay a few pixels clear of the ink/exterior boundary.
  const eroded: number[] = [];
  for (let y = EROSION; y < height - EROSION; y++) {
    for (let x = EROSION; x < width - EROSION; x++) {
      if (!isInterior(x, y)) continue;
      let clear = true;
      for (let oy = -EROSION; oy <= EROSION && clear; oy++) {
        for (let ox = -EROSION; ox <= EROSION; ox++) {
          if (!isInterior(x + ox, y + oy)) {
            clear = false;
            break;
          }
        }
      }
      if (clear) eroded.push(idx(x, y));
    }
  }

  let pool = eroded;
  if (!pool.length) {
    pool = [];
    for (let i = 0; i < size; i++) if (!ink[i] && !exterior[i]) pool.push(i);
  }
  if (!pool.length) return [];

  const rand = mulberry32(hashString(seedStr));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const result: Point[] = [];
  for (let k = 0; k < count; k++) {
    const cell = pool[k % pool.length];
    const px = cell % width;
    const py = (cell / width) | 0;
    const jitterX = (rand() - 0.5) * 0.6;
    const jitterY = (rand() - 0.5) * 0.6;
    result.push({
      x: vbX + ((px + 0.5 + jitterX) / width) * vbW,
      y: vbY + ((py + 0.5 + jitterY) / height) * vbH,
    });
  }

  return result;
}
