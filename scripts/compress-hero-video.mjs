// Re-encodes public/hero-source.<ext> into public/hero.mp4 + public/hero.webm using ffmpeg-static.
// Keeps source resolution (no downscale), strips audio, applies perceptual (CRF) compression.
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

console.log('Encoding H.264 MP4 (CRF 24, no audio)...');
run(['-y', '-i', source, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4Out]);

console.log('Encoding VP9 WebM (CRF 32, no audio)...');
run(['-y', '-i', source, '-an', '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', webmOut]);

console.log(`\nDone: ${mp4Out}\n      ${webmOut}`);
