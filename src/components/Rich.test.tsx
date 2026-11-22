import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Rich } from './Rich';

const runs = (t: string) => [...renderToStaticMarkup(<Rich text={t} />).matchAll(/<bdi dir="ltr">(.*?)<\/bdi>/g)].map((m) => m[1]);

describe('Rich bidi isolation', () => {
  it('keeps a formula as one run', () => expect(runs('العكس: %T = 10^(2 − A).')).toEqual(['%T = 10^(2 − A)']));
  it('splits at a sentence boundary', () =>
    expect(runs('استخدم c = 3 × 10¹⁰ cm/s. 1 Å = 10⁻⁸ cm.')).toEqual(['c = 3 × 10¹⁰ cm/s', '1 Å = 10⁻⁸ cm']));
  it('isolates Greek-only runs', () => expect(runs('فهي π→π*. خلص')).toEqual(['π→π*']));
  it('keeps parentheses balanced', () => expect(runs('تقصر (blue). خلص')).toEqual(['(blue)']));
  it('drops a dangling opening parenthesis', () => expect(runs('10–100 (ضعيف)')).toEqual(['10–100']));
  it('bold with a star inside', () => expect(renderToStaticMarkup(<Rich text="**n → π* بالـ solvent:** نص" />)).toContain('<b>'));
});
