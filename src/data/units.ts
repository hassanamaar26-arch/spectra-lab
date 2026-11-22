import type { UnitMeta } from '../types';

export const UNITS: UnitMeta[] = [
  { n: 1, id: 'uv1', title: 'UV 1: الضوء وقانون Beer-Lambert', slides: [1, 20] },
  { n: 2, id: 'uv2', title: 'UV 2: Transitions وShifts', slides: [21, 43] },
  { n: 3, id: 'ir1', title: 'IR 1: النظرية والجهاز والعوامل', slides: [44, 61] },
  { n: 4, id: 'ir2', title: 'IR 2: المجاميع الوظيفية والتفسير', slides: [62, 96] },
  { n: 5, id: 'h1', title: '¹H-NMR 1: المبدأ والـ Chemical shift', slides: [97, 138] },
  { n: 6, id: 'h2', title: '¹H-NMR 2: Integration وSplitting', slides: [139, 162] },
  { n: 7, id: 'c13', title: '¹³C-NMR وDEPT وMRI', slides: [163, 184] },
  { n: 8, id: 'ms', title: 'Mass Spectrometry', slides: [185, 224] },
];
