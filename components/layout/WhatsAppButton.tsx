'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/919007211599"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={[
        'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-abs-blue',
        'flex items-center justify-center shadow-lg',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
    >
      <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
    </a>
  );
}
