import { describe, expect, it } from 'vitest';
import { classifyShift, SCENARIOS } from './shifts';

describe('Shift classification', () => {
  it('aniline + H⁺ is hypsochromic (slide 29: 280 → 265 nm)', () => {
    const s = SCENARIOS.find((x) => x.id === 'aniline')!;
    expect(s.from.l).toBe(280);
    expect(s.to.l).toBe(265);
    expect(classifyShift(s.from, s.to)).toEqual(['hypsochromic']);
  });
  it('p-nitrophenol + OH⁻ is bathochromic', () => {
    const s = SCENARIOS.find((x) => x.id === 'nitrophenol')!;
    expect(classifyShift(s.from, s.to)).toEqual(['bathochromic']);
  });
  it('naphthalene → 2-methyl is hypochromic (19000 → 10250)', () => {
    const s = SCENARIOS.find((x) => x.id === 'naph')!;
    expect(classifyShift(s.from, s.to)).toEqual(['hypochromic']);
  });
  it('each generic scenario matches its own label', () => {
    for (const id of ['red', 'blue', 'hyper', 'hypo']) {
      const s = SCENARIOS.find((x) => x.id === id)!;
      expect(classifyShift(s.from, s.to)).toHaveLength(1);
    }
    expect(classifyShift({ l: 300, e: 1 }, { l: 340, e: 2 })).toEqual(['bathochromic', 'hyperchromic']);
  });
});
