import Link from 'next/link';

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
] as const;

const FURTHER_LINKS = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'News', href: '/news' },
  { label: 'Careers', href: '/careers' },
] as const;

export function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <img src="/abs-nav-footer1.webp" alt="Anil Balaji Steel" className="h-20 w-auto" />
          <p className="text-text-muted text-sm mt-3">Anil Balaji Steel Pvt. Ltd.</p>
          <p className="text-text-muted text-sm mt-4 leading-relaxed max-w-xs">
            Eastern India&apos;s most trusted steel manufacturer. Howrah, West Bengal. Est. 1972.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Company</p>
          <ul className="space-y-3">
            {[...COMPANY_LINKS, ...FURTHER_LINKS].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-muted text-sm hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Contact</p>
          <address className="not-italic space-y-3 text-text-muted text-sm">
            <p>
              <a
                href="https://maps.app.goo.gl/ndS6gDkZd79UAnQt6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                Jalan Industrial Complex, Gate No. 1, Domjur, NH6, Howrah, 711411
              </a>
            </p>
            <p>
              <a
                href="tel:+919007211599"
                className="hover:text-white transition-colors duration-200"
              >
                +91 90072 11599
              </a>
            </p>
            <p>
              <a
                href="mailto:viren@anilbalajisteel.com"
                className="hover:text-white transition-colors duration-200"
              >
                viren@anilbalajisteel.com
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Anil Balaji Steel Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">Built on steel. Trusted for 50 years.</p>
        </div>
      </div>
    </footer>
  );
}
