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
 * into one polygon per M...Z subpath. Cubic curves are sampled (10 segments),
 * not exact — good enough for bbox + point-in-polygon use, not for
 * re-rendering the path itself.
 */
export function parsePathToSubpolygons(d: string): Point[][] {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  if (!tokens) return [];

  let i = 0;
  let cur: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let cmd = '';
  const subpolys: Point[][] = [];
  let pts: Point[] = [];

  const num = () => parseFloat(tokens[i++]);

  const cubic = (x1: number, y1: number, x2: number, y2: number, x: number, y: number) => {
    for (let t = 0.1; t <= 1.0001; t += 0.1) {
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
        if (pts.length) subpolys.push(pts);
        pts = [];
        cur = { x: num(), y: num() };
        start = { ...cur };
        pts.push({ ...cur });
        cmd = 'L';
        break;
      case 'm':
        if (pts.length) subpolys.push(pts);
        pts = [];
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

  if (pts.length) subpolys.push(pts);
  return subpolys;
}

/** Flattens every subpath into one merged point list (bbox/rough-shape use only). */
export function parsePathToPolygon(d: string): Point[] {
  return parsePathToSubpolygons(d).flat();
}

/** Shoelace formula; sign indicates winding direction. */
export function polygonArea(poly: Point[]): number {
  let area = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    area += poly[j].x * poly[i].y - poly[i].x * poly[j].y;
  }
  return area / 2;
}

/**
 * Picks the subpath enclosing the most area — the state's outer silhouette —
 * out of every subpath across every path in the SVG (ribbon-style line art
 * traces both edges of the drawn border as separate subpaths, plus any small
 * disconnected islands; the outer contour is what "inside the state" means).
 */
export function pickOuterPolygon(pathDataList: string[]): Point[] {
  let best: Point[] = [];
  let bestArea = -Infinity;
  for (const d of pathDataList) {
    for (const poly of parsePathToSubpolygons(d)) {
      const area = Math.abs(polygonArea(poly));
      if (area > bestArea) {
        bestArea = area;
        best = poly;
      }
    }
  }
  return best;
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

const MARGIN_PROBE_OFFSETS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

/**
 * Rejection-samples `count` points inside the polygon, using a seed derived
 * from a string (e.g. state slug) so the scatter is stable per state. Also
 * probes a small ring around each candidate so dots land comfortably inside
 * the shape rather than hugging its boundary.
 */
export function samplePointsInPolygon(poly: Point[], count: number, seedStr: string): Point[] {
  if (poly.length < 3) return [];
  const bbox = polygonBBox(poly);
  const margin = Math.max(bbox.maxX - bbox.minX, bbox.maxY - bbox.minY) * 0.035;
  const rand = mulberry32(hashString(seedStr));
  const result: Point[] = [];
  let attempts = 0;
  const maxAttempts = count * 800;

  while (result.length < count && attempts < maxAttempts) {
    attempts++;
    const x = bbox.minX + rand() * (bbox.maxX - bbox.minX);
    const y = bbox.minY + rand() * (bbox.maxY - bbox.minY);
    const pt = { x, y };
    if (!pointInPolygon(pt, poly)) continue;
    const clearOfEdge = MARGIN_PROBE_OFFSETS.every((o) =>
      pointInPolygon({ x: x + o.x * margin, y: y + o.y * margin }, poly),
    );
    if (clearOfEdge) result.push(pt);
  }

  // Edge-clearance probe found fewer than requested (small/thin shape) — fall
  // back to plain inside-polygon points so we still hit the target count.
  if (result.length < count) {
    attempts = 0;
    while (result.length < count && attempts < maxAttempts) {
      attempts++;
      const x = bbox.minX + rand() * (bbox.maxX - bbox.minX);
      const y = bbox.minY + rand() * (bbox.maxY - bbox.minY);
      if (pointInPolygon({ x, y }, poly)) result.push({ x, y });
    }
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

/** 2D affine matrix: x' = a*x + c*y + e, y' = b*x + d*y + f. */
export interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export const IDENTITY_MATRIX: Matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

function isIdentityMatrix(m: Matrix): boolean {
  return m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1 && m.e === 0 && m.f === 0;
}

/** Composes A ∘ B, i.e. applying the result to a point equals A(B(point)). */
export function multiplyMatrix(A: Matrix, B: Matrix): Matrix {
  return {
    a: A.a * B.a + A.c * B.b,
    b: A.b * B.a + A.d * B.b,
    c: A.a * B.c + A.c * B.d,
    d: A.b * B.c + A.d * B.d,
    e: A.a * B.e + A.c * B.f + A.e,
    f: A.b * B.e + A.d * B.f + A.f,
  };
}

export function applyMatrix(pt: Point, m: Matrix): Point {
  return { x: m.a * pt.x + m.c * pt.y + m.e, y: m.b * pt.x + m.d * pt.y + m.f };
}

/** Parses an SVG `transform` attribute (translate/scale/matrix/rotate) into a single matrix. */
export function parseTransformAttr(transformStr: string | null | undefined): Matrix {
  if (!transformStr) return IDENTITY_MATRIX;

  let acc = IDENTITY_MATRIX;
  const re = /(\w+)\s*\(([^)]*)\)/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(transformStr)) !== null) {
    const fn = m[1];
    const args = m[2]
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);

    let token: Matrix = IDENTITY_MATRIX;
    if (fn === 'matrix' && args.length === 6) {
      const [a, b, c, d, e, f] = args;
      token = { a, b, c, d, e, f };
    } else if (fn === 'translate') {
      const [tx, ty = 0] = args;
      token = { a: 1, b: 0, c: 0, d: 1, e: tx, f: ty };
    } else if (fn === 'scale') {
      const [sx, sy = sx] = args;
      token = { a: sx, b: 0, c: 0, d: sy, e: 0, f: 0 };
    } else if (fn === 'rotate') {
      const [angle, cx = 0, cy = 0] = args;
      const rad = (angle * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rotation: Matrix = { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 };
      token =
        cx || cy
          ? multiplyMatrix(multiplyMatrix({ a: 1, b: 0, c: 0, d: 1, e: cx, f: cy }, rotation), {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: -cx,
              f: -cy,
            })
          : rotation;
    }

    acc = multiplyMatrix(acc, token);
  }

  return acc;
}

/**
 * Re-serializes an SVG path `d` with every coordinate passed through `matrix`,
 * normalizing all segments to absolute M/L/C/Z (H/V and relative variants are
 * converted along the way — safer than transforming relative deltas).
 */
export function transformPathD(d: string, matrix: Matrix): string {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  if (!tokens) return d;

  let i = 0;
  let cur: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let cmd = '';
  const out: string[] = [];

  const num = () => parseFloat(tokens[i++]);
  const fmt = (n: number) => Number(n.toFixed(3));
  const emitPoint = (letter: string, p: Point) => {
    const t = applyMatrix(p, matrix);
    out.push(`${letter}${fmt(t.x)} ${fmt(t.y)}`);
  };

  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
    switch (cmd) {
      case 'M':
        cur = { x: num(), y: num() };
        start = { ...cur };
        emitPoint('M', cur);
        cmd = 'L';
        break;
      case 'm':
        cur = { x: cur.x + num(), y: cur.y + num() };
        start = { ...cur };
        emitPoint('M', cur);
        cmd = 'l';
        break;
      case 'L':
        cur = { x: num(), y: num() };
        emitPoint('L', cur);
        break;
      case 'l':
        cur = { x: cur.x + num(), y: cur.y + num() };
        emitPoint('L', cur);
        break;
      case 'H':
        cur = { x: num(), y: cur.y };
        emitPoint('L', cur);
        break;
      case 'h':
        cur = { x: cur.x + num(), y: cur.y };
        emitPoint('L', cur);
        break;
      case 'V':
        cur = { x: cur.x, y: num() };
        emitPoint('L', cur);
        break;
      case 'v':
        cur = { x: cur.x, y: cur.y + num() };
        emitPoint('L', cur);
        break;
      case 'C': {
        const x1 = num();
        const y1 = num();
        const x2 = num();
        const y2 = num();
        const x = num();
        const y = num();
        const t1 = applyMatrix({ x: x1, y: y1 }, matrix);
        const t2 = applyMatrix({ x: x2, y: y2 }, matrix);
        cur = { x, y };
        const t = applyMatrix(cur, matrix);
        out.push(`C${fmt(t1.x)} ${fmt(t1.y)}, ${fmt(t2.x)} ${fmt(t2.y)}, ${fmt(t.x)} ${fmt(t.y)}`);
        break;
      }
      case 'c': {
        const x1 = cur.x + num();
        const y1 = cur.y + num();
        const x2 = cur.x + num();
        const y2 = cur.y + num();
        const x = cur.x + num();
        const y = cur.y + num();
        const t1 = applyMatrix({ x: x1, y: y1 }, matrix);
        const t2 = applyMatrix({ x: x2, y: y2 }, matrix);
        cur = { x, y };
        const t = applyMatrix(cur, matrix);
        out.push(`C${fmt(t1.x)} ${fmt(t1.y)}, ${fmt(t2.x)} ${fmt(t2.y)}, ${fmt(t.x)} ${fmt(t.y)}`);
        break;
      }
      case 'Z':
      case 'z':
        cur = { ...start };
        out.push('Z');
        break;
      default:
        i++;
        break;
    }
  }

  return out.join(' ');
}

