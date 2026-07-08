import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/generateMetadata';
import { generateBreadcrumbSchema } from '@/lib/seo/generateBreadcrumbSchema';
import { Container } from '@/components/layout/Container';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { WhatsAppIcon } from '@/components/svg/icons/WhatsAppIcon';

export const metadata: Metadata = genMeta({
  title: 'Contact Us | Anil Balaji Steel',
  description:
    'Get in touch with Anil Balaji Steel, Howrah, West Bengal. Call, WhatsApp, email, or send us your requirement.',
  path: '/contact',
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/contact');

  return (
    <main className="min-h-screen bg-bg-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-40 pb-16">
        <Container>
          <p className="text-[#989898] text-xs font-medium uppercase tracking-widest mb-4">
            Let&apos;s Talk Steel
          </p>
          <h1 className="text-text-primary font-bold text-5xl lg:text-7xl leading-none mb-6 max-w-2xl">
            <SplitTextReveal>Contact Us</SplitTextReveal>
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-xl">
            Tell us what you&apos;re building. Our team will help you find the right product, grade,
            and quantity, usually within one business day.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
                  Factory Address
                </p>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-abs-blue shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href="https://maps.app.goo.gl/ndS6gDkZd79UAnQt6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-body text-sm leading-relaxed hover:text-white transition-colors duration-200"
                  >
                    Jalan Industrial Complex, Gate No. 1, Domjur, NH6,
                    <br />
                    Howrah, 711411, West Bengal, India
                  </a>
                </div>
              </div>

              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
                  Corporate Office
                </p>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-abs-blue shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href="https://maps.app.goo.gl/zZGrM6QpyX4g2xDJ9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-body text-sm leading-relaxed hover:text-white transition-colors duration-200"
                  >
                    Eco Space Business Towers, Tower 5A, Unit 0804,
                    <br />
                    Plot IIF/13, New Town, West Bengal, 700160
                  </a>
                </div>
              </div>

              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
                  Direct Lines
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+919007211599"
                    className="flex items-center gap-3 text-text-body text-sm hover:text-white transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 text-abs-blue shrink-0" aria-hidden="true" />
                    +91 90072 11599
                  </a>
                  <a
                    href="https://wa.me/919831118255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-body text-sm hover:text-white transition-colors duration-200"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-abs-blue shrink-0" />
                    WhatsApp: +91 98311 18255
                  </a>
                  <a
                    href="mailto:viren@anilbalajisteel.com"
                    className="flex items-center gap-3 text-text-body text-sm hover:text-white transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-abs-blue shrink-0" aria-hidden="true" />
                    viren@anilbalajisteel.com
                  </a>
                </div>
              </div>

              <div className="border border-border-subtle aspect-video overflow-hidden bg-bg-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5599.549247185581!2d88.21665691222046!3d22.598834581879974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027fab8be7a7c3%3A0x8582f2cf79933745!2sAnil%20Balaji%20Steel!5e1!3m2!1sen!2sin!4v1783512839022!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  title="Anil Balaji Steel location map"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
