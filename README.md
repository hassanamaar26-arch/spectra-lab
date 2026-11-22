# مختبر الطيف · Spectra Lab

Interactive study platform for **Advanced Pharmaceutical Analysis** (5th stage pharmacy, 2025–2026): UV-Vis, IR, ¹H-NMR, ¹³C-NMR/DEPT/MRI, Mass Spectrometry (224 slides).

## Features
- Bilingual lesson blocks: exam-style English sentence → Arabic translation → deep explanation (Iraqi Arabic) → cause/effect flow → ⭐ HIGH YIELD / ⚠️ EXAM TRAP / 🔧 SLIDE FIX
- Exam mode: hides translation and explanation, keeps the English
- Instant search by term or slide number
- Quizzes with the reason behind every answer
- Spectra trainer (IR, ¹H, ¹³C, MS drawn in SVG), step by step
- Calculators: EMR, %T ↔ A, Beer-Lambert, IHD, nitrogen rule, n+1, Cl/Br isotopes
- 35-day plan with progress saved in the browser

## Develop
```bash
npm ci
npm run dev        # local server
npx tsc -b         # type check
npx vitest run     # calculations + slide coverage + spectra/formula audit
npm run build
```

## Structure
```
src/
  data/lessons/    one file per unit (Block[] with slide numbers)
  data/quizzes/    one file per unit
  data/spectra/    trainer problems
  data/plan.ts     35-day plan
  components/      BilingualBlock, Calculators, Spectrum, Views, Rich (bidi-safe text)
  utils/           calc.ts (tested), storage.ts (localStorage, Firebase-ready), search.ts
```

## Roadmap
| Phase | Unit | Slides | Status |
|---|---|---|---|
| 0 | Project structure and engines | — | ✅ |
| 1 | UV 1: Light and Beer-Lambert | 1–20 | ✅ |
| 2 | UV 2: Transitions and shifts | 21–43 | ⏳ |
| 3 | IR 1: Theory, instrument, factors | 44–61 | ⏳ |
| 4 | IR 2: Functional groups | 62–96 | ⏳ |
| 5 | ¹H-NMR 1: Principle and chemical shift | 97–138 | ⏳ |
| 6 | ¹H-NMR 2: Integration and splitting | 139–162 | ⏳ |
| 7 | ¹³C-NMR, DEPT, MRI | 163–184 | ⏳ |
| 8 | Mass spectrometry | 185–224 | ⏳ |
| 9 | Full lab: 16 problems, mock exams | 1–224 | ⏳ |

Deployed automatically to GitHub Pages on every push to `main`.
