import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { ReadyToBuildScene } from '@/components/svg/scenes/ReadyToBuildScene';
import { HomeExitLink } from '@/components/layout/HomeExitLink';

export function ContactStrip() {
  return (
    <section
      className="relative bg-abs-blue overflow-hidden flex flex-col justify-start pt-16 pb-72 md:block md:py-20"
      id="contact-strip"
    >
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center opacity-[0.35] pointer-events-none overflow-hidden md:hidden">
        <Image
          src="/mobile-contact-strip-art.svg"
          alt=""
          width={720}
          height={290}
          className="w-full max-w-none h-auto"
        />
      </div>
      <div className="absolute inset-0 hidden items-center justify-center opacity-[0.35] pointer-events-none overflow-hidden md:flex">
        <ReadyToBuildScene className="w-full max-w-full h-auto" />
      </div>

      <Container className="relative">
        <div className="text-center">
          <h2 className="text-white font-bold text-3xl lg:text-4xl leading-tight mb-4">
            Ready to build with ABS steel?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Talk to our team today. We&apos;ll help you find the right product, grade, and quantity.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="https://wa.me/919007211599"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="relative z-[2] inline-flex items-center gap-3 bg-white text-abs-blue px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-white/90 transition-colors duration-300"
            >
              WhatsApp Us
            </Link>
            <HomeExitLink
              href="/contact"
              sectionId="contact-strip"
              className="relative z-[2] inline-flex items-center gap-3 border border-white/30 bg-white/10 text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest backdrop-blur-md hover:border-white hover:bg-white/20 transition-colors duration-300"
            >
              Get in Touch
            </HomeExitLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
