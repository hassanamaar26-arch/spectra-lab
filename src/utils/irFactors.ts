/** [wavenumber, depth 0..1, width] for a simple IR band drawing. */
export type Band = { wn: number; depth: number; width: number; name: string };

export interface IrScenario {
  id: string;
  label: string;
  /** Visible window, high → low wavenumber. */
  range: [number, number];
  bands: Band[];
  why: string;
  slides: number[];
  extra?: string;
}

export const IR_SCENARIOS: IrScenario[] = [
  {
    id: 'ring',
    label: 'Ring strain',
    range: [1850, 1650],
    bands: [
      { wn: 1714, depth: 0.9, width: 14, name: 'cyclohexanone (6)' },
      { wn: 1746, depth: 0.9, width: 14, name: 'cyclopentanone (5)' },
      { wn: 1783, depth: 0.9, width: 14, name: 'cyclobutanone (4)' },
    ],
    why: 'كلما صغرت الحلقة زاد إجهاد الزاوية، فيصعد تردد الـ C=O: 1714 ← 1746 ← 1783 cm⁻¹.',
    slides: [60],
  },
  {
    id: 'conj',
    label: 'Conjugation',
    range: [1800, 1620],
    bands: [
      { wn: 1730, depth: 0.9, width: 16, name: 'saturated aldehyde' },
      { wn: 1705, depth: 0.9, width: 16, name: 'conjugated aldehyde (−25)' },
    ],
    why: 'الـ conjugation يقلل صفة الآصرة المزدوجة بالـ C=O، فينزل ترددها 20–30 cm⁻¹.',
    slides: [61],
    extra: 'نقطة البداية 1730 cm⁻¹ تقريبية. اللي بالسلايد هو مقدار النزول (20–30).',
  },
  {
    id: 'hbond',
    label: 'H-bonding',
    range: [3800, 3000],
    bands: [
      { wn: 3620, depth: 0.45, width: 30, name: 'free O−H (sharp)' },
      { wn: 3350, depth: 0.85, width: 260, name: 'H-bonded O−H (broad)' },
    ],
    why: 'الـ H-bond يضعف الآصرة O−H: التردد ينزل، والقمة تعرض، والشدة تزيد. الثلاث تأثيرات اللي بالسلايد.',
    slides: [59],
    extra: 'القيم 3600 و3350 cm⁻¹ تقريبية ومو بالسلايد، هي المثال الكلاسيكي للـ alcohols.',
  },
];
