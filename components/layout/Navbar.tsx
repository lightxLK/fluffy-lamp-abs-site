'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Fabrica', href: '/services/fabrica' },
  { label: 'Community', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-bg-dark border-b border-border-subtle backdrop-blur-sm' : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="max-w-[1440px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex items-center gap-2 group" aria-label="Anil Balaji Steel">
          <span className="text-white font-bold text-xl tracking-wide">ABS</span>
          <span className="text-abs-blue font-light">|</span>
          <span className="text-text-muted text-xs font-medium uppercase tracking-widest hidden sm:block">
            Anil Balaji Steel
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  'text-xs font-medium uppercase tracking-widest transition-colors duration-200',
                  (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                    ? 'text-white'
                    : 'text-text-muted hover:text-white',
                ].join(' ')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="lg:hidden text-text-muted hover:text-white transition-colors p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-bg-dark border-t border-border-subtle overflow-hidden"
          >
            <ul className="max-w-[1440px] mx-auto px-6 py-6 space-y-4" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      'block text-sm font-medium uppercase tracking-widest py-2 transition-colors duration-200',
                      (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                        ? 'text-white'
                        : 'text-text-muted hover:text-white',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
