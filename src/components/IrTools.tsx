import { useState } from 'react';
import { CARBONYL_LADDER, lookupIr } from '../utils/irTable';
import { Rich } from './Rich';

/** Type a wavenumber → candidate groups and how to tell them apart. */
export function IrPeakFinder() {
  const [v, setV] = useState('1735');
  const wn = Number(v);
  const hits = v.trim() === '' ? [] : lookupIr(wn);
  const examples = ['3300', '2250', '1735', '1715', '1690', '1550', '2720'];
  return (
    <div className="panel calc">
      <h3>محلل قمم الـ IR</h3>
      <p className="muted small">
        <Rich text="اكتب رقم موجي (cm⁻¹) وشوف كل المجاميع اللي ممكن تعطيه، وشلون تفرّق بينها. القيم من السلايدات 62–96 (±10 cm⁻¹)." />
      </p>
      <div className="fields">
        <label htmlFor="irp">
          <span>Wavenumber (cm⁻¹)</span>
          <input id="irp" inputMode="numeric" value={v} onChange={(e) => setV(e.target.value)} />
        </label>
      </div>
      <div className="chips">
        {examples.map((x) => (
          <button key={x} className="chip" onClick={() => setV(x)} aria-pressed={v === x}>
            {x}
          </button>
        ))}
      </div>
      {v.trim() !== '' && !Number.isFinite(wn) && <p className="note">اكتب رقم بس.</p>}
      {Number.isFinite(wn) && v.trim() !== '' && hits.length === 0 && (
        <p className="note">
          <Rich text="ماكو مجموعة بجدول المحاضرة بهذا المكان. إذا القمة ضعيفة بين 1300 و400، فهي غالباً من الـ fingerprint region." />
        </p>
      )}
      <ul className="hits ir-hits">
        {hits.map((h) => (
          <li key={h.id}>
            <p className="en" dir="ltr">
              <b>{h.group}</b> · {h.vib} · {h.lo}–{h.hi} cm⁻¹ · {h.look}
            </p>
            <p className="small">
              <Rich text={h.tip} />
            </p>
            <p className="note" dir="ltr">Slide {h.slide}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Interactive carbonyl ladder (slide 87). */
export function CarbonylLadder() {
  const [sel, setSel] = useState(5);
  const hi = 1830;
  const lo = 1670;
  const W = 360;
  const H = 120;
  const x = (wn: number) => 16 + ((hi - wn) / (hi - lo)) * (W - 32);
  const s = CARBONYL_LADDER[sel];
  return (
    <div className="sim">
      <p className="label">سلّم الكاربونيل (سلايد 87): اضغط على أي مجموعة</p>
      <div className="spec">
        <svg className="fit" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Carbonyl ladder">
          <line x1={16} x2={W - 16} y1={70} y2={70} className="axisline" />
          {[1820, 1780, 1740, 1700].map((g) => (
            <text key={g} x={x(g)} y={108} textAnchor="middle" className="tick">{g}</text>
          ))}
          <text x={W - 16} y={92} textAnchor="end" className="axis">cm⁻¹ (lower →)</text>
          {CARBONYL_LADDER.map((c, i) => (
            <g key={c.name} onClick={() => setSel(i)} style={{ cursor: 'pointer' }} role="button" aria-label={`${c.name} ${c.wn}`}>
              <circle cx={x(c.wn)} cy={70} r={i === sel ? 9 : 6} className={i === sel ? 'dot on' : 'dot'} />
              <text x={x(c.wn)} y={i % 2 ? 46 : 30} textAnchor="middle" className="lbl">{c.wn}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="chips">
        {CARBONYL_LADDER.map((c, i) => (
          <button key={c.name} className="chip wide" dir="ltr" aria-pressed={i === sel} onClick={() => setSel(i)}>
            {c.name}
          </button>
        ))}
      </div>
      <p>
        <b dir="ltr">
          {s.name}: {s.wn} cm⁻¹
        </b>
      </p>
      <p>
        <Rich text={s.why} />
      </p>
    </div>
  );
}
