import { SITE_URL } from '@/lib/env';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Anil Balaji Steel Pvt. Ltd.',
    url: SITE_URL,
    telephone: '+919007211599',
    email: 'viren@anilbalajisteel.com',
    foundingDate: '1975',
    description: "Eastern India's most trusted steel manufacturer and distributor.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jalan Industrial Complex, Gate No. 1, Domjur, NH6',
      addressLocality: 'Howrah',
      addressRegion: 'West Bengal',
      postalCode: '711411',
      addressCountry: 'IN',
    },
    areaServed: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Assam', 'Tripura'],
  };
}
