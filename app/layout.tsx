import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';
import { EasterEgg } from '@/components/layout/EasterEgg';
import './globals.css';

const albertSans = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-albert-sans',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Anil Balaji Steel | Eastern India's Most Trusted Steel",
    template: '%s | Anil Balaji Steel',
  },
  description:
    'Rolling shutter profiles, pipes, roofing sheets, coils and fabrication. 50 years of excellence. Howrah, West Bengal.',
  openGraph: {
    siteName: 'Anil Balaji Steel',
    type: 'website',
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
