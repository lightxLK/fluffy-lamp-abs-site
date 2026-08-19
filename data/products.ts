export interface Product {
  name: string;
  brandLine: string;
  slug: string;
  tagline: string;
  category: string;
  description: string;
  capacity: string;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Rolling Shutter Gates',
    brandLine: 'ABS Shakti Shutter™',
    slug: 'shutter',
    tagline: 'One of the most diverse profile offerings in the sector',
    category: 'Profiles',
    description:
      'High-quality, precision-engineered profiles in GI, CR, and PPGL with special protective guard film. Flat, super flat, diamond, gear, and perforated profiles, alongside bottom plates, springs, lock plates, hood covers, and bracket plates.',
    capacity: '15,000 MT / year',
  },
  {
    name: 'Pipes',
    brandLine: 'ABS Flow Pipe™',
    slug: 'pipes',
    tagline: 'Round, square and RHS, in MS, GP and stainless steel',
    category: 'Pipes',
    description:
      'High-quality HR and GP pipes in mild steel, galvanised pipe, and stainless steel. Round, square, and RHS sections across a full dimension range.',
    capacity: '6,000 MT / year',
  },
  {
    name: 'Roofing Sheets',
    brandLine: 'ABS Blue Shield™',
    slug: 'sheet',
    tagline: 'PPGL roofing, built for Indian weather',
    category: 'Sheets',
    description:
      'PPGL roofing sheets with exceptional strength and weather resistance at significantly reduced prices, ideal for industrial and residential projects.',
    capacity: '6,000 MT / year',
  },
  {
    name: 'Shutter Accessories',
    brandLine: 'ABS Total Shutter™',
    slug: 'shutter-accessories',
    tagline: 'Every component for a complete installation',
    category: 'Accessories',
    description:
      'Complete range of accessories including clips, pulleys, U clamps, kakda, collapsible gate wheels, chain pulley sets, gear boxes, shutter motors, and more, everything under one roof.',
    capacity: '20,000 MT / year',
  },
  {
    name: 'Plain Sheets',
    brandLine: 'ABS Edge Cut™',
    slug: 'plain-sheets',
    tagline: 'GI, CR, HR and PPGL, cut to length',
    category: 'Processed Steel',
    description:
      'Advanced cutting line ensuring precision, flatness, and finish in GI, CR, HR, and PPGL materials, cut to length, stack-ready.',
    capacity: '24,000 MT / year',
  },
  {
    name: 'Slit & Pencil Coils',
    brandLine: 'ABS Coreline™',
    slug: 'coils',
    tagline: 'Precision slitting, held to tight tolerance',
    category: 'Coils',
    description:
      'State-of-the-art slitting with rigorous quality checks for dimensional accuracy and consistency, delivering slit coil and pencil coil to tight tolerance.',
    capacity: '30,000 MT / year',
  },
  {
    name: 'Cutting & Grinding Wheels',
    brandLine: 'Abrasives',
    slug: 'abrasives',
    tagline: 'Wheels for every cutting and finishing job',
    category: 'Abrasives',
    description:
      'A full range of cutting and grinding wheels engineered for clean cuts and consistent stock removal across steel fabrication and finishing work.',
    capacity: 'Stocked, ready to dispatch',
  },
];
