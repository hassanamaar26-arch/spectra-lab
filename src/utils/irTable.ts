/** IR correlation table built from slides 62–96. Ranges are [low, high] in cm⁻¹. */
export interface IrEntry {
  id: string;
  group: string;
  vib: string;
  lo: number;
  hi: number;
  /** strength / shape as stated on the slides */
  look: string;
  slide: number;
  /** How to tell it apart from look-alikes (Iraqi Arabic). */
  tip: string;
}

export const IR_TABLE: IrEntry[] = [
  { id: 'oh-free', group: 'Alcohol / phenol', vib: 'free O−H stretch', lo: 3584, hi: 3700, look: 'sharp', slide: 72, tip: 'حادة وتبين بالمحلول المخفف. إذا العينة مركزة تتحول لقمة عريضة أوطى.' },
  { id: 'oh-hb', group: 'Alcohol / phenol', vib: 'H-bonded O−H stretch', lo: 3200, hi: 3550, look: 'broad, strong', slide: 72, tip: 'عريضة وقوية. أكدها بـ C−O قوية عند 1260–1000 وماكو C=O.' },
  { id: 'acid-oh-free', group: 'Carboxylic acid', vib: 'free O−H (dilute / vapor only)', lo: 3500, hi: 3540, look: 'sharp', slide: 81, tip: 'نادراً تبين؛ بس بمحلول مخفف جداً بمذيب غير قطبي أو بخار.' },
  { id: 'acid-oh', group: 'Carboxylic acid', vib: 'O−H stretch (dimer)', lo: 2500, hi: 3300, look: 'very broad, intense, centered ~3000', slide: 81, tip: 'عريضة جداً تغطي على C−H، ولازم يكون وياها C=O عند 1730–1700.' },
  { id: 'nh-1', group: 'Primary amine (1°)', vib: 'N−H stretch (two bands)', lo: 3250, hi: 3400, look: 'two weak bands', slide: 88, tip: 'قمتين صغار (3400–3300 و3330–3250). أضعف وأحد من O−H.' },
  { id: 'nh-2', group: 'Secondary amine (2°)', vib: 'N−H stretch', lo: 3310, hi: 3350, look: 'one weak band', slide: 88, tip: 'قمة وحدة ضعيفة. الـ tertiary ما يعطي ولا قمة.' },
  { id: 'nh-amide', group: 'Amide', vib: 'N−H stretch', lo: 3180, hi: 3350, look: 'medium', slide: 86, tip: 'أكده بـ Amide I عند 1680–1630 وAmide II عند 1620–1590.' },
  { id: 'nh-salt', group: 'Amine salt (R−NH₃⁺)', vib: 'N−H stretch', lo: 3030, hi: 3300, look: 'strong, broad', slide: 89, tip: 'عريضة قوية مثل الحامض، بس ماكو C=O، ووياها band عند 2000–1709.' },
  { id: 'ch-alkyne', group: 'Terminal alkyne', vib: '≡C−H stretch', lo: 3267, hi: 3333, look: 'sharp, strong', slide: 68, tip: 'حادة (مو عريضة مثل O−H)، ووياها C≡C عند 2260–2100 وbend عند 700–610.' },
  { id: 'ch-arom', group: 'Aromatic', vib: 'C−H stretch', lo: 3000, hi: 3100, look: 'weak–medium', slide: 70, tip: 'فوق 3000 مثل الـ alkene؛ أكدها بقمم الحلقة 1600 و1500 وoop 900–675.' },
  { id: 'ch-alkene', group: 'Alkene', vib: '=C−H stretch', lo: 3000, hi: 3100, look: 'medium', slide: 66, tip: 'فوق 3000؛ أكدها بـ C=C عند 1667–1640 وoop 1000–650.' },
  { id: 'ch-alkane', group: 'Alkane (sp³)', vib: 'C−H stretch', lo: 2840, hi: 3000, look: 'strong', slide: 63, tip: 'تحت 3000. موجودة بكل مركب بيه CH₃ أو CH₂، فهي ما تميز لوحدها.' },
  { id: 'ch-ald', group: 'Aldehyde', vib: 'aldehydic C−H stretch', lo: 2700, hi: 2830, look: 'weak, distinctive', slide: 79, tip: 'البصمة مال الـ aldehyde. ويا C=O عند 1740–1720.' },
  { id: 'cn-ali', group: 'Nitrile (aliphatic)', vib: 'C≡N stretch', lo: 2240, hi: 2260, look: 'weak–medium', slide: 91, tip: 'منطقة الآصرة الثلاثية. الـ C≡N أقوى من C≡C عادة.' },
  { id: 'cn-arom', group: 'Nitrile (aromatic / conjugated)', vib: 'C≡N stretch', lo: 2222, hi: 2240, look: 'stronger', slide: 91, tip: 'الـ conjugation ينزله ويقويه.' },
  { id: 'cc-triple', group: 'Alkyne', vib: 'C≡C stretch', lo: 2100, hi: 2260, look: 'weak; absent if symmetric', slide: 68, tip: 'إذا الـ alkyne متناظر ما يبين. الطرفي يجي وياه ≡C−H حادة عند ~3300.' },
  { id: 'salt-band', group: 'Amine salt', vib: 'combination band', lo: 1709, hi: 2000, look: 'medium', slide: 89, tip: 'يجي ويا N−H العريضة 3300–3030.' },
  { id: 'arom-ot', group: 'Aromatic', vib: 'overtone / combination bands', lo: 1650, hi: 2000, look: 'weak', slide: 70, tip: 'قمم صغيرة متموجة، تأكد الحلقة.' },
  { id: 'anh', group: 'Anhydride', vib: 'C=O stretch (two bands)', lo: 1750, hi: 1818, look: 'two strong bands', slide: 85, tip: 'قمتين C=O (asym + sym) ويا C−O عند 1300–900.' },
  { id: 'cocl', group: 'Acid chloride', vib: 'C=O stretch', lo: 1785, hi: 1815, look: 'strong', slide: 85, tip: 'C=O وحدة عالية جداً. الـ anhydride يعطي قمتين.' },
  { id: 'ester', group: 'Ester / lactone', vib: 'C=O stretch', lo: 1735, hi: 1750, look: 'strong', slide: 84, tip: 'أعلى من الكيتون، ويا C−O قوية (قمتين أو أكثر) عند 1300–1000.' },
  { id: 'ald', group: 'Aldehyde', vib: 'C=O stretch', lo: 1720, hi: 1740, look: 'strong', slide: 79, tip: 'دوّر على الـ C−H الألديهايدية عند 2830–2700.' },
  { id: 'acid-co', group: 'Carboxylic acid', vib: 'C=O stretch', lo: 1700, hi: 1730, look: 'very intense', slide: 81, tip: 'ويا O−H عريضة جداً 3300–2500.' },
  { id: 'ketone', group: 'Ketone (saturated)', vib: 'C=O stretch', lo: 1705, hi: 1725, look: 'strong (1715)', slide: 76, tip: 'المرجع 1715. ماكو C−H ألديهايدية وماكو C−O قوية وماكو O−H عريضة.' },
  { id: 'ketone-conj', group: 'Ketone (conjugated)', vib: 'C=O stretch', lo: 1666, hi: 1685, look: 'strong', slide: 76, tip: 'الـ conjugation نزله؛ دوّر على C=C قرب 1600–1650.' },
  { id: 'amide1', group: 'Amide', vib: 'Amide I (C=O)', lo: 1630, hi: 1680, look: 'strong', slide: 86, tip: 'أوطى كاربونيل بسبب الـ resonance. ووياها Amide II عند 1620–1590 وN−H.' },
  { id: 'cc-alkene', group: 'Alkene (unconjugated)', vib: 'C=C stretch', lo: 1640, hi: 1667, look: 'moderate–weak', slide: 66, tip: 'أضعف بهواية من الـ C=O. ويا =C−H فوق 3000.' },
  { id: 'coo-asym', group: 'Carboxylate anion', vib: 'COO⁻ asymmetric stretch', lo: 1550, hi: 1650, look: 'strong', slide: 82, tip: 'ويا sym قرب 1400، وماكو O−H.' },
  { id: 'nh-bend', group: 'Primary amine', vib: 'N−H bend (scissoring)', lo: 1580, hi: 1650, look: 'medium', slide: 89, tip: 'ويا قمتين N−H stretch قرب 3350.' },
  { id: 'amide2', group: 'Primary amide', vib: 'Amide II (N−H bend)', lo: 1590, hi: 1620, look: 'sharp (dilute)', slide: 86, tip: 'تحت Amide I مباشرة.' },
  { id: 'arom-cc1', group: 'Aromatic', vib: 'ring C=C (skeletal)', lo: 1585, hi: 1600, look: 'medium', slide: 70, tip: 'تجي ويا قمة ثانية 1500–1400.' },
  { id: 'no2-asym', group: 'Nitro', vib: 'NO₂ asymmetric stretch', lo: 1499, hi: 1661, look: 'strong (~1550)', slide: 91, tip: 'لازم وياها sym قوية عند 1389–1259 (~1350).' },
  { id: 'arom-cc2', group: 'Aromatic', vib: 'ring C=C (skeletal)', lo: 1400, hi: 1500, look: 'medium', slide: 70, tip: 'ويا 1600–1585.' },
  { id: 'ch3-asb', group: 'Alkane (CH₃)', vib: 'CH₃ asymmetric bend', lo: 1440, hi: 1460, look: 'medium (~1450)', slide: 64, tip: 'ويا sym bend عند ~1375.' },
  { id: 'acid-ohb', group: 'Carboxylic acid', vib: 'O−H bend', lo: 1395, hi: 1440, look: 'medium', slide: 82, tip: 'ويا C−O عند 1320–1210.' },
  { id: 'oh-bend', group: 'Alcohol / phenol', vib: 'O−H in-plane bend', lo: 1330, hi: 1420, look: 'medium', slide: 72, tip: 'ويا O−H stretch وC−O.' },
  { id: 'coo-sym', group: 'Carboxylate anion', vib: 'COO⁻ symmetric stretch', lo: 1380, hi: 1420, look: 'weaker (~1400)', slide: 82, tip: 'ويا asym قوية 1650–1550.' },
  { id: 'ch3-sb', group: 'Alkane (CH₃)', vib: 'CH₃ symmetric bend', lo: 1370, hi: 1380, look: 'very stable (~1375)', slide: 64, tip: 'بصمة الـ CH₃.' },
  { id: 'no2-sym', group: 'Nitro', vib: 'NO₂ symmetric stretch', lo: 1259, hi: 1389, look: 'strong (~1350)', slide: 91, tip: 'لازم وياها asym عند 1661–1499.' },
  { id: 'cn-arom-str', group: 'Aromatic amine', vib: 'C−N stretch', lo: 1266, hi: 1342, look: 'strong', slide: 89, tip: 'أعلى من الأليفاتي بسبب الـ resonance.' },
  { id: 'acid-co-str', group: 'Carboxylic acid', vib: 'C−O stretch', lo: 1210, hi: 1320, look: 'strong', slide: 82, tip: 'ويا O−H bend 1440–1395.' },
  { id: 'ether-aryl', group: 'Phenyl alkyl ether', vib: 'C−O stretch (×2)', lo: 1240, hi: 1260, look: 'strong (~1250 + ~1040)', slide: 74, tip: 'قمتين قويتين، وماكو C=O ولا O−H.' },
  { id: 'ester-co', group: 'Ester', vib: 'C−O stretch (two or more)', lo: 1000, hi: 1300, look: 'strong, one broader', slide: 84, tip: 'لازم وياها C=O عند 1750–1735.' },
  { id: 'ether', group: 'Ether', vib: 'C−O stretch', lo: 1000, hi: 1300, look: 'strong', slide: 74, tip: 'شرطها: ماكو C=O وماكو O−H. الأليفاتي قمة وحدة ~1120.' },
  { id: 'alc-co', group: 'Alcohol / phenol', vib: 'C−O stretch', lo: 1000, hi: 1260, look: 'strong', slide: 72, tip: 'ويا O−H عريضة 3550–3200.' },
  { id: 'anh-co', group: 'Anhydride', vib: 'C−O stretch', lo: 900, hi: 1300, look: 'strong', slide: 85, tip: 'ويا قمتين C=O عالية.' },
  { id: 'cn-ali-str', group: 'Aliphatic amine', vib: 'C−N stretch', lo: 1020, hi: 1250, look: 'medium', slide: 89, tip: 'للـ 1° و2° و3°؛ الطريقة الوحيدة تقريباً تشوف الـ tertiary.' },
  { id: 'ket-bend', group: 'Ketone', vib: 'C−(C=O)−C bend', lo: 1100, hi: 1300, look: 'medium', slide: 77, tip: 'ويا C=O 1715.' },
  { id: 'cc-str', group: 'Alkane', vib: 'C−C stretch', lo: 800, hi: 1200, look: 'weak', slide: 63, tip: 'قليل القيمة بالتشخيص.' },
  { id: 'alkene-oop', group: 'Alkene', vib: '=C−H out-of-plane bend', lo: 650, hi: 1000, look: 'strong, characteristic', slide: 66, tip: 'موقعها يكشف نوع الـ substitution.' },
  { id: 'arom-oop', group: 'Aromatic', vib: 'C−H out-of-plane bend', lo: 675, hi: 900, look: 'intense, most informative', slide: 70, tip: 'تكشف نمط الـ substitution على الحلقة.' },
  { id: 'alkyne-bend', group: 'Terminal alkyne', vib: '≡C−H bend', lo: 610, hi: 700, look: 'strong, broad', slide: 68, tip: 'ويا ≡C−H stretch حادة عند ~3300.' },
];

