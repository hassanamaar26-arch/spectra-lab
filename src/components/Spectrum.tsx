import type { HPeak, IrPeak, MsPeak } from '../types';
import { pascal } from '../utils/calc';

const W = 640;
const HGT = 240;
const MULT = ['m', 's', 'd', 't', 'q', 'quint', 'sext', 'sept'];

export function IrSpectrum({ peaks }: { peaks: IrPeak[] }) {
  const L = 40, R = 12, T = 14, B = 34;
  // Conventional IR axis: 4000 → 400 left to right, scale doubles below 2000 cm⁻¹.
  const x = (w: number) => L + (w > 2000 ? ((4000 - w) / 2000) * 0.5 : 0.5 + ((2000 - w) / 1600) * 0.5) * (W - L - R);
  const tr = (w: number) => {
    let t = 0.97;
    for (const [c, d, wid] of peaks) t -= d * 0.9 * Math.exp(-((w - c) ** 2) / (2 * (wid / 2) ** 2));
    return Math.max(0.03, t);
  };
  const y = (t: number) => T + (1 - t) * (HGT - B - T);
  let d = '';
  for (let w = 4000; w >= 400; w -= 4) d += `${d ? 'L' : 'M'}${x(w).toFixed(1)} ${y(tr(w)).toFixed(1)}`;
  return (
    <svg viewBox={`0 0 ${W} ${HGT}`} role="img" aria-label="IR spectrum">
      {[4000, 3500, 3000, 2500, 2000, 1500, 1000, 500].map((g) => (
        <g key={g}>
          <line x1={x(g)} x2={x(g)} y1={T} y2={HGT - B} className="grid" />
          <text x={x(g)} y={HGT - B + 16} textAnchor="middle" className="tick">{g}</text>
        </g>
      ))}
      <text x={(W + L) / 2} y={HGT - 4} textAnchor="middle" className="axis">Wavenumber (cm⁻¹)</text>
      <text x={14} y={(HGT - B + T) / 2} textAnchor="middle" className="axis" transform={`rotate(-90 14 ${(HGT - B + T) / 2})`}>%T</text>
      <path d={d} className="trace" />
      {peaks.filter((p) => p[1] >= 0.5).map(([c]) => (
        <text key={c} x={x(c)} y={Math.min(HGT - B - 4, y(tr(c)) + 14)} textAnchor="middle" className="lbl">{c}</text>
      ))}
    </svg>
  );
}

export function HSpectrum({ peaks }: { peaks: HPeak[] }) {
  const L = 14, R = 14, T = 26, B = 34, MAX = 13;
  const x = (d: number) => L + ((MAX - d) / MAX) * (W - L - R);
  const maxH = Math.max(...peaks.map((p) => p[1]));
  const J = 0.07; // ~7 Hz at 100 MHz, drawn exaggerated for visibility
  return (
    <svg viewBox={`0 0 ${W} ${HGT}`} role="img" aria-label="1H NMR spectrum">
      <line x1={L} x2={W - R} y1={HGT - B} y2={HGT - B} className="axisline" />
      {Array.from({ length: MAX + 1 }, (_, g) => (
        <text key={g} x={x(g)} y={HGT - B + 17} textAnchor="middle" className="tick">{g}</text>
      ))}
      <text x={W / 2} y={HGT - 3} textAnchor="middle" className="axis">δ (ppm)</text>
      <line x1={x(0)} x2={x(0)} y1={HGT - B} y2={HGT - B - 30} className="tms" />
      <text x={x(0) - 4} y={HGT - B - 34} textAnchor="middle" className="axis">TMS</text>
      {peaks.map(([d, n, m]) => {
        const h = (HGT - B - T - 30) * (n / maxH) * 0.95 + 18;
        const lines = m === 0 ? [1, 2, 3, 2, 3, 1, 2] : pascal(m - 1);
        const big = Math.max(...lines);
        const off = (lines.length - 1) / 2;
        return (
          <g key={d}>
            {lines.map((v, k) => {
              const xx = x(d + (k - off) * J * (m === 0 ? 0.6 : 1));
              return <line key={k} x1={xx} x2={xx} y1={HGT - B} y2={HGT - B - (h * v) / big} className="stick" />;
            })}
            <text x={x(d)} y={HGT - B - h - 16} textAnchor="middle" className="lbl">{d.toFixed(2)}</text>
            <text x={x(d)} y={HGT - B - h - 4} textAnchor="middle" className="tick">{`${n}H, ${MULT[m]}`}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function CSpectrum({ peaks }: { peaks: number[] }) {
  const L = 14, R = 14, T = 26, B = 34, MAX = 220;
  const x = (d: number) => L + ((MAX - d) / MAX) * (W - L - R);
  return (
    <svg viewBox={`0 0 ${W} ${HGT}`} role="img" aria-label="13C NMR spectrum">
      <line x1={L} x2={W - R} y1={HGT - B} y2={HGT - B} className="axisline" />
      {Array.from({ length: 12 }, (_, i) => i * 20).map((g) => (
        <text key={g} x={x(g)} y={HGT - B + 17} textAnchor="middle" className="tick">{g}</text>
      ))}
      <text x={W / 2} y={HGT - 3} textAnchor="middle" className="axis">δ (ppm)</text>
      {peaks.map((d) => (
        <g key={d}>
          <line x1={x(d)} x2={x(d)} y1={HGT - B} y2={T + 30} className="stick" />
          <text x={x(d)} y={T + 24} textAnchor="middle" className="lbl">{d}</text>
        </g>
      ))}
    </svg>
  );
}

export function MsSpectrum({ peaks }: { peaks: MsPeak[] }) {
  const L = 40, R = 14, T = 22, B = 34;
  const maxM = Math.ceil((Math.max(...peaks.map((p) => p[0])) + 10) / 10) * 10;
  const x = (m: number) => L + (m / maxM) * (W - L - R);
  const y = (v: number) => HGT - B - (v / 100) * (HGT - B - T);
  const step = maxM > 100 ? 20 : 10;
  return (
    <svg viewBox={`0 0 ${W} ${HGT}`} role="img" aria-label="Mass spectrum">
      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} className="grid" />
          <text x={L - 6} y={y(g) + 4} textAnchor="end" className="tick">{g}</text>
        </g>
      ))}
      {Array.from({ length: maxM / step + 1 }, (_, i) => i * step).map((g) => (
        <text key={g} x={x(g)} y={HGT - B + 16} textAnchor="middle" className="tick">{g}</text>
      ))}
      <text x={(W + L) / 2} y={HGT - 3} textAnchor="middle" className="axis">m/z</text>
      {peaks.map(([m, v]) => (
        <g key={m}>
          <rect x={x(m) - 2} y={y(v)} width={4} height={HGT - B - y(v)} className="bar" />
          {v >= 8 && <text x={x(m)} y={y(v) - 5} textAnchor="middle" className="lbl">{m}</text>}
        </g>
      ))}
    </svg>
  );
}
