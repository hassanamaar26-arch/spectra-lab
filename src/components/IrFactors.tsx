import { useState } from 'react';
import { IR_SCENARIOS } from '../utils/irFactors';
import { Rich } from './Rich';

const W = 640;
const H = 220;
const L = 40;
const R = 14;
const T = 14;
const B = 34;
const COLORS = ['var(--muted)', 'var(--accent)', 'var(--warm)'];

export function IrFactors() {
  const [id, setId] = useState(IR_SCENARIOS[0].id);
  const s = IR_SCENARIOS.find((x) => x.id === id) ?? IR_SCENARIOS[0];
  const [hi, lo] = s.range;
  const x = (wn: number) => L + ((hi - wn) / (hi - lo)) * (W - L - R);
  const y = (t: number) => T + (1 - t) * (H - B - T);
  const step = (hi - lo) / 4;
  return (
    <div className="sim">
      <p className="label">مقارنة تفاعلية: شلون يتحرك تردد الآصرة ويا كل عامل</p>
      <div className="chips">
        {IR_SCENARIOS.map((x) => (
          <button key={x.id} className="chip wide" aria-pressed={x.id === id} onClick={() => setId(x.id)} dir="ltr">
            {x.label}
          </button>
        ))}
      </div>
      <div className="spec">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={s.label}>
          {Array.from({ length: 5 }, (_, i) => Math.round(hi - i * step)).map((g) => (
            <g key={g}>
              <line x1={x(g)} x2={x(g)} y1={T} y2={H - B} className="grid" />
              <text x={x(g)} y={H - B + 16} textAnchor="middle" className="tick">{g}</text>
            </g>
          ))}
          <text x={(W + L) / 2} y={H - 3} textAnchor="middle" className="axis">Wavenumber (cm⁻¹)</text>
          <text x={14} y={(H - B + T) / 2} textAnchor="middle" className="axis" transform={`rotate(-90 14 ${(H - B + T) / 2})`}>%T</text>
          {s.bands.map((b, k) => {
            let d = '';
            for (let wn = hi; wn >= lo; wn -= (hi - lo) / 320) {
              const t = 0.97 - b.depth * 0.9 * Math.exp(-((wn - b.wn) ** 2) / (2 * (b.width / 2) ** 2));
              d += `${d ? 'L' : 'M'}${x(wn).toFixed(1)} ${y(t).toFixed(1)}`;
            }
            return (
              <g key={b.name}>
                <path d={d} fill="none" stroke={COLORS[k % 3]} strokeWidth={1.8} strokeDasharray={k === 0 && s.bands.length > 1 ? '5 4' : undefined} />
                <text x={x(b.wn)} y={y(0.97 - b.depth * 0.9) + 14} textAnchor="middle" className="lbl">{b.wn}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="legend-list" dir="ltr">
        {s.bands.map((b, k) => (
          <li key={b.name}>
            <i style={{ background: COLORS[k % 3] }} /> {b.name}: {b.wn} cm⁻¹
          </li>
        ))}
      </ul>
      <p>
        <Rich text={s.why} />
      </p>
      {s.extra && (
        <p className="note">
          <b dir="ltr">[Extra]</b> <Rich text={s.extra} />
        </p>
      )}
      <p className="note" dir="ltr">Slide {s.slides.join(', ')}</p>
    </div>
  );
}
