/** Pure calculation helpers. Every function here is covered by src/utils/calc.test.ts. */

export const C_CM = 2.998e10; // speed of light, cm/s
export const C_M = 2.998e8; // m/s
export const H = 6.626e-34; // Planck, J·s
export const NA = 6.022e23;

export function absFromPercentT(pt: number): number {
  if (!(pt > 0 && pt <= 100)) throw new RangeError('%T must be between 0 and 100');
  return 2 - Math.log10(pt);
}

export function percentTFromAbs(a: number): number {
  return Math.pow(10, 2 - a);
}

export type BeerKey = 'A' | 'e' | 'b' | 'c';
export type BeerInput = Partial<Record<BeerKey, number>>;

/** Solve A = ε·b·c for the single missing value. */
export function solveBeer(v: BeerInput): { key: BeerKey; value: number } {
  const keys: BeerKey[] = ['A', 'e', 'b', 'c'];
  const missing = keys.filter((k) => v[k] === undefined || Number.isNaN(v[k]));
  if (missing.length !== 1) throw new Error('Leave exactly one field empty');
  const k = missing[0];
  const { A = 0, e = 0, b = 0, c = 0 } = v;
  switch (k) {
    case 'A':
      return { key: k, value: e * b * c };
    case 'e':
      return { key: k, value: A / (b * c) };
    case 'b':
      return { key: k, value: A / (e * c) };
    default:
      return { key: k, value: A / (e * b) };
  }
}

export type EmrUnit = 'cm-1' | 'nm' | 'um' | 'A' | 'cm' | 'Hz';

export interface EmrResult {
  lambdaCm: number;
  nm: number;
  hz: number;
  wavenumber: number;
  joule: number;
  kjPerMol: number;
  region: string;
}

export function emr(value: number, unit: EmrUnit): EmrResult {
  if (!(value > 0)) throw new RangeError('Enter a positive value');
  let lambdaCm: number;
  switch (unit) {
    case 'cm-1':
      lambdaCm = 1 / value;
      break;
    case 'nm':
      lambdaCm = value * 1e-7;
      break;
    case 'um':
      lambdaCm = value * 1e-4;
      break;
    case 'A':
      lambdaCm = value * 1e-8;
      break;
    case 'cm':
      lambdaCm = value;
      break;
    default:
      lambdaCm = C_CM / value;
  }
  const hz = C_CM / lambdaCm;
  const joule = H * hz;
  const nm = lambdaCm * 1e7;
  return {
    lambdaCm,
    nm,
    hz,
    wavenumber: 1 / lambdaCm,
    joule,
    kjPerMol: (joule * NA) / 1000,
    region: regionOf(nm),
  };
}

export function regionOf(nm: number): string {
  if (nm < 0.01) return 'γ-ray';
  if (nm < 10) return 'X-ray';
  if (nm < 200) return 'Vacuum UV';
  if (nm < 400) return 'UV';
  if (nm < 780) return 'Visible';
  if (nm < 1e6) return 'Infrared';
  if (nm < 1e9) return 'Microwave';
  return 'Radio';
}

/** Wavelength inside a medium of refractive index n (frequency stays constant). */
export function lambdaInMedium(lambdaVacuum: number, n: number): number {
  return lambdaVacuum / n;
}

export function ihd(C: number, Hn: number, N = 0, X = 0): number {
  return (2 * C + 2 + N - Hn - X) / 2;
}

export function pascal(n: number): number[] {
  let row = [1];
  for (let i = 0; i < n; i++) {
    const next = [1];
    for (let j = 1; j < row.length; j++) next.push(row[j - 1] + row[j]);
    next.push(1);
    row = next;
  }
  return row;
}

export const MULT_NAMES = ['singlet', 'doublet', 'triplet', 'quartet', 'quintet', 'sextet', 'septet', 'octet', 'nonet'];

/** Relative isotope pattern M, M+2, M+4… normalised to the tallest = 100. */
export function isotopePattern(nCl: number, nBr: number): number[] {
  const conv = (a: number[], b: number[]) => {
    const r = new Array(a.length + b.length - 1).fill(0);
    a.forEach((x, i) => b.forEach((y, j) => (r[i + j] += x * y)));
    return r;
  };
  let d = [1];
  for (let i = 0; i < nCl; i++) d = conv(d, [0.758, 0.242]);
  for (let i = 0; i < nBr; i++) d = conv(d, [0.505, 0.495]);
  const max = Math.max(...d);
  return d.map((x) => Math.round((x / max) * 1000) / 10);
}

/** Parse a simple formula like C4H8O2 or C2H5Br into element counts. */
export function parseFormula(f: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const m of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
    if (!m[1]) continue;
    out[m[1]] = (out[m[1]] ?? 0) + (m[2] ? parseInt(m[2], 10) : 1);
  }
  return out;
}

export function ihdOfFormula(f: string): number {
  const e = parseFormula(f);
  const X = (e.F ?? 0) + (e.Cl ?? 0) + (e.Br ?? 0) + (e.I ?? 0);
  return ihd(e.C ?? 0, e.H ?? 0, e.N ?? 0, X);
}

const MASS: Record<string, number> = { C: 12, H: 1, N: 14, O: 16, S: 32, F: 19, Cl: 35, Br: 79, I: 127 };

/** Nominal mass using the lightest common isotopes. */
export function nominalMass(f: string): number {
  const e = parseFormula(f);
  return Object.entries(e).reduce((s, [k, n]) => s + (MASS[k] ?? 0) * n, 0);
}

export function fmt(v: number, digits = 4): string {
  if (!Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a !== 0 && (a < 1e-3 || a >= 1e6)) return v.toExponential(3);
  return String(Number(v.toPrecision(digits)));
}