/** Entries whose range contains wn, widened by `tol` cm⁻¹, closest-centred first. */
export function lookupIr(wn: number, tol = 10): IrEntry[] {
  if (!Number.isFinite(wn)) return [];
  return IR_TABLE.filter((e) => wn >= e.lo - tol && wn <= e.hi + tol).sort(
    (a, b) => Math.abs(wn - (a.lo + a.hi) / 2) - Math.abs(wn - (b.lo + b.hi) / 2),
  );
}

/** Carbonyl ladder, slide 87 (cm⁻¹), high → low. */
export const CARBONYL_LADDER: { name: string; wn: number; why: string }[] = [
  { name: 'Anhydride (band 1)', wn: 1810, why: 'C=O اثنين مربوطين بـ O: coupling يعطي asym عالية، ويا سحب الـ O.' },
  { name: 'Acid chloride', wn: 1800, why: 'الـ Cl يسحب بقوة (inductive) وما يعطي resonance تقريباً.' },
  { name: 'Anhydride (band 2)', wn: 1760, why: 'القمة الثانية (sym) مال الـ anhydride.' },
  { name: 'Ester', wn: 1735, why: 'الـ O جنب الـ C=O يسحب (inductive) أكثر مما يعطي resonance، فيرفع.' },
  { name: 'Aldehyde', wn: 1725, why: 'alkyl وحدة بس تدفع إلكترونات، فأعلى من الكيتون شوية.' },
  { name: 'Ketone', wn: 1715, why: 'المرجع: alkyl اثنين.' },
  { name: 'Carboxylic acid', wn: 1710, why: 'الـ dimer بـ H-bonding قوي ينزله شوية.' },
  { name: 'Amide', wn: 1690, why: 'الـ N يعطي lone pair بالـ resonance بقوة، فالـ C=O تصير شبه مفردة.' },
];
