export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
}

export const NEWS: NewsArticle[] = [
  {
    slug: 'abs-fabrica-launched',
    title: 'ABS Fabrica Launches, Led by Ms. Komal Agarwal',
    date: '2024-03-01',
    excerpt:
      'A landmark diversification from B2B to B2C; ABS Fabrica brings turnkey automated gates, terrace gardens, and architectural facade design directly to consumers.',
    body: [
      "Steel built Anil Balaji Steel's first fifty years. Our next chapter is inviting steel into people's homes, translating ABS's material strength into custom gates, grills, facades, and landscape installations.",
      'The launch marks ABS’s first move from business-to-business steel supply into direct business-to-consumer design and installation. The vertical is targeting 200 projects over its first five years, at an average project value of 20 lakh rupees, with a focus on turnkey automated gates, terrace gardens, and architectural facade design.',
    ],
  },
  {
    slug: 'steel-that-cares-csr-initiative',
    title: '"Steel That Cares", Our CSR Identity Takes Shape',
    date: '2023-11-15',
    excerpt:
      'Using our core expertise in steel fabrication for social good, starting with a modular, weather-protected shelter project for stray dogs.',
    body: [
      'At Anil Balaji Steel, we believe that true strength lies not only in what we build, but also in how we give back. "Steel That Cares" was born from this philosophy, using our core expertise in steel fabrication for social good.',
      'Our first project under this initiative is a stray dog shelter, modular, weather-protected shelters using PPGL roofing and fabricated structures, blending compassion with engineering to offer dignity and protection to those who cannot ask for it.',
      'Alongside this, ABS sponsors education support for children of our employees, with mentorship and career counselling to help them choose the right path.',
      'From 2026 onward, "Steel That Cares" will expand into a structured CSR programme covering animal welfare, skill-building workshops, and local community upliftment around our Jangalpur facility, delivered in partnership with NGOs and schools.',
    ],
  },
  {
    slug: 'automation-integration-2025',
    title: 'PET Strapping Automation Integrated With Roll-Forming Lines',
    date: '2025-02-10',
    excerpt:
      'Streamlining operations and reducing manual dependency across our Jangalpur manufacturing facility.',
    body: [
      'ABS has successfully integrated PET strapping automation with its roll-forming lines at the 60,000 sq. ft. Jangalpur facility, streamlining operations and reducing manual dependency across the production floor.',
      'This builds on the modernization programme begun in 2018, which brought advanced roll-forming and slitting lines to the facility, and follows the 2020 rollout of digital dashboards and ERP integration across the dealer network.',
      'Combined with IoT-ready monitoring for coil handling, the upgrade supports ABS’s Industry 4.0 roadmap targeted for 2028.',
    ],
  },
  {
    slug: 'vision-2030-national-service',
    title: 'Vision 2030: Scaling Responsibly, Serving the Nation',
    date: '2025-08-01',
    excerpt:
      'Capacity expansion, smart manufacturing, and a 500+ dealer network; ABS charts its path to an SME IPO listing by 2030.',
    body: [
      'The future of Anil Balaji Steel is anchored in purpose, to scale responsibly, innovate consistently, and serve the nation with strength and sincerity. Our ultimate milestone: listing on the SME IPO platform by 2030.',
      'The roadmap includes enhancing production by 50%+ across all lines by 2027, integrating Industry 4.0 technologies by 2028, and expanding the dealer network to 500+ partners by 2029.',
      'ABS Fabrica is targeted to scale to 1,000+ projects in five years, while "Steel That Cares" formalizes into a full CSR vertical with integrated ESG reporting.',
      'ABS is also investing in its people, establishing in-house training programmes for workers and young engineers to build a skilled, future-ready workforce grounded in technical and ethical excellence.',
      'The brand ambition is equally clear: to be positioned among the top 3 steel solutions brands in Eastern India, and recognised nationally, through sustained marketing and digital transformation.',
    ],
  },
];
