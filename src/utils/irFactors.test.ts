import { describe, expect, it } from 'vitest';
import { IR_SCENARIOS } from './irFactors';

describe('IR factor comparisons match the slides', () => {
  it('ring strain values 1714 < 1746 < 1783 (slide 60)', () => {
    const r = IR_SCENARIOS.find((s) => s.id === 'ring')!;
    expect(r.bands.map((b) => b.wn)).toEqual([1714, 1746, 1783]);
  });
  it('conjugation lowers C=O by 20–30 cm⁻¹ (slide 61)', () => {
    const c = IR_SCENARIOS.find((s) => s.id === 'conj')!;
    const drop = c.bands[0].wn - c.bands[1].wn;
    expect(drop).toBeGreaterThanOrEqual(20);
    expect(drop).toBeLessThanOrEqual(30);
  });
  it('H-bond band is lower, broader and deeper (slide 59)', () => {
    const [free, hb] = IR_SCENARIOS.find((s) => s.id === 'hbond')!.bands;
    expect(hb.wn).toBeLessThan(free.wn);
    expect(hb.width).toBeGreaterThan(free.width);
    expect(hb.depth).toBeGreaterThan(free.depth);
  });
  it('every band sits inside its window', () => {
    for (const s of IR_SCENARIOS) for (const b of s.bands) expect(b.wn <= s.range[0] && b.wn >= s.range[1]).toBe(true);
  });
});
