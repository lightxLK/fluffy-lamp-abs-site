import Link from 'next/link';
import { InstagramIcon } from '@/components/svg/icons/InstagramIcon';
import { FacebookIcon } from '@/components/svg/icons/FacebookIcon';
import { LinkedinIcon } from '@/components/svg/icons/LinkedinIcon';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/anilbalajisteel/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/anilbalajisteel1', Icon: FacebookIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/anil-balaji-steel/',
    Icon: LinkedinIcon,
  },
] as const;

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Why ABS?', href: '/why-abs' },
  { label: 'Contact', href: '/contact' },
] as const;

const FURTHER_LINKS = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'News', href: '/news' },
  { label: 'Careers', href: '/careers' },
] as const;

// The root's `relative z-10` is load-bearing: the fabrica experience page
// mounts a `fixed inset-0 z-0` 3D layer inside <main>. A non-positioned
// footer paints *below* any positioned element regardless of DOM order, so
// that layer would cover the footer and swallow every link click. Joining
// the same paint group (and being later in DOM order) puts the footer back
// on top. No layout change — `relative` with no offsets moves nothing.
export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-dark border-t border-border-subtle md:min-h-[50dvh] md:flex md:flex-col md:justify-center">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <img
            src="/abs-nav-footer1.webp"
            alt="Anil Balaji Steel"
            width={320}
            height={226}
            className="h-20 w-auto light:hidden"
          />
          <img
            src="/abs-nav-footer-light.webp"
            alt="Anil Balaji Steel"
            width={320}
            height={226}
            className="hidden light:block h-20 w-auto"
          />
          <p className="text-text-muted text-sm mt-3">Anil Balaji Steel Pvt. Ltd.</p>
          <p className="text-text-muted text-sm mt-4 leading-relaxed max-w-xs">
            Eastern India&apos;s most trusted steel manufacturer. Howrah, West Bengal. Est. 1975.
          </p>
          <div className="flex items-center gap-4 mt-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <Icon className="h-5 w-5 fill-current" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-text-primary font-semibold text-xs uppercase tracking-widest mb-6">
            Company
          </p>
          <ul className="space-y-3">
            {[...COMPANY_LINKS, ...FURTHER_LINKS].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-muted text-sm hover:text-text-primary hover:font-bold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-text-primary font-semibold text-xs uppercase tracking-widest mb-6">
            Contact
          </p>
          <address className="not-italic space-y-3 text-text-muted text-sm">
            <p>
              <span className="text-text-primary font-medium">Corporate Office:</span>
              <br />
              Eco Space Business Towers, Tower 5A, Unit 0804, Plot IIF/13, New Town, West Bengal,
              700160
            </p>
            <p>
              <span className="text-text-primary font-medium">Factory Address:</span>
              <br />
              <a
                href="https://maps.app.goo.gl/ndS6gDkZd79UAnQt6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors duration-200"
              >
                Jalan Industrial Complex, Gate No. 1, Domjur, NH6, Howrah, 711411, West Bengal,
                India
              </a>
            </p>
            <p>
              <a
                href="tel:+919007211599"
                className="hover:text-text-primary transition-colors duration-200"
              >
                +91 9007 21 1599
              </a>
              ,{' '}
              <a
                href="tel:+919831118255"
                className="hover:text-text-primary transition-colors duration-200"
              >
                9831 11 8255
              </a>
            </p>
            <p>
              <a
                href="mailto:viren@anilbalajisteel.com"
                className="hover:text-text-primary transition-colors duration-200"
              >
                viren@anilbalajisteel.com
              </a>
            </p>
            <p>
              <a
                href="mailto:vivek@anilbalajisteel.com"
                className="hover:text-text-primary transition-colors duration-200"
              >
                vivek@anilbalajisteel.com
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
