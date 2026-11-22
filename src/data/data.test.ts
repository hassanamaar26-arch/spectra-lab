import { describe, expect, it } from 'vitest';
import { LESSONS, QUIZZES } from './index';
import { PROBLEMS } from './spectra/problems';
import { UNITS } from './units';
import { PLAN } from './plan';
import { ihdOfFormula, nominalMass, parseFormula } from '../utils/calc';

describe('Lesson coverage: every slide in each published unit is covered', () => {
  for (const l of LESSONS) {
    it(`${l.id} covers slides ${l.slides[0]}–${l.slides[1]}`, () => {
      const covered = new Set(l.blocks.flatMap((b) => b.slides));
      const missing: number[] = [];
      for (let s = l.slides[0]; s <= l.slides[1]; s++) if (!covered.has(s)) missing.push(s);
      expect(missing).toEqual([]);
      for (const s of covered) expect(s >= l.slides[0] && s <= l.slides[1]).toBe(true);
    });
    it(`${l.id} blocks are complete and ids unique`, () => {
      const ids = new Set<string>();
      for (const b of l.blocks) {
        expect(b.en.length).toBeGreaterThan(20);
        expect(b.ar.length).toBeGreaterThan(10);
        expect(ids.has(b.id)).toBe(false);
        ids.add(b.id);
      }
    });
    it(`${l.id} matches its unit range`, () => {
      const u = UNITS.find((x) => x.id === l.id);
      expect(u?.slides).toEqual(l.slides);
    });
  }
});

describe('Quizzes are valid', () => {
  for (const z of QUIZZES) {
    it(`${z.id} has ≥ 10 questions with valid answers`, () => {
      expect(z.qs.length).toBeGreaterThanOrEqual(10);
      for (const q of z.qs) {
        expect(q.a).toBeGreaterThanOrEqual(0);
        expect(q.a).toBeLessThan(q.o.length);
        expect(new Set(q.o).size).toBe(q.o.length);
        expect(q.why.length).toBeGreaterThan(10);
      }
    });
  }
});

describe('Spectra problems match their formulas', () => {
  for (const p of PROBLEMS) {
    const el = parseFormula(p.formula);
    it(`${p.id}: Σ ¹H integration = H count`, () => {
      expect(p.h1.reduce((s, x) => s + x[1], 0)).toBe(el.H ?? 0);
    });
    it(`${p.id}: IHD step answer = IHD of formula`, () => {
      const step = p.steps.find((s) => /IHD/.test(s.q));
      expect(step).toBeDefined();
      expect(Number(step!.o[step!.a])).toBe(ihdOfFormula(p.formula));
    });
    it(`${p.id}: M⁺ present at nominal mass and nothing above M+2`, () => {
      const M = nominalMass(p.formula);
      const mz = p.ms.map((x) => x[0]);
      expect(mz).toContain(M);
      expect(Math.max(...mz)).toBeLessThanOrEqual(M + 2);
    });
    it(`${p.id}: ¹³C signals ≤ carbon count, valid answer index`, () => {
      expect(p.c13.length).toBeLessThanOrEqual(el.C ?? 0);
      expect(p.answer).toBeLessThan(p.choices.length);
    });
  }
});

describe('Plan', () => {
  it('has 35 days', () => expect(PLAN.length).toBe(35));
});
