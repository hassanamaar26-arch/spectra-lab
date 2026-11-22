import { useState, type ReactNode } from 'react';
import type { CalcId } from '../types';
import {
  absFromPercentT,
  emr,
  fmt,
  ihd,
  isotopePattern,
  MULT_NAMES,
  pascal,
  percentTFromAbs,
  solveBeer,
  type EmrUnit,
} from '../utils/calc';
import { Rich } from './Rich';

function num(s: string): number | undefined {
  if (s.trim() === '') return undefined;
  const v = Number(s);
  return Number.isFinite(v) ? v : undefined;
}

function Card({ title, hint, children, out }: { title: string; hint: string; children: ReactNode; out: string }) {
  return (
    <div className="panel calc">
      <h3 dir="auto">{title}</h3>
      <p className="muted small">
        <Rich text={hint} />
      </p>
      <div className="fields">{children}</div>
      <pre className="out" dir="ltr" aria-live="polite">
        {out}
      </pre>
    </div>
  );
}

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label htmlFor={id}>
      <span dir="auto">{label}</span>
      <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function safe(fn: () => string): string {
  try {
    return fn();
  } catch (e) {
    return (e as Error).message;
  }
}

function TA() {
  const [t, setT] = useState('33.6');
  const [a, setA] = useState('');
  const out = safe(() => {
    const T = num(t);
    const A = num(a);
    if (T !== undefined && A === undefined) return `A = 2 − log(${T}) = ${fmt(absFromPercentT(T))}`;
    if (A !== undefined && T === undefined) return `%T = 10^(2 − ${A}) = ${fmt(percentTFromAbs(A))} %`;
    return 'Fill only one field';
  });
  return (
    <Card title="%T ↔ Absorbance" hint="اكتب واحد بس. A = 2 − log %T" out={out}>
      <Field id="ta-t" label="%T" value={t} onChange={setT} />
      <Field id="ta-a" label="A" value={a} onChange={setA} />
    </Card>
  );
}

function Beer() {
  const [v, setV] = useState({ A: '0.5', e: '10000', b: '1', c: '' });
  const set = (k: keyof typeof v) => (s: string) => setV({ ...v, [k]: s });
  const out = safe(() => {
    const r = solveBeer({ A: num(v.A), e: num(v.e), b: num(v.b), c: num(v.c) });
    const unit = { A: '', e: ' L·mol⁻¹·cm⁻¹', b: ' cm', c: ' mol/L' }[r.key];
    return `${r.key === 'e' ? 'ε' : r.key} = ${fmt(r.value)}${unit}`;
  });
  return (
    <Card title="Beer-Lambert" hint="اترك الحقل المجهول فارغ. A = ε · l · c" out={out}>
      <Field id="bl-a" label="A" value={v.A} onChange={set('A')} />
      <Field id="bl-e" label="ε (L/mol·cm)" value={v.e} onChange={set('e')} />
      <Field id="bl-b" label="l (cm)" value={v.b} onChange={set('b')} />
      <Field id="bl-c" label="c (mol/L)" value={v.c} onChange={set('c')} />
    </Card>
  );
}

function Emr() {
  const [x, setX] = useState('2000');
  const [u, setU] = useState<EmrUnit>('cm-1');
  const out = safe(() => {
    const r = emr(num(x) ?? NaN, u);
    return [
      `λ  = ${fmt(r.nm)} nm = ${fmt(r.lambdaCm)} cm`,
      `ν  = ${fmt(r.hz)} Hz`,
      `ν̄  = ${fmt(r.wavenumber)} cm⁻¹`,
      `E  = ${fmt(r.joule)} J per photon`,
      `E  = ${fmt(r.kjPerMol)} kJ/mol`,
      `Region: ${r.region}`,
    ].join('\n');
  });
  return (
    <Card title="محوّل الإشعاع EMR" hint="λ ↔ ν ↔ ν̄ ↔ E للـ photon الواحد (c = 2.998 × 10¹⁰ cm/s)" out={out}>
      <Field id="emr-x" label="القيمة" value={x} onChange={setX} />
      <label htmlFor="emr-u">
        <span>الوحدة</span>
        <select id="emr-u" value={u} onChange={(e) => setU(e.target.value as EmrUnit)}>
          <option value="cm-1">cm⁻¹</option>
          <option value="nm">nm</option>
          <option value="um">µm</option>
          <option value="A">Å</option>
          <option value="cm">cm (λ)</option>
          <option value="Hz">Hz</option>
        </select>
      </label>
    </Card>
  );
}

