import { Fragment, type ReactNode } from 'react';

/*
 * Renders Iraqi-Arabic text that contains English terms without scrambling
 * the line order: every Latin/number/formula run is isolated in <bdi>.
 * Supports **bold** markup.
 */
const FIRST = '(A-Za-z0-9σπλνεδΔµÅηθ¹²³⁴⁵⁶⁷⁸⁹⁰⁻⁺₀₁₂₃₄₅₆₇₈₉%';
const REST = FIRST + ' ).,:\\-+−–→←↔*/=\'’·×^~≈<>\\[\\]_⁄';
// U+0304 (combining macron, as in ν̄) is matched as its own alternative.
const LATIN = new RegExp(`(?:[${FIRST}]|\\u0304)(?:[${REST}]|\\u0304)*`, 'g');

function isolate(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(LATIN.source, 'g');
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const start = m.index;
    let run = m[0];
    // A run never crosses a sentence or label boundary ("… cm/s. 1 Å …").
    const stop = run.search(/[.:]\s/);
    if (stop >= 0) run = run.slice(0, stop + 1);
    run = run.replace(/[\s.,:(]+$/, '');
    re.lastIndex = start + Math.max(run.length, 1);
    if (!/[A-Za-z0-9σπλνεδΔµÅηθ]/.test(run)) continue;
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <bdi key={`${key}-${i++}`} dir="ltr">
        {run}
      </bdi>,
    );
    last = start + run.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Rich({ text }: { text: string }) {
  // Pure English/number strings keep their own LTR order as one unit.
  if (!/[\u0600-\u06FF]/.test(text)) return <bdi dir="ltr">{text.replace(/\*\*/g, '')}</bdi>;
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <b key={i}>{isolate(p.slice(2, -2), `b${i}`)}</b>
        ) : (
          <Fragment key={i}>{isolate(p, `t${i}`)}</Fragment>
        ),
      )}
    </>
  );
}
