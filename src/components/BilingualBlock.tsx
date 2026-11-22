import { useState } from 'react';
import type { Block, FlagKind } from '../types';
import { Rich } from './Rich';
import { ShiftSimulator } from './ShiftSimulator';
import { IrFactors } from './IrFactors';

const FLAG_LABEL: Record<FlagKind, string> = {
  hy: '⭐ HIGH YIELD',
  trap: '⚠️ EXAM TRAP',
  fix: '🔧 SLIDE FIX',
  extra: '[Extra]',
};

export function BilingualBlock({ b, exam }: { b: Block; exam: boolean }) {
  const [showWorked, setShowWorked] = useState(false);
  return (
    <article className="block" id={`b-${b.id}`}>
      <header className="block-head">
        <h3>
          <Rich text={b.title} />
        </h3>
        <span className="slide-tag" dir="ltr">
          Slide {b.slides.length > 1 ? `${b.slides[0]}–${b.slides[b.slides.length - 1]}` : b.slides[0]}
        </span>
      </header>

      <p className="en" dir="ltr" lang="en">
        {b.en}
      </p>
      {!exam && (
        <p className="ar">
          <Rich text={b.ar} />
        </p>
      )}

      {b.eq && (
        <div className="eqs">
          {b.eq.map((e, i) => (
            <div className="eq" dir="ltr" key={i}>
              {e}
            </div>
          ))}
        </div>
      )}

      {!exam && b.deep && (
        <div className="deep">
          <p className="label">الشرح من الصفر</p>
          {b.deep.map((d, i) => (
            <p key={i}>
              <Rich text={d} />
            </p>
          ))}
        </div>
      )}
      {!exam && b.analogy && (
        <p className="analogy">
          <Rich text={b.analogy} />
        </p>
      )}

      {b.flow && (
        <div className="flow" dir="ltr">
          {b.flow.map((f, i) => (
            <div key={i}>{f}</div>
          ))}
        </div>
      )}

      {b.table && (
        <div className="tbl">
          <table>
            <thead>
              <tr>
                {b.table.head.map((h, i) => (
                  <th key={i}>
                    <Rich text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>
                      <Rich text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {b.flags
        ?.filter((f) => !exam || f.kind === 'fix')
        .map((f, i) => (
          <div className={`flag flag-${f.kind}`} key={i}>
            <b dir="ltr">{FLAG_LABEL[f.kind]}</b> <Rich text={f.text} />
          </div>
        ))}

      {b.widget === 'shifts' && <ShiftSimulator />}
      {b.widget === 'irfactors' && <IrFactors />}

      {b.worked && (
        <div className="worked">
          <button className="btn" onClick={() => setShowWorked((s) => !s)} aria-expanded={showWorked}>
            {showWorked ? 'اخفِ الحل' : `اعرض الحل خطوة بخطوة (${b.worked.length})`}
          </button>
          {showWorked &&
            b.worked.map((w, i) => (
              <div className="work" key={i}>
                <p className="en" dir="ltr">
                  {w.q}
                </p>
                <div className="flow" dir="ltr">
                  {w.steps.map((s, j) => (
                    <div key={j}>{s}</div>
                  ))}
                  <div className="ans">→ {w.answer}</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </article>
  );
}
