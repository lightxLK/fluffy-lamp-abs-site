// Re-encodes public/hero-source.<ext> into public/hero.mp4 + public/hero.webm using ffmpeg-static.
// Downscales to 1080p/24fps (the hero video is a darkened, overlaid background —
// full 4K source resolution is wasted bytes) and strips audio.
// Usage: node scripts/compress-hero-video.mjs <path-to-source-video>

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const source = process.argv[2];
if (!source) {
  console.error('Usage: node scripts/compress-hero-video.mjs <path-to-source-video>');
  process.exit(1);
}

const publicDir = path.join(process.cwd(), 'public');
const mp4Out = path.join(publicDir, 'hero.mp4');
const webmOut = path.join(publicDir, 'hero.webm');

function run(args) {
  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`ffmpeg exited with code ${result.status}`);
  }
}

const SCALE = 'scale=1920:-2,fps=24';

console.log('Encoding H.264 MP4 (1080p, CRF 30, no audio)...');
run(['-y', '-i', source, '-an', '-vf', SCALE, '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4Out]);

console.log('Encoding VP9 WebM (1080p, CRF 40, no audio)...');
run(['-y', '-i', source, '-an', '-vf', SCALE, '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', webmOut]);

console.log(`\nDone: ${mp4Out}\n      ${webmOut}`);
