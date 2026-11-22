import { describe, expect, it } from 'vitest';
import {
  absFromPercentT,
  emr,
  ihd,
  isotopePattern,
  lambdaInMedium,
  pascal,
  percentTFromAbs,
  solveBeer,
} from './calc';

const close = (a: number, b: number, rel = 0.01) => expect(Math.abs(a - b) / Math.abs(b)).toBeLessThan(rel);

describe('Slide 17: %T → A', () => {
  it('33.6 → 0.474', () => close(absFromPercentT(33.6), 0.474, 0.002));
  it('92.1 → 0.0357', () => close(absFromPercentT(92.1), 0.0357, 0.005));
  it('1.75 → 1.76', () => close(absFromPercentT(1.75), 1.757, 0.002));
  it('rejects %T outside 0–100', () => {
    expect(() => absFromPercentT(0)).toThrow();
    expect(() => absFromPercentT(120)).toThrow();
  });
});

describe('Slide 18 homework: A → %T', () => {
  it('0.375 → 42.2', () => close(percentTFromAbs(0.375), 42.2, 0.002));
  it('1.325 → 4.73', () => close(percentTFromAbs(1.325), 4.73, 0.002));
  it('0.012 → 97.3', () => close(percentTFromAbs(0.012), 97.3, 0.002));
});

describe('Slide 18 homework: frequency and wavelength', () => {
  it('X-ray 2.65 Å → 1.13e18 Hz', () => close(emr(2.65, 'A').hz, 1.13e18));
  it('Microwave 1.86 cm → 1.61e10 Hz', () => close(emr(1.86, 'cm').hz, 1.61e10));
  it('114.10 kHz → 2.63e5 cm', () => close(emr(114.1e3, 'Hz').lambdaCm, 2.63e5));
  it('1210 cm⁻¹ → 8.26e-4 cm', () => close(emr(1210, 'cm-1').lambdaCm, 8.26e-4));
  it('Na 589 nm in η = 1.35 → 436 nm', () => close(lambdaInMedium(589, 1.35), 436.3, 0.002));
});

describe('Slide 9 example', () => {
  it('2000 cm⁻¹ → 3.98e-20 J', () => close(emr(2000, 'cm-1').joule, 3.98e-20));
  it('2000 cm⁻¹ is infrared', () => expect(emr(2000, 'cm-1').region).toBe('Infrared'));
});

describe('Slide 6: water', () => {
  it('c / 1.33 = 2.26e10 cm/s', () => close(2.998e10 / 1.33, 2.26e10, 0.005));
});

describe('Beer-Lambert solver', () => {
  it('solves c', () => expect(solveBeer({ A: 0.5, e: 10000, b: 1 })).toEqual({ key: 'c', value: 5e-5 }));
  it('solves A', () => close(solveBeer({ e: 10000, b: 1, c: 5e-5 }).value, 0.5));
  it('needs exactly one unknown', () => expect(() => solveBeer({ A: 1 })).toThrow());
});

describe('IHD, Pascal, isotopes', () => {
  it('benzene C6H6 = 4', () => expect(ihd(6, 6)).toBe(4));
  it('C2H3N = 2', () => expect(ihd(2, 3, 1)).toBe(2));
  it('C2H5Br = 0', () => expect(ihd(2, 5, 0, 1)).toBe(0));
  it('quartet 1:3:3:1', () => expect(pascal(3)).toEqual([1, 3, 3, 1]));
  it('septet 1:6:15:20:15:6:1', () => expect(pascal(6)).toEqual([1, 6, 15, 20, 15, 6, 1]));
  it('Cl gives ~3:1', () => close(isotopePattern(1, 0)[1], 31.9, 0.02));
  it('Br gives ~1:1', () => close(isotopePattern(0, 1)[1], 98, 0.02));
});
