export interface Point {
  x: number;
  y: number;
}

export interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Flattens an SVG path's `d` attribute (M/L/C, absolute + relative, plus Z)
 * into a polygon of points. Cubic curves are sampled, not exact — good enough
 * for bbox + point-in-polygon use, not for re-rendering the path itself.
 */
export function parsePathToPolygon(d: string): Point[] {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  if (!tokens) return [];

  let i = 0;
  let cur: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let cmd = '';
  const pts: Point[] = [];

  const num = () => parseFloat(tokens[i++]);

  const cubic = (x1: number, y1: number, x2: number, y2: number, x: number, y: number) => {
    for (let t = 0.2; t <= 1.0001; t += 0.2) {
      const mt = 1 - t;
      const px = mt * mt * mt * cur.x + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x;
      const py = mt * mt * mt * cur.y + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y;
      pts.push({ x: px, y: py });
    }
    cur = { x, y };
  };

  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
    switch (cmd) {
      case 'M':
        cur = { x: num(), y: num() };
        start = { ...cur };
        pts.push({ ...cur });
        cmd = 'L';
        break;
      case 'm':
        cur = { x: cur.x + num(), y: cur.y + num() };
        start = { ...cur };
        pts.push({ ...cur });
        cmd = 'l';
        break;
      case 'L':
        cur = { x: num(), y: num() };
        pts.push({ ...cur });
        break;
      case 'l':
        cur = { x: cur.x + num(), y: cur.y + num() };
        pts.push({ ...cur });
        break;
      case 'H':
        cur = { x: num(), y: cur.y };
        pts.push({ ...cur });
        break;
      case 'h':
        cur = { x: cur.x + num(), y: cur.y };
        pts.push({ ...cur });
        break;
      case 'V':
        cur = { x: cur.x, y: num() };
        pts.push({ ...cur });
        break;
      case 'v':
        cur = { x: cur.x, y: cur.y + num() };
        pts.push({ ...cur });
        break;
      case 'C':
        cubic(num(), num(), num(), num(), num(), num());
        break;
      case 'c': {
        const x1 = cur.x + num();
        const y1 = cur.y + num();
        const x2 = cur.x + num();
        const y2 = cur.y + num();
        const x = cur.x + num();
        const y = cur.y + num();
        cubic(x1, y1, x2, y2, x, y);
        break;
      }
      case 'Z':
      case 'z':
        cur = { ...start };
        pts.push({ ...cur });
        break;
      default:
        // Unsupported command (S/Q/A/T…) — skip its args conservatively.
        i++;
        break;
    }
  }

  return pts;
}

export function polygonBBox(poly: Point[]): BBox {
  const xs = poly.map((p) => p.x);
  const ys = poly.map((p) => p.y);
  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  };
}

/** Even-odd ray casting. */
export function pointInPolygon(pt: Point, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    const intersect = yi > pt.y !== yj > pt.y && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Small deterministic PRNG (mulberry32) so dot layout is stable across renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Rejection-samples `count` points strictly inside the polygon, using a seed
 * derived from a string (e.g. state slug) so the scatter is stable per state.
 */
export function samplePointsInPolygon(poly: Point[], count: number, seedStr: string): Point[] {
  if (poly.length < 3) return [];
  const bbox = polygonBBox(poly);
  const rand = mulberry32(hashString(seedStr));
  const result: Point[] = [];
  let attempts = 0;
  const maxAttempts = count * 400;

  while (result.length < count && attempts < maxAttempts) {
    attempts++;
    const x = bbox.minX + rand() * (bbox.maxX - bbox.minX);
    const y = bbox.minY + rand() * (bbox.maxY - bbox.minY);
    if (pointInPolygon({ x, y }, poly)) result.push({ x, y });
  }

  return result;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

export interface ParsedStateSvg {
  viewBox: string;
  pathData: string[];
}

/** Extracts viewBox + all top-level path `d`s from a raw SVG string. */
export function parseStateSvg(svgText: string): ParsedStateSvg | null {
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg || doc.querySelector('parsererror')) return null;

  const viewBox = svg.getAttribute('viewBox') ?? '0 0 100 100';
  const pathData = Array.from(doc.querySelectorAll('path'))
    .map((p) => p.getAttribute('d'))
    .filter((d): d is string => Boolean(d));

  if (!pathData.length) return null;
  return { viewBox, pathData };
}
