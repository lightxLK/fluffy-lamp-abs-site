export interface Point {
  x: number;
  y: number;
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
