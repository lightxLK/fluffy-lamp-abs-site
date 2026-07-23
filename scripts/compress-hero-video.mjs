// Re-encodes a source video into public/<name>.mp4 + public/<name>.webm using ffmpeg-static.
// Downscales to 1080p/24fps and strips audio. Quality-first CRF settings (premium
// hero footage — aerial/textured shots punish aggressive compression far more than
// a few extra megabytes cost on load): x264 CRF 19 @ preset slower, VP9 CRF 31.
// Usage: node scripts/compress-hero-video.mjs <path-to-source-video> [output-name]
//   output-name defaults to "hero" -> public/hero.mp4 + public/hero.webm

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const source = process.argv[2];
const outputName = process.argv[3] || 'hero';
if (!source) {
  console.error('Usage: node scripts/compress-hero-video.mjs <path-to-source-video> [output-name]');
  process.exit(1);
}

const publicDir = path.join(process.cwd(), 'public');
const mp4Out = path.join(publicDir, `${outputName}.mp4`);
const webmOut = path.join(publicDir, `${outputName}.webm`);

function run(args) {
  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`ffmpeg exited with code ${result.status}`);
  }
}

function probeDimensions(file) {
  const result = spawnSync(ffmpegPath, ['-i', file], { encoding: 'utf8' });
  const match = result.stderr.match(/Video:.*?(\d{2,5})x(\d{2,5})/);
  if (!match) throw new Error(`Could not read dimensions of ${file}`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

// Scale by the long edge so portrait sources (mobile) aren't stretched to a
// landscape width — that upscales them and bloats the file for no quality gain.
const { width, height } = probeDimensions(source);
const SCALE = width >= height ? 'scale=1920:-2,fps=24' : 'scale=-2:1920,fps=24';

console.log('Encoding H.264 MP4 (1080p, CRF 19, preset slower, no audio)...');
run(['-y', '-i', source, '-an', '-vf', SCALE, '-c:v', 'libx264', '-preset', 'slower', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4Out]);

console.log('Encoding VP9 WebM (1080p, CRF 31, no audio)...');
run(['-y', '-i', source, '-an', '-vf', SCALE, '-c:v', 'libvpx-vp9', '-crf', '31', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', webmOut]);

console.log(`\nDone: ${mp4Out}\n      ${webmOut}`);
