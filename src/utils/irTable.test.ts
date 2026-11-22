import { describe, expect, it } from 'vitest';
import { CARBONYL_LADDER, IR_TABLE, lookupIr } from './irTable';

const groups = (wn: number) => lookupIr(wn).map((e) => e.id);

describe('IR correlation table (slides 62–96)', () => {
  it('every range is valid and cites a slide inside unit 4', () => {
    const ids = new Set<string>();
    for (const e of IR_TABLE) {
      expect(e.lo).toBeLessThan(e.hi + 1);
      expect(e.slide >= 62 && e.slide <= 96).toBe(true);
      expect(ids.has(e.id)).toBe(false);
      ids.add(e.id);
    }
  });
  it('1735 → ester (and neighbours aldehyde/acid)', () => expect(groups(1735)).toContain('ester'));
  it('1715 → ketone', () => expect(groups(1715)).toContain('ketone'));
  it('2250 → nitrile and alkyne', () => {
    expect(groups(2250)).toContain('cn-ali');
    expect(groups(2250)).toContain('cc-triple');
  });
  it('3300 → alkyne C−H, H-bonded O−H, amines, acid O−H', () => {
    const g = groups(3300);
    for (const id of ['ch-alkyne', 'oh-hb', 'nh-1', 'acid-oh']) expect(g).toContain(id);
  });
  it('2720 → aldehydic C−H', () => expect(groups(2720)).toContain('ch-ald'));
  it('nonsense input → no hits', () => expect(lookupIr(NaN)).toEqual([]));
  it('slide-quoted key ranges', () => {
    const r = (id: string) => IR_TABLE.find((e) => e.id === id)!;
    expect([r('oh-free').lo, r('oh-free').hi]).toEqual([3584, 3700]);
    expect([r('acid-oh').lo, r('acid-oh').hi]).toEqual([2500, 3300]);
    expect([r('amide1').lo, r('amide1').hi]).toEqual([1630, 1680]);
    expect([r('cocl').lo, r('cocl').hi]).toEqual([1785, 1815]);
  });
});

describe('Carbonyl ladder (slide 87)', () => {
  it('matches the slide values and is strictly descending', () => {
    expect(CARBONYL_LADDER.map((c) => c.wn)).toEqual([1810, 1800, 1760, 1735, 1725, 1715, 1710, 1690]);
  });
});
