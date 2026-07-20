export interface ServiceStep {
  label: string;
  body: string;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  process: ServiceStep[];
  specs?: { label: string; value: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: 'spl',
    name: 'Single Point Loading (SPL)',
    tagline: 'One dock, full order, no delay',
    description:
      'Our Single Point Loading service consolidates order scheduling, material prep, and dispatch through one coordinated line, fewer handoffs, faster turnaround.',
    process: [
      {
        label: 'Order Received',
        body: 'Order specification logged against live stock and mill schedule.',
      },
      { label: 'Scheduling', body: 'Production and dispatch slotted into the loading calendar.' },
      {
        label: 'Material Prep',
        body: 'Coil, profile, or sheet staged and inspected ahead of loading.',
      },
      {
        label: 'Loading',
        body: 'Single-point loading onto the outbound vehicle, sequenced by drop.',
      },
      { label: 'Dispatch', body: 'Vehicle cleared with documentation and tracked to site.' },
    ],
  },
  {
    slug: 'cutting',
    name: 'Cutting',
    tagline: 'Sheets that fit the first time',
    description:
      'Our cut-to-length service delivers steel sheets and pipes in the exact dimensions your project demands, stack-ready, without extra work on site.',
    process: [
      {
        label: 'Sheet & Pipe Cutting',
        body: 'Roofing sheets, shutter panels, and pipe sections cut to length.',
      },
      { label: 'Angle & Section Cutting', body: 'Structural angles and sections cut to drawing.' },
      { label: 'Custom Cutting', body: 'Non-standard lengths and profiles cut to order.' },
    ],
    specs: [
      { label: 'Lengths', value: '2 ft – 20 ft' },
      { label: 'Width', value: 'Up to 1250 mm' },
      { label: 'Thickness', value: '0.3 mm – 2.5 mm' },
      { label: 'Materials', value: 'GP, HR, CR, PPGL' },
    ],
  },
  {
    slug: 'slitting',
    name: 'Slitting',
    tagline: 'Coils, cut to perform',
    description:
      'ABS provides precision slitting services in custom widths. Our high-speed slitting line ensures tight tolerances, clean edges, and uniform quality across the coil.',
    process: [
      {
        label: 'Master Coil Load',
        body: 'Full-width coil loaded onto the slitting line uncoiler.',
      },
      { label: 'Blade Setup', body: 'Slitter blades set to the ordered width tolerance.' },
      {
        label: 'Slitting Pass',
        body: 'Coil passes through the slitter in a single continuous run, burr-free.',
      },
      { label: 'Recoiling', body: 'Slit strips recoiled individually for handling and dispatch.' },
    ],
    specs: [
      { label: 'Widths', value: '50 mm – 1250 mm' },
      { label: 'Thickness', value: '0.3 mm – 2.5 mm' },
      { label: 'Materials', value: 'HR, CR, GP, Colour-Coated' },
    ],
  },
  {
    slug: 'fabrication',
    name: 'Fabrication',
    tagline: 'Steel, designed your way',
    description:
      'Shutter gates, kabon structures, motorized gates, and custom components, designed and fabricated in-house, from concept to installation.',
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
