import { renderOgImage, alt, size, contentType } from '@/lib/og/build-og-image';

export const dynamic = 'force-static';
export { alt, size, contentType };

export default async function Image() {
  return renderOgImage();
}
