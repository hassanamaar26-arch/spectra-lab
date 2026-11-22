export interface Band {
  /** λmax in nm */
  l: number;
  /** relative or molar absorptivity */
  e: number;
}

export type ShiftKind = 'bathochromic' | 'hypsochromic' | 'hyperchromic' | 'hypochromic';

/** Name every shift between two bands (position and intensity are independent). */
export function classifyShift(from: Band, to: Band): ShiftKind[] {
  const out: ShiftKind[] = [];
  if (to.l > from.l) out.push('bathochromic');
  if (to.l < from.l) out.push('hypsochromic');
  if (to.e > from.e) out.push('hyperchromic');
  if (to.e < from.e) out.push('hypochromic');
  return out;
}

export interface Scenario {
  id: string;
  label: string;
  from: Band;
  to: Band;
  fromName: string;
  toName: string;
  /** Iraqi Arabic explanation */
  why: string;
  slides: number[];
  /** True when the numbers are not on the slides. */
  extra?: boolean;
}

export const SCENARIOS: Scenario[] = [
  { id: 'red', label: 'Bathochromic', from: { l: 300, e: 1 }, to: { l: 340, e: 1 }, fromName: 'before', toName: 'after', why: 'المنحني نفسه يتحرك لـ λ أطول (يمين). الطاقة اللازمة قلّت.', slides: [28] },
  { id: 'blue', label: 'Hypsochromic', from: { l: 300, e: 1 }, to: { l: 260, e: 1 }, fromName: 'before', toName: 'after', why: 'المنحني يتحرك لـ λ أقصر (يسار). الطاقة اللازمة زادت.', slides: [29] },
  { id: 'hyper', label: 'Hyperchromic', from: { l: 300, e: 0.6 }, to: { l: 300, e: 1 }, fromName: 'before', toName: 'after', why: 'نفس المكان، بس القمة أعلى: ε زادت.', slides: [30] },
  { id: 'hypo', label: 'Hypochromic', from: { l: 300, e: 1 }, to: { l: 300, e: 0.6 }, fromName: 'before', toName: 'after', why: 'نفس المكان، بس القمة أوطى: ε قلّت.', slides: [30] },
  { id: 'aniline', label: 'Aniline + H⁺', from: { l: 280, e: 1 }, to: { l: 265, e: 1 }, fromName: 'aniline', toName: 'anilinium', why: 'الـ NH₂ يصير NH₃⁺، الـ lone pair ينحجز، الـ conjugation يروح: blue shift من 280 لـ 265 nm.', slides: [29] },
  { id: 'nitrophenol', label: 'p-Nitrophenol + OH⁻', from: { l: 317, e: 1 }, to: { l: 400, e: 1 }, fromName: 'p-nitrophenol', toName: 'phenolate', why: 'الـ OH يصير O⁻، donor أقوى، delocalization أكثر لحد الـ NO₂: red shift. المحلول يصير أصفر.', slides: [28], extra: true },
  { id: 'aux', label: 'Benzene → Aniline', from: { l: 255, e: 1 }, to: { l: 280, e: 1 }, fromName: 'benzene', toName: 'aniline', why: 'الـ NH₂ auxochrome يمد الـ conjugation بالـ lone pair: 255 ← 280 nm (والفينول بالنص عند 270).', slides: [26] },
  { id: 'naph', label: 'Naphthalene → 2-Methyl', from: { l: 275, e: 19000 }, to: { l: 275, e: 10250 }, fromName: 'naphthalene', toName: '2-methylnaphthalene', why: 'ε نزلت من 19000 لـ 10250: hypochromic. (مكان القمة بالرسم للتوضيح بس.)', slides: [30] },
];
