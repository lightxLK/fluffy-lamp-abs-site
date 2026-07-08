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
    name: 'Rolling Shutter Profiles',
    brandLine: 'ABS ShaktiShutter™',
    slug: 'shutter',
    tagline: 'The profile Eastern India trusts most',
    category: 'Profiles',
    description:
      'High-quality, precision-engineered profiles in GI, CR, and PPGL with protective film technology. Flat, round, diamond, gear, and perforated, one of the widest design ranges in the market.',
    capacity: '15,000 MT / year',
  },
  {
    name: 'Shutter Accessories',
    brandLine: 'ABS TotalShutter™ System',
    slug: 'shutter-accessories',
    tagline: 'Every part for a complete installation',
    category: 'Accessories',
    description:
      'Complete range of accessories including guide channels, springs, hood covers, lock plates, bracket plates, and ready-made bottom plates, everything under one roof.',
    capacity: '20,000 MT / year',
  },
  {
    name: 'Steel Pipes & Tubes',
    brandLine: 'ABS FlowPipe™ Series',
    slug: 'pipes',
    tagline: 'Round, square, RHS, any section',
    category: 'Pipes',
    description:
      'High-quality HR and GP pipes in MS, GP, and stainless steel. Round, square, and RHS sections across a full dimension range for structural and fluid-carrying use.',
    capacity: '6,000 MT / year',
  },
  {
    name: 'Roofing Sheets',
    brandLine: 'ABS BlueShield™ System',
    slug: 'sheet',
    tagline: 'Industrial-grade weather protection',
    category: 'Sheets',
    description:
      'PPGL roofing sheets with exceptional strength and weather resistance at reduced cost. Ideal for industrial sheds, warehouses, and residential roofing.',
    capacity: '6,000 MT / year',
  },
  {
    name: 'Chequered Plate',
    brandLine: 'ABS GripDeck™ Series',
    slug: 'chequered-plate',
    tagline: 'Raised-diamond tread, built for grip',
    category: 'Plates',
    description:
      'Durable chequered plates with a raised diamond tread pattern for anti-slip flooring, walkways, and platforms, engineered for traction and heavy-duty industrial use.',
    capacity: '5,000 MT / year',
  },
  {
    name: 'Plain Sheets',
    brandLine: 'ABS EdgeCut™ Series',
    slug: 'plain-sheets',
    tagline: 'Precision cut, flat, and finished',
    category: 'Processed Steel',
    description:
      'Advanced cutting line ensuring precision, flatness, and finish in GI, CR, HR, and PPGL materials, cut to length, stack-ready.',
    capacity: '24,000 MT / year',
  },
];
