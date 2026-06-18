export interface Product {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Rolling Shutter Profiles',
    slug: 'shutter',
    tagline: 'The profile Eastern India trusts most',
    category: 'Profiles',
    description:
      'Cold-rolled steel laths for industrial and commercial shutters. Flat, round, diamond, gear, and perforated profiles.',
  },
  {
    name: 'Shutter Accessories',
    slug: 'shutter-accessories',
    tagline: 'Every part for a complete installation',
    category: 'Accessories',
    description:
      'Side frames, bottom rails, guide channels, locks, and springs — everything your shutter needs.',
  },
  {
    name: 'Steel Pipes & Tubes',
    slug: 'pipes',
    tagline: 'Round, square, rectangular — any section',
    category: 'Pipes',
    description:
      'Structural and fluid-carrying pipes in ERW and seamless variants. Custom lengths available.',
  },
  {
    name: 'Roofing Sheets',
    slug: 'sheet',
    tagline: 'Industrial-grade weather protection',
    category: 'Sheets',
    description:
      'Corrugated and trapezoidal galvanised sheets for industrial sheds, warehouses, and residential use.',
  },
  {
    name: 'Pre-Engineered Sheds',
    slug: 'shed',
    tagline: 'Steel structures delivered ready to build',
    category: 'Structures',
    description:
      'Factory-fabricated shed kits for fast site assembly. Available in standard and custom spans.',
  },
  {
    name: 'Steel Coils',
    slug: 'coils',
    tagline: 'Prime HR/CR coils for downstream processors',
    category: 'Coils',
    description:
      'Hot-rolled and cold-rolled coils from SAIL, Tata, and JSW. Consistent gauge, fast dispatch.',
  },
  {
    name: 'Flat Bars & Angles',
    slug: 'flats',
    tagline: 'Structural sections for every frame',
    category: 'Sections',
    description:
      'Flat bars, equal angles, and unequal angles in mild steel. Cut to length or in standard 6m lengths.',
  },
];
