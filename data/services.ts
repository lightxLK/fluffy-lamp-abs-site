export interface ServiceStep {
  label: string;
  body: string;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image?: string;
  process?: ServiceStep[];
  applications?: string[];
  specs?: { label: string; value: string }[];
  benefits?: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'cutting',
    name: 'Cutting',
    tagline: 'Sheets that fit the first time',
    image: '/services/cutting.webp',
    description:
      "Our cut-to-length service delivers steel sheets in the exact dimensions your project or customer demands. Whether you're dealing in roofing sheets or shutter panels, get stack-ready sheets without the extra work.",
    applications: [
      'Roofing panels',
      'Shutter and cladding sheets',
      'Cut stock for sheet metal work',
    ],
    specs: [
      { label: 'Lengths', value: '2 ft – 20 ft' },
      { label: 'Width', value: 'Up to 1250 mm' },
      { label: 'Thickness', value: '0.3 mm – 2.5 mm' },
      { label: 'Materials', value: 'GP, HR, PPGL' },
    ],
    benefits: [
      'Ready-to-use sheets with clean edges',
      'Saves cutting time and labour',
      'Ideal for fast-moving dealer operations',
    ],
  },
  {
    slug: 'slitting',
    name: 'Slitting',
    tagline: 'Coils, cut to perform',
    image: '/services/slitting.webp',
    description:
      'ABS provides precision slitting services in custom widths. Our high-speed slitting line ensures tight tolerances, clean edges, and uniform quality across the coil.',
    applications: [
      'Roll-forming input coils',
      'Slats for shutters and cladding',
      'Roofing sheet stock prep',
    ],
    specs: [
      { label: 'Widths', value: '50 mm – 1250 mm' },
      { label: 'Thickness', value: '0.3 mm – 2.5 mm' },
      { label: 'Materials', value: 'HR, CR, GP, Colour-Coated' },
    ],
    benefits: [
      'Consistent slit quality, burr-free',
      'Minimizes scrap and offcut loss',
      'Fast processing for both bulk and small orders',
    ],
  },
  {
    slug: 'fabrication',
    name: 'Fabrication',
    tagline: 'Steel, designed your way',
    description:
      'Gates, PED Structures, Railings, Grills and custom components, designed and fabricated in-house, from concept to installation.',
    process: [
      {
        label: 'Strategic Consultation',
        body: 'We begin by understanding intent, constraints, and context, aligning ideas with feasibility, logic, and execution clarity before a single line is drawn.',
      },
      {
        label: 'Design Development',
        body: 'Our in-house team translates concepts into detailed, build-ready drawings, balancing aesthetics, structural integrity, and fabrication practicality.',
      },
      {
        label: 'Precision Fabrication',
        body: 'Every component is crafted with controlled processes and skilled workmanship, ensuring consistency, accuracy, and durability across bespoke steel elements of any complexity.',
      },
      {
        label: 'Seamless Installation',
        body: 'Installation is treated as its own design phase, executed by experienced teams for alignment, finish quality, and on-site precision without disrupting surrounding architecture.',
      },
      {
        label: 'Lifecycle Support',
        body: 'We stay involved after delivery, offering guidance and technical assistance to ensure long-term performance and continued value.',
      },
    ],
  },
];
