// Converts raster images in public/ to .webp using sharp, then removes the originals.
// Usage: node scripts/optimize-images.mjs

import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function main() {
  const files = await readdir(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;

    const srcPath = path.join(PUBLIC_DIR, file);
    const destPath = path.join(PUBLIC_DIR, `${path.basename(file, ext)}.webp`);

    const before = (await stat(srcPath)).size;
    await sharp(srcPath).webp({ quality: 80 }).toFile(destPath);
    const after = (await stat(destPath)).size;

    if (after >= before) {
      console.log(
        `${file}: webp (${(after / 1024).toFixed(0)}KB) is not smaller than the original (${(before / 1024).toFixed(0)}KB) - keeping both, review manually.`,
      );
      continue;
    }

    totalBefore += before;
    totalAfter += after;

    console.log(
      `${file} -> ${path.basename(destPath)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
    );

    await unlink(srcPath);
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
  );
}

main();
