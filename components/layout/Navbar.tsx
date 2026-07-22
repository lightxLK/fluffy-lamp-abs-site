'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { getLenis } from '@/lib/lenis';
import { NavLinkSwap } from '@/components/layout/NavLinkSwap';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Fabrica', href: '/services/fabrica' },
  { label: 'Community', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
] as const;

const SVG_WIDTH = 1131;
const SVG_HEIGHT = 861;
const SVG_CENTER_X = SVG_WIDTH / 2;

const OPEN_HIDDEN = `M${SVG_WIDTH},0 Q${SVG_CENTER_X},0 0,0 L0,0 L${SVG_WIDTH},0 Z`;
const OPEN_BULGE = `M${SVG_WIDTH},345 Q${SVG_CENTER_X},620 0,345 L0,0 L${SVG_WIDTH},0 Z`;
const OPEN_FULL = `M${SVG_WIDTH},${SVG_HEIGHT} Q${SVG_CENTER_X},${SVG_HEIGHT} 0,${SVG_HEIGHT} L0,0 L${SVG_WIDTH},0 Z`;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [separatorWidth, setSeparatorWidth] = useState(0);
  const pathname = usePathname();

  const pathRef = useRef<SVGPathElement>(null);
  const linksColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const addressLine2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = addressLine2Ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const update = () => setSeparatorWidth(el.offsetWidth);
    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: '0px 0px 0px 0px',
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    gsap.set(pathRef.current, { attr: { d: OPEN_HIDDEN } });
    gsap.set(infoColRef.current?.querySelectorAll('p, h3, h6, div') ?? [], { opacity: 0, y: 100 });
  }, []);

  const openMenu = () => {
    tlRef.current?.kill();
    setOpen(true);
    getLenis()?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const infoItems = infoColRef.current?.querySelectorAll('p, h3, h6, div') ?? [];
    gsap.set(infoItems, { opacity: 0, y: 100 });
    gsap.set(linksColRef.current?.querySelectorAll('a') ?? [], { opacity: 1 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(pathRef.current, { duration: 0.5, attr: { d: OPEN_BULGE }, ease: 'power4.in' }).to(
      pathRef.current,
      { duration: 0.5, attr: { d: OPEN_FULL }, ease: 'power4.out' },
    );

    tl.to(
      infoItems,
      { duration: 0.75, opacity: 1, y: 0, ease: 'power3.out', stagger: 0.075 },
      '-=0.6',
    );
  };

  const closeMenu = () => {
    tlRef.current?.kill();
    gsap.set(pathRef.current, { attr: { d: OPEN_FULL } });

    const links = linksColRef.current?.querySelectorAll('a') ?? [];
    const infoItems = infoColRef.current?.querySelectorAll('p, h3, h6, div') ?? [];

    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false);
        getLenis()?.start();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        gsap.set(pathRef.current, { attr: { d: OPEN_HIDDEN } });
        gsap.set(infoItems, { opacity: 0, y: 100 });
      },
    });
    tlRef.current = tl;

    tl.to(links, { duration: 0.3, opacity: 0 }).to(infoItems, { duration: 0.3, opacity: 0 }, '<');

    // Mirrors openMenu's keyframes in reverse so the panel retracts back up
    // through the top edge it grew from, instead of collapsing to the bottom.
    tl.to(pathRef.current, { duration: 0.5, attr: { d: OPEN_BULGE }, ease: 'power3.in' }, '<').to(
      pathRef.current,
      { duration: 0.5, attr: { d: OPEN_HIDDEN }, ease: 'power3.out' },
    );
  };

  const toggleMenu = () => (open ? closeMenu() : openMenu());

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => closeMenu());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
        scrolled || open
          ? 'bg-bg-dark border-b border-border-subtle backdrop-blur-sm'
          : 'bg-transparent',
        nearFooter && !open
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100',
      ].join(' ')}
    >
      <nav
        className="max-w-[1440px] mx-auto px-6 lg:px-8 h-24 flex items-center justify-between relative z-20"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex items-center group pt-2" aria-label="Anil Balaji Steel">
          <img src="/abs-nav-footer-light.webp" alt="Anil Balaji Steel" className="h-14 w-auto" />
        </Link>

        <div
          className={[
            'flex items-center gap-1',
            // Over the home hero video (transparent nav) icons must stay white
            !scrolled && !open && pathname === '/' ? 'text-white' : 'text-text-primary',
          ].join(' ')}
        >
          <ThemeToggle />
          <button
            className="hover:text-abs-blue transition-colors p-2"
            onClick={toggleMenu}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="fullscreen-menu"
          >
            <svg className={`ham ham2${open ? ' active' : ''}`} viewBox="0 0 100 100" width="32">
              <path
                className="line top"
                d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381"
              />
              <path className="line middle" d="m 30,50 h 40" />
              <path
                className="line bottom"
                d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="fullscreen-menu"
        ref={menuRef}
        className={[
          'absolute top-0 left-0 w-full h-[100svh]',
          'z-10',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full -z-10"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path ref={pathRef} fill="var(--abs-bg-dark)" d={OPEN_HIDDEN} />
        </svg>

        <div className="w-full h-full pb-10 lg:pb-16 flex flex-col items-center justify-center relative">
          <div
            ref={linksColRef}
            className="flex flex-col items-start text-left gap-2 -translate-x-8 sm:-translate-x-12 lg:-translate-x-20"
          >
            {NAV_LINKS.map((link) => (
              <NavLinkSwap
                key={link.href}
                label={link.label}
                href={link.href}
                active={isActive(link.href)}
                open={open}
                className="font-sans font-bold leading-[1.15] text-[clamp(1.75rem,5.5vw,3.5rem)] w-max overflow-visible transition-colors"
              />
            ))}
          </div>

          <div
            ref={infoColRef}
            className="absolute bottom-8 right-6 lg:right-8 flex flex-col items-end text-right"
          >
            <p className="text-text-primary text-xs font-semibold uppercase tracking-[0.25rem] mb-4">
              Get in touch
            </p>
            <div
              className="h-px bg-text-primary mb-4"
              style={{ width: separatorWidth || undefined }}
              aria-hidden="true"
            />
            <h3 className="text-text-muted text-base lg:text-lg font-semibold mb-1">
              <a
                href="mailto:viren@anilbalajisteel.com"
                className="hover:text-abs-blue transition-colors"
              >
                viren@anilbalajisteel.com
              </a>
            </h3>
            <h3 className="text-text-muted text-base lg:text-lg font-semibold mb-1">
              <a href="tel:+919007211599" className="hover:text-abs-blue transition-colors">
                +91 90072 11599
              </a>
            </h3>
            <a
              href="https://maps.app.goo.gl/ndS6gDkZd79UAnQt6"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit text-text-muted hover:text-text-primary transition-colors"
            >
              <h6 className="text-base lg:text-lg leading-snug">Jalan Industrial Complex,</h6>
              <h6 ref={addressLine2Ref} className="text-base lg:text-lg leading-snug">
                Gate No. 1, Domjur, NH6, Howrah, 711411
              </h6>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
