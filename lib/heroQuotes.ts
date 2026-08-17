export const HERO_QUOTES: string[] = [
  'Built for India. Built to Last.',
  'Steel That Builds With Care.',
  'More Than Steel. A Lasting Legacy.',
  'Steel That Shapes India.',
  'Built on Steel. Driven by Trust.',
  'Steel Meets Strength. Strength Meets Trust.',
  'For What India Builds Next.',
  'Rebuilt for Tomorrow. Rooted in Trust.',
  'A New Look. The Same Steel.',
  'More Than New. A New Direction.',
  'The Steel You Know. Reimagined for Tomorrow.',
  "You Know the Steel. Meet What's Next.",
  "The Legacy You Know. The Future We're Building.",
  'Built Then. Reimagined Now. Ready for Tomorrow.',
  '50 Years Strong. A New Chapter Begins.',
  "From Howrah to India's Heart.",
  'Forged in Experience. Built for India.',
  'Steel That Moves India Forward.',
  'India Builds. We Build India.',
  'Strong Enough for Today. Ready for Tomorrow.',
  'When India Builds, We Build Too.',
  "The Strength Behind What's Next.",
  'Steel That Stands Behind Every Build.',
  'Made to Build. Built to Endure.',
  'Precision in Steel. Purpose in Build.',
  'Steel Works Harder. Your Build Goes Further.',
  'Not Just Steel. The Confidence to Build.',
  'Built to Last. Made to Matter.',
  'What We Build, India Builds On.',
  "The Future Won't Wait. Build It Strong.",
];

// Fisher-Yates: a fresh, unbiased random ordering to cycle through so every
// quote surfaces once per lap before any repeats.
export function shuffleHeroQuoteOrder(): number[] {
  const order = HERO_QUOTES.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
