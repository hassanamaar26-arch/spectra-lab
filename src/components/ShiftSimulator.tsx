import { useState } from 'react';
import { classifyShift, SCENARIOS, type Band } from '../utils/shifts';
import { Rich } from './Rich';

const W = 640;
const H = 220;
const L = 40;
const R = 14;
const T = 18;
const B = 34;
const MIN = 200;
const MAX = 460;

const x = (nm: number) => L + ((nm - MIN) / (MAX - MIN)) * (W - L - R);

function path(b: Band, top: number) {
  const y = (v: number) => H - B - v * (H - B - T);
  let d = '';
  for (let nm = MIN; nm <= MAX; nm += 2) {
    const v = (b.e / top) * Math.exp(-((nm - b.l) ** 2) / (2 * 22 ** 2));
    d += `${d ? 'L' : 'M'}${x(nm).toFixed(1)} ${y(v).toFixed(1)}`;
  }
  return d;
}

const KIND_AR: Record<string, string> = {
  bathochromic: 'Bathochromic (red)',
  hypsochromic: 'Hypsochromic (blue)',
  hyperchromic: 'Hyperchromic',
  hypochromic: 'Hypochromic',
};

export function ShiftSimulator() {
  const [id, setId] = useState(SCENARIOS[4].id);
  const s = SCENARIOS.find((x) => x.id === id) ?? SCENARIOS[0];
  const top = Math.max(s.from.e, s.to.e);
  const kinds = classifyShift(s.from, s.to);
  return (
    <div className="sim">
      <p className="label">محاكي الـ Shifts: اختار حالة وشوف شنو يصير بالمنحني</p>
      <div className="chips">
        {SCENARIOS.map((x) => (
          <button key={x.id} className="chip wide" aria-pressed={x.id === id} onClick={() => setId(x.id)} dir="ltr">
            {x.label}
          </button>
        ))}
      </div>
      <div className="spec">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${s.fromName} to ${s.toName}`}>
          {[200, 250, 300, 350, 400, 450].map((g) => (
            <g key={g}>
              <line x1={x(g)} x2={x(g)} y1={T} y2={H - B} className="grid" />
              <text x={x(g)} y={H - B + 16} textAnchor="middle" className="tick">{g}</text>
            </g>
          ))}
          <text x={(W + L) / 2} y={H - 3} textAnchor="middle" className="axis">λ (nm)</text>
          <text x={14} y={(H - B + T) / 2} textAnchor="middle" className="axis" transform={`rotate(-90 14 ${(H - B + T) / 2})`}>A</text>
          <path d={path(s.from, top)} className="trace before" />
          <path d={path(s.to, top)} className="trace" />
          <g className="legend">
            <line x1={W - 190} x2={W - 168} y1={T + 6} y2={T + 6} className="trace before" />
            <text x={W - 162} y={T + 10} className="tick">{`${s.fromName} (${s.from.l} nm)`}</text>
            <line x1={W - 190} x2={W - 168} y1={T + 24} y2={T + 24} className="trace" />
            <text x={W - 162} y={T + 28} className="tick">{`${s.toName} (${s.to.l} nm)`}</text>
          </g>
        </svg>
      </div>
      <p>
        <b dir="ltr">{kinds.map((k) => KIND_AR[k]).join(' + ')}</b>
      </p>
      <p>
        <Rich text={s.why} />
      </p>
      <p className="note" dir="ltr">
        Slide {s.slides.join(', ')}
        {s.extra ? ' · [Extra] values not on the slide' : ''}
      </p>
    </div>
  );
}
