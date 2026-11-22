# Spectra Lab — working notes

Commands: `npx tsc -b` · `npx vitest run` · `npm run build` (must all pass before commit).

Rules
- Each unit = `src/data/lessons/<id>.ts` + `src/data/quizzes/<id>.ts`, registered in `src/data/index.ts`.
- Every slide in the unit range must appear in some block's `slides` (data.test.ts enforces it).
- `en` = course wording; `ar` = translation; `deep` = Iraqi Arabic explanation. Slide errors go in a `fix` flag, never silently corrected.
- Outside-the-slides info is marked with an `extra` flag.
- Arabic strings go through `<Rich>`; pure English goes in `en`, `eq`, `flow` (LTR).
- Trainer problems: Σ ¹H integration = H count, IHD answer = formula IHD, M⁺ = nominal mass (tests enforce).

Gotchas
- Never return a value from a `useEffect` arrow: Chrome's `scrollTo` returns a Promise and React treats it as cleanup.
- Hash routes (`#/lesson/uv1/block`), `base: './'` for GitHub Pages.
