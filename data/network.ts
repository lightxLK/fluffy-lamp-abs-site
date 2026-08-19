export interface NetworkState {
  slug: string;
  name: string;
  dealers: number;
  /** Line-art outline SVG, dropped in at this path once ready. */
  svgSrc: string;
}

// Dealer counts per source deck (Kolkata/5.jpg–10.jpg). Order controls table order.
export const NETWORK_STATES: NetworkState[] = [
  { slug: 'west-bengal', name: 'West Bengal', dealers: 322, svgSrc: '/states/west-bengal.svg' },
  { slug: 'odisha', name: 'Odisha', dealers: 21, svgSrc: '/states/odisha.svg' },
  { slug: 'jharkhand', name: 'Jharkhand', dealers: 16, svgSrc: '/states/jharkhand.svg' },
  { slug: 'bihar', name: 'Bihar', dealers: 15, svgSrc: '/states/bihar.svg' },
  { slug: 'assam', name: 'Assam', dealers: 35, svgSrc: '/states/assam.svg' },
  { slug: 'tripura', name: 'Tripura', dealers: 7, svgSrc: '/states/tripura.svg' },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh', dealers: 11, svgSrc: '/states/uttarpradesh.svg' },
];

export const DEFAULT_NETWORK_STATE_SLUG = 'west-bengal';

const MAX_DOTS = 30;
const maxDealers = Math.max(...NETWORK_STATES.map((s) => s.dealers));

/** Dot count scales proportionally to the largest state's dealer count, capped at 30. */
export function dotCountFor(dealers: number): number {
  return Math.max(1, Math.round((dealers / maxDealers) * MAX_DOTS));
}
