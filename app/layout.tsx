import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';
import { EasterEgg } from '@/components/layout/EasterEgg';
import { IS_PRODUCTION_SITE, SITE_URL } from '@/lib/env';
import './globals.css';

const albertSans = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-albert-sans',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anil Balaji Steel | Eastern India's Most Trusted Steel",
    template: '%s | Anil Balaji Steel',
  },
  description:
    'Rolling shutter profiles, pipes, roofing sheets, coils and fabrication. 50 years of excellence. Howrah, West Bengal.',
  keywords: [
    'Anil Balaji Steel',
    'rolling shutter profiles',
    'steel pipes',
    'roofing sheets',
    'steel coils',
    'steel fabrication',
    'steel manufacturer Howrah',
    'steel manufacturer West Bengal',
    'Eastern India steel',
  ],
  authors: [{ name: 'Anil Balaji Steel Pvt. Ltd.' }],
  creator: 'Anil Balaji Steel Pvt. Ltd.',
  publisher: 'Anil Balaji Steel Pvt. Ltd.',
  formatDetection: { email: false, address: false, telephone: false },
  applicationName: 'Anil Balaji Steel',
  category: 'Manufacturing',
  openGraph: {
    siteName: 'Anil Balaji Steel',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  // robots.txt (app/robots.ts) blocks crawling on non-production deploys, but
  // a URL can still get indexed via an inbound link without being crawled —
  // this meta tag is the layer that actually prevents that.
  robots: IS_PRODUCTION_SITE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={albertSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Light is the default theme — only stay dark if the visitor
            // previously chose it explicitly.
            __html: `(function(){try{if(localStorage.getItem('abs-theme')!=='dark')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-bg-dark text-text-primary font-sans antialiased">
        {children}
        <EasterEgg />
      </body>
    </html>
  );
}
