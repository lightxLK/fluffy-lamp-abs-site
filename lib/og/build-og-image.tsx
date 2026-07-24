import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = "Anil Balaji Steel — Eastern India's Most Trusted Steel";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_DIR = join(process.cwd(), 'assets/fonts');

export async function renderOgImage() {
  const [regular, semibold, bold, extrabold, logo] = await Promise.all([
    readFile(join(FONT_DIR, 'AlbertSans-Regular.ttf')),
    readFile(join(FONT_DIR, 'AlbertSans-SemiBold.ttf')),
    readFile(join(FONT_DIR, 'AlbertSans-Bold.ttf')),
    readFile(join(FONT_DIR, 'AlbertSans-ExtraBold.ttf')),
    readFile(join(process.cwd(), 'app/icon.png')),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0d0d0d',
        fontFamily: 'Albert Sans',
      }}
    >
      {/* radial glow, top right */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          right: -280,
          top: -340,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(54,103,244,0.35) 0%, rgba(13,13,13,0) 70%)',
          display: 'flex',
        }}
      />
      {/* subtle glow, bottom left */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          left: -260,
          bottom: -360,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(11,62,207,0.18) 0%, rgba(13,13,13,0) 70%)',
          display: 'flex',
        }}
      />

      {/* left: copy */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 0 0 80px',
          width: 700,
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#3667f4',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Since 1972 · Howrah, West Bengal
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#ffffff',
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.08,
            marginTop: 22,
          }}
        >
          <span>Anil Balaji</span>
          <span>Steel</span>
        </div>
        <div
          style={{
            display: 'flex',
            color: 'rgba(255,255,255,0.72)',
            fontSize: 27,
            fontWeight: 400,
            marginTop: 28,
            maxWidth: 620,
          }}
        >
          Rolling shutters, pipes, roofing sheets, coils &amp; fabrication — Eastern India&apos;s
          most trusted steel manufacturer.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 46 }}>
          <div style={{ width: 36, height: 4, background: '#0b3ecf', display: 'flex' }} />
          <div
            style={{
              display: 'flex',
              color: '#3667f4',
              fontSize: 24,
              fontWeight: 600,
              marginLeft: 16,
              letterSpacing: 1,
            }}
          >
            anilbalajisteel.com
          </div>
        </div>
      </div>

      {/* right: logo mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 500,
          height: '100%',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={380} height={380} style={{ objectFit: 'contain' }} />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Albert Sans', data: regular, style: 'normal', weight: 400 },
        { name: 'Albert Sans', data: semibold, style: 'normal', weight: 600 },
        { name: 'Albert Sans', data: bold, style: 'normal', weight: 700 },
        { name: 'Albert Sans', data: extrabold, style: 'normal', weight: 800 },
      ],
    },
  );
}
