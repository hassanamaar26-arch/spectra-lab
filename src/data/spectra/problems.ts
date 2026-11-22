import type { Problem } from '../../types';

/*
 * Each problem is checked by src/data/data.test.ts:
 *  - Σ ¹H integrations = H count of the formula
 *  - the IHD step's correct option = IHD computed from the formula
 *  - the tallest MS peak at the high end matches the nominal mass (M⁺)
 * Spectra are simplified teaching spectra with literature-typical values.
 */
export const PROBLEMS: Problem[] = [
  {
    id: 'ethyl-acetate', level: 1, formula: 'C4H8O2',
    ir: [[2985, 0.45, 40], [1742, 0.95, 22], [1373, 0.4, 14], [1240, 0.85, 30], [1047, 0.6, 22]],
    h1: [[4.12, 2, 4], [2.05, 3, 1], [1.26, 3, 3]], c13: [171.1, 60.4, 21.0, 14.2],
    ms: [[88, 8], [73, 6], [70, 12], [61, 18], [45, 15], [43, 100], [29, 22]],
    steps: [
      { q: 'Calculate the IHD of C4H8O2.', o: ['0', '1', '2', '3'], a: 1, why: 'IHD = (2×4 + 2 − 8) / 2 = 1. يعني ring واحد أو آصرة مزدوجة وحدة.' },
      { q: 'Strong peaks at 1742 and 1240 cm⁻¹ indicate:', o: ['Ketone', 'Ester', 'Carboxylic acid', 'Alcohol'], a: 1, why: 'C=O عند ~1740 أعلى من الـ ketone (1715)، و1240 هي C−O stretch، وماكو OH عريض. هذا ester.' },
      { q: 'A 2H quartet at 4.12 with a 3H triplet at 1.26 means:', o: ['An isolated CH3', 'Ethyl attached to O', 'Isopropyl', 'Two equivalent CH3'], a: 1, why: 'q + t = CH2CH3. والـ CH2 عند 4.12 يعني جنب O، أي O−CH2CH3.' },
      { q: 'The 3H singlet at 2.05 is:', o: ['CH3 next to C=O', 'OCH3', 'CH3 on a benzene ring', 'OH'], a: 0, why: 'singlet يعني ماكو جيران H، و~2.0 هو مكان CH3 جنب carbonyl.' },
    ],
    choices: ['Ethyl acetate · CH3COOCH2CH3', 'Methyl propanoate · CH3CH2COOCH3', 'Butanoic acid · CH3CH2CH2COOH', '2-Butanone · CH3COCH2CH3'], answer: 0,
    final: 'CH3−C(=O)−O−CH2−CH3. الـ OCH2 عند 4.12 يفرّقه عن methyl propanoate، اللي عنده OCH3 singlet عند ~3.7.',
  },
  {
    id: 'acetone', level: 1, formula: 'C3H6O',
    ir: [[3000, 0.3, 40], [1715, 0.95, 20], [1420, 0.4, 14], [1365, 0.55, 12], [1220, 0.6, 18]],
    h1: [[2.17, 6, 1]], c13: [206.7, 30.8], ms: [[58, 63], [43, 100], [42, 8], [15, 20]],
    steps: [
      { q: 'IHD of C3H6O:', o: ['0', '1', '2', '3'], a: 1, why: '(2×3 + 2 − 6) / 2 = 1.' },
      { q: 'The peak at 1715 cm⁻¹ indicates:', o: ['Ester C=O', 'Ketone C=O', 'Alkene C=C', 'Nitrile'], a: 1, why: '1715 هي القيمة الكلاسيكية للـ saturated ketone.' },
      { q: 'A single 6H singlet in ¹H-NMR means:', o: ['All six H are equivalent', 'Six different groups', 'Instrument error', 'An OH is present'], a: 0, why: 'إشارة وحدة = بيئة وحدة: CH3 اثنين متماثلات على جانبي الـ C=O.' },
      { q: '¹³C shows only two signals because:', o: ['¹³C is weak', 'The two CH3 are equivalent', 'C=O is invisible', 'Of C–C splitting'], a: 1, why: 'ثلاث كاربونات بس الـ CH3 الاثنين متماثلات: C=O (207) وCH3 (31).' },
    ],
    choices: ['Acetone · CH3COCH3', 'Propanal · CH3CH2CHO', 'Allyl alcohol · CH2=CHCH2OH', 'Methyl vinyl ether · CH2=CHOCH3'], answer: 0,
    final: 'CH3−CO−CH3. الـ propanal كان يعطي aldehyde H عند ~9.8.',
  },
  {
    id: 'butanone', level: 1, formula: 'C4H8O',
    ir: [[2980, 0.45, 40], [1717, 0.95, 20], [1460, 0.4, 14], [1365, 0.45, 12], [1170, 0.5, 18]],
    h1: [[2.44, 2, 4], [2.14, 3, 1], [1.06, 3, 3]], c13: [209.3, 36.9, 29.4, 7.9], ms: [[72, 25], [57, 8], [43, 100], [29, 18]],
    steps: [
      { q: 'IHD of C4H8O:', o: ['0', '1', '2', '3'], a: 1, why: '(2×4 + 2 − 8) / 2 = 1.' },
      { q: '1717 cm⁻¹ with no OH and no strong C−O at 1240 means:', o: ['Ester', 'Ketone', 'Acid', 'Ether'], a: 1, why: 'ketone. الـ ester يعطي ~1740 وC−O قوي.' },
      { q: 'A 2H quartet at 2.44 and a 3H triplet at 1.06:', o: ['Ethyl next to C=O', 'Ethyl next to O', 'Isopropyl', 'Propyl'], a: 0, why: 'q + t = ethyl. والـ CH2 عند 2.4 (مو 4.1) يعني جنب C=O مو جنب O.' },
    ],
    choices: ['2-Butanone · CH3COCH2CH3', 'Butanal · CH3CH2CH2CHO', 'Ethyl vinyl ether · CH2=CHOCH2CH3', 'Tetrahydrofuran · C4H8O ring'], answer: 0,
    final: 'CH3−CO−CH2−CH3. نفس قطع ethyl acetate بدون O بالنص، وهذا اللي ينزّل الـ CH2 من 4.12 لـ 2.44.',
  },
  {
    id: 'bromoethane', level: 1, formula: 'C2H5Br',
    ir: [[2975, 0.5, 35], [1450, 0.4, 12], [1250, 0.65, 14], [560, 0.6, 20]],
    h1: [[3.43, 2, 4], [1.67, 3, 3]], c13: [28.0, 19.4], ms: [[110, 97], [108, 100], [93, 4], [81, 4], [79, 4], [29, 90], [27, 45]],
    steps: [
      { q: 'IHD of C2H5Br:', o: ['0', '1', '2', '½'], a: 0, why: '(2×2 + 2 − 5 − 1) / 2 = 0. الهالوجين يتحسب مثل H.' },
      { q: 'Two peaks at 108 and 110 of nearly equal height mean:', o: ['Cl present', 'Br present', 'N present', 'S present'], a: 1, why: '⁷⁹Br و⁸¹Br تقريباً 1:1. الـ Cl يعطي 3:1.' },
      { q: 'Why is the CH2 quartet at 3.43 ppm?', o: ['Next to C=O', 'Next to electronegative Br', 'Aromatic', 'OH'], a: 1, why: 'الـ Br يسحب الإلكترونات فيصير الـ CH2 deshielded ويطلع downfield.' },
    ],
    choices: ['Bromoethane · CH3CH2Br', 'Chloroethane · CH3CH2Cl', '1,2-Dibromoethane · BrCH2CH2Br', 'Bromomethane · CH3Br'], answer: 0,
    final: 'CH3−CH2−Br. والـ 29 هو C2H5⁺ بعد ما يطلع الـ Br.',
  },
  {
    id: 'isopropanol', level: 2, formula: 'C3H8O',
    ir: [[3350, 0.9, 220], [2970, 0.6, 35], [1380, 0.4, 12], [1130, 0.7, 20], [950, 0.4, 14]],
    h1: [[4.01, 1, 7], [2.1, 1, 1], [1.2, 6, 2]], c13: [64.1, 25.3], ms: [[60, 1], [59, 4], [45, 100], [43, 15], [27, 12]],
    steps: [
      { q: 'IHD of C3H8O:', o: ['0', '1', '2', '3'], a: 0, why: '(2×3 + 2 − 8) / 2 = 0. مشبع وماكو حلقة.' },
      { q: 'A very broad peak at 3350 cm⁻¹ indicates:', o: ['N−H', 'H-bonded O−H', 'C≡N', 'C=O'], a: 1, why: 'العرض سببه H-bonding بين الجزيئات.' },
      { q: 'A 1H septet with a 6H doublet means:', o: ['Ethyl', 'Isopropyl', 'Propyl', 'tert-Butyl'], a: 1, why: 'CH عنده 6 جيران ← septet، والـ CH3 الاثنين عدهم جار واحد ← doublet.' },
      { q: 'Why is the OH a singlet with no coupling to CH?', o: ['It is far away', 'Fast proton exchange on the heteroatom', 'It is equivalent to CH', 'Spectrum error'], a: 1, why: 'الـ H على O أو N يتبادل بسرعة، فما يسوي splitting عادة.' },
    ],
    choices: ['2-Propanol · (CH3)2CHOH', '1-Propanol · CH3CH2CH2OH', 'Ethyl methyl ether · CH3OCH2CH3', 'Acetone + H2'], answer: 0,
    final: '(CH3)2CH−OH. والـ M⁺ (60) ضعيف جداً لأن الـ alcohols تتكسر بسهولة، والـ 45 = M − CH3.',
  },
  {
    id: 'acetonitrile', level: 2, formula: 'C2H3N',
    ir: [[3000, 0.3, 30], [2945, 0.35, 25], [2253, 0.85, 14], [1445, 0.4, 12], [1375, 0.45, 12], [1040, 0.35, 12]],
    h1: [[2.0, 3, 1]], c13: [116.9, 1.8], ms: [[41, 100], [40, 55], [39, 20], [38, 10], [14, 8]],
    steps: [
      { q: 'IHD of C2H3N:', o: ['0', '1', '2', '3'], a: 2, why: '(2×2 + 2 + 1 − 3) / 2 = 2. الـ N يضيف واحد. IHD = 2 ممكن آصرة ثلاثية.' },
      { q: 'M⁺ at m/z 41 (odd) means:', o: ['Even number of N', 'Odd number of N', 'No N', 'Cl present'], a: 1, why: 'Nitrogen rule: كتلة فردية = عدد فردي من N.' },
      { q: 'A sharp peak at 2253 cm⁻¹:', o: ['C≡N', 'C=O', 'O−H', 'C=C'], a: 0, why: '2200–2260 منطقة الآصرة الثلاثية، و2250 حادة = nitrile.' },
    ],
    choices: ['Acetonitrile · CH3C≡N', 'Methyl isocyanide · CH3N≡C', '2H-Azirine · C2H3N ring', 'Acetamide · CH3CONH2'], answer: 0,
    final: 'CH3−C≡N. CH3 singlet عند 2.0 لأنه ماكو جيران.',
  },
  {
    id: 'ethylbenzene', level: 2, formula: 'C8H10',
    ir: [[3030, 0.35, 25], [2965, 0.55, 30], [1605, 0.35, 10], [1495, 0.5, 10], [1455, 0.45, 10], [745, 0.75, 14], [697, 0.85, 14]],
    h1: [[7.25, 5, 0], [2.64, 2, 4], [1.23, 3, 3]], c13: [144.2, 128.4, 127.9, 125.7, 28.9, 15.6], ms: [[106, 30], [91, 100], [77, 8], [65, 10], [51, 8]],
    steps: [
      { q: 'IHD of C8H10:', o: ['2', '3', '4', '5'], a: 2, why: '(2×8 + 2 − 10) / 2 = 4 = حلقة benzene.' },
      { q: 'Peaks at 3030, 1605, 1495 with strong 745 and 697 indicate:', o: ['Alkyne', 'Monosubstituted benzene', 'Ketone', 'Alcohol'], a: 1, why: 'C−H فوق 3000 = sp2، 1600/1500 = aromatic C=C، و750 + 700 = monosubstituted.' },
      { q: 'A 5H multiplet at 7.25 means:', o: ['5 CH3', 'C6H5− (phenyl)', '5 OH', 'Alkene'], a: 1, why: '5 H بمنطقة الـ aromatic = حلقة بيها مجموعة وحدة.' },
      { q: 'The base peak at m/z 91 is:', o: ['M⁺', 'M − 15 by benzylic cleavage → tropylium C7H7⁺', 'M − 18', 'Contains N'], a: 1, why: 'قاعدة 7 بالمحاضرة: الكسر عند الآصرة β للحلقة يعطي benzyl/tropylium مستقر. 106 − 15 = 91.' },
    ],
    choices: ['Ethylbenzene · C6H5CH2CH3', 'o-Xylene · C6H4(CH3)2', 'p-Xylene · C6H4(CH3)2', 'Styrene · C6H5CH=CH2'], answer: 0,
    final: 'C6H5−CH2−CH3. الـ xylene يعطي CH3 singlet (6H) عند ~2.3 و4H aromatic.',
  },
  {
    id: 'benzoic-acid', level: 3, formula: 'C7H6O2',
    ir: [[3000, 0.75, 520], [1688, 0.95, 22], [1602, 0.45, 10], [1453, 0.45, 10], [1292, 0.75, 20], [935, 0.45, 40], [708, 0.75, 14]],
    h1: [[12.5, 1, 1], [8.12, 2, 2], [7.62, 1, 3], [7.48, 2, 3]], c13: [172.5, 133.8, 130.2, 129.3, 128.5], ms: [[122, 80], [105, 100], [77, 70], [51, 30]],
    steps: [
      { q: 'IHD of C7H6O2:', o: ['3', '4', '5', '6'], a: 2, why: '(2×7 + 2 − 6) / 2 = 5: benzene (4) + C=O (1).' },
      { q: 'A very broad band 3300–2500 with C=O at 1688 indicates:', o: ['Alcohol', 'Carboxylic acid', 'Ester', 'Aldehyde'], a: 1, why: 'OH عريض جداً ينزل لـ 2500 = COOH dimer، والـ C=O نازل بسبب الـ conjugation ويا الحلقة.' },
      { q: 'A 1H singlet at 12.5 ppm:', o: ['Aldehyde H', 'COOH', 'Aromatic H', 'Alkene H'], a: 1, why: 'الـ aldehyde ~9–10، و10–13 هو الـ COOH.' },
      { q: 'In MS, 122 → 105 → 77. What was lost at each step?', o: ['CH3 then CO', 'OH then CO', 'H2O then CO2', 'Cl then Br'], a: 1, why: '122 − 17 (OH) = 105 (C6H5CO⁺)، و105 − 28 (CO) = 77 (C6H5⁺).' },
    ],
    choices: ['Benzoic acid · C6H5COOH', 'Phenyl formate · HCOOC6H5', '4-Hydroxybenzaldehyde · HOC6H4CHO', 'Benzyl alcohol · C6H5CH2OH'], answer: 0,
    final: 'C6H5−COOH. الـ 4-hydroxybenzaldehyde كان يعطي CHO عند ~9.8 وdoublets متناظرة.',
  },
];
