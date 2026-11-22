import { LESSONS } from '../data';

export interface Hit {
  lesson: string;
  unit: number;
  block: string;
  title: string;
  slides: string;
  snippet: string;
  score: number;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ًٌٍَُِّْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي');

/** Search lesson blocks by text or slide number ("17", "slide 17", "س 17"). */
export function search(query: string): Hit[] {
  const q = norm(query.trim());
  if (!q) return [];
  const slideNum = /^(?:slide|سلايد|س)?\s*(\d{1,3})$/.exec(q)?.[1];
  const terms = q.split(/\s+/).filter(Boolean);
  const hits: Hit[] = [];
  for (const l of LESSONS) {
    for (const b of l.blocks) {
      let score = 0;
      if (slideNum && b.slides.includes(Number(slideNum))) score += 100;
      const hay = norm([b.title, b.en, b.ar, ...(b.deep ?? []), ...(b.eq ?? []), ...(b.flags?.map((f) => f.text) ?? [])].join(' '));
      if (!slideNum) {
        if (!terms.every((t) => hay.includes(t))) continue;
        score += terms.reduce((s, t) => s + (norm(b.title).includes(t) ? 10 : 1), 0);
      }
      if (score === 0) continue;
      const idx = b.en.toLowerCase().indexOf(terms[0]);
      const snippet = idx >= 0 ? b.en.slice(Math.max(0, idx - 40), idx + 100) : b.en.slice(0, 140);
      hits.push({
        lesson: l.id,
        unit: l.unit,
        block: b.id,
        title: b.title,
        slides: b.slides.length > 1 ? `${b.slides[0]}–${b.slides[b.slides.length - 1]}` : String(b.slides[0]),
        snippet: (idx > 40 ? '…' : '') + snippet + '…',
        score,
      });
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 30);
}