function Ihd() {
  const [v, setV] = useState({ C: '8', H: '10', N: '0', X: '0' });
  const set = (k: keyof typeof v) => (s: string) => setV({ ...v, [k]: s });
  const r = ihd(num(v.C) ?? 0, num(v.H) ?? 0, num(v.N) ?? 0, num(v.X) ?? 0);
  const note =
    r < 0 || r % 1 ? 'Check the formula: IHD must be a whole number ≥ 0' : r === 0 ? 'Saturated, no ring' : r === 1 ? 'One ring OR one double bond' : r === 2 ? 'Triple bond, 2 double bonds, 2 rings, or 1 + 1' : r >= 4 ? 'IHD ≥ 4: think benzene ring' : 'Combination of rings / π bonds';
  return (
    <Card title="IHD (Degree of unsaturation)" hint="الـ O والـ S ما يتحسبون. الهالوجين يتحسب مثل H" out={`IHD = (2C + 2 + N − H − X) / 2 = ${r}\n${note}`}>
      <Field id="ihd-c" label="C" value={v.C} onChange={set('C')} />
      <Field id="ihd-h" label="H" value={v.H} onChange={set('H')} />
      <Field id="ihd-n" label="N" value={v.N} onChange={set('N')} />
      <Field id="ihd-x" label="X (F, Cl, Br, I)" value={v.X} onChange={set('X')} />
    </Card>
  );
}

function NRule() {
  const [m, setM] = useState('41');
  const M = Math.round(num(m) ?? NaN);
  const out = Number.isFinite(M) ? (M % 2 ? `M = ${M} is odd → odd number of N` : `M = ${M} is even → zero or even number of N`) : 'Enter M';
  return (
    <Card title="Nitrogen rule" hint="اكتب كتلة الـ M⁺" out={out}>
      <Field id="nr-m" label="M (m/z)" value={m} onChange={setM} />
    </Card>
  );
}

function NPlus1() {
  const [n, setN] = useState('3');
  const k = Math.max(0, Math.min(8, Math.round(num(n) ?? 0)));
  return (
    <Card title="n + 1 وPascal" hint="عدد الـ H الجيران غير المتكافئة" out={`n + 1 = ${k + 1} → ${MULT_NAMES[k]}\nRatio: ${pascal(k).join(' : ')}`}>
      <Field id="np-n" label="n" value={n} onChange={setN} />
    </Card>
  );
}

function Iso() {
  const [cl, setCl] = useState('1');
  const [br, setBr] = useState('0');
  const c = Math.max(0, Math.min(6, Math.round(num(cl) ?? 0)));
  const b = Math.max(0, Math.min(6, Math.round(num(br) ?? 0)));
  const d = isotopePattern(c, b);
  const out = d.map((x, i) => `${i ? 'M+' + 2 * i : 'M  '}  ${String(Math.round(x)).padStart(3)}  ${'█'.repeat(Math.round(x / 5))}`).join('\n');
  return (
    <Card title="نمط النظائر Cl / Br" hint="نسب M وM+2 وM+4" out={out}>
      <Field id="iso-cl" label="Cl" value={cl} onChange={setCl} />
      <Field id="iso-br" label="Br" value={br} onChange={setBr} />
    </Card>
  );
}

const REGISTRY: Record<CalcId, () => JSX.Element> = { tA: TA, beer: Beer, emr: Emr, ihd: Ihd, nrule: NRule, nplus1: NPlus1, iso: Iso };

export function Calculators({ ids }: { ids: CalcId[] }) {
  return (
    <div className="grid2">
      {ids.map((id) => {
        const C = REGISTRY[id];
        return <C key={id} />;
      })}
    </div>
  );
}