/** Extracts viewBox + every path's `d`, baking in each path's ancestor transform chain. */
export function parseStateSvg(svgText: string): ParsedStateSvg | null {
  // Parsed as HTML (foreign-content rules), not XML: real-world SVG exports
  // (potrace, Illustrator, Figma…) routinely ship a stray leading blank line,
  // BOM, or legacy DOCTYPE before the XML declaration, which a strict XML
  // parser rejects outright. The HTML parser shrugs those off.
  const doc = new DOMParser().parseFromString(svgText, 'text/html');
  const svg = doc.querySelector('svg');
  if (!svg) return null;

  const viewBox = svg.getAttribute('viewBox') ?? '0 0 100 100';

  const pathData = Array.from(doc.querySelectorAll('path'))
    .map((p) => {
      const d = p.getAttribute('d');
      if (!d) return null;

      // Ancestor chain outermost -> innermost (excluding the <svg> root).
      const ancestors: Element[] = [];
      let el: Element | null = p.parentElement;
      while (el && el !== svg) {
        ancestors.unshift(el);
        el = el.parentElement;
      }

      const matrix = ancestors.reduce(
        (acc, node) => multiplyMatrix(acc, parseTransformAttr(node.getAttribute('transform'))),
        IDENTITY_MATRIX,
      );

      return isIdentityMatrix(matrix) ? d : transformPathD(d, matrix);
    })
    .filter((d): d is string => Boolean(d));

  if (!pathData.length) return null;
  return { viewBox, pathData };
}
