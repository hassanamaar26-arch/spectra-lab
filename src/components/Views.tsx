import { useEffect, useMemo, useState } from 'react';
import type { Progress, Quiz } from '../types';
import { PLAN } from '../data/plan';
import { UNITS } from '../data/units';
import { LESSONS, QUIZZES, lessonById, quizById } from '../data';
import { PROBLEMS } from '../data/spectra/problems';
import { BilingualBlock } from './BilingualBlock';
import { Calculators } from './Calculators';
import { ALL_CALCS } from '../utils/calcIds';
import { CSpectrum, HSpectrum, IrSpectrum, MsSpectrum } from './Spectrum';
import { Rich } from './Rich';
import { currentDay, planPct } from '../utils/progress';
import { search } from '../utils/search';

type Update = (fn: (p: Progress) => Progress) => void;

/* ---------------- PLAN ---------------- */
export function PlanView({ p, update }: { p: Progress; update: Update }) {
  const cd = currentDay(p.start);
  const weekNames = ['الأسبوع 1 · UV وبداية IR', 'الأسبوع 2 · IR وبداية NMR', 'الأسبوع 3 · ¹H-NMR و¹³C', 'الأسبوع 4 · Mass Spectrometry', 'الأسبوع 5 · الدمج والامتحانات'];
  useEffect(() => {
    document.getElementById(`day${cd}`)?.scrollIntoView({ block: 'center' });
  }, [cd]);
  const toggle = (key: string, on: boolean) =>
    update((q) => {
      const tasks = { ...q.tasks };
      if (on) tasks[key] = true;
      else delete tasks[key];
      return { ...q, tasks };
    });
  const pct = planPct(p);
  return (
    <>
      <section className="panel">
        <h2>خطتك: 35 يوم × ساعتين</h2>
        <p className="muted">أول 27 يوم تفهم كل تقنية لوحدها، بعدها 6 أيام دمج وحل spectra، وآخر يومين امتحانات تجريبية.</p>
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="stats">
          <div className="stat"><b dir="ltr">{pct}%</b><span>من الخطة</span></div>
          <div className="stat"><b>{cd}</b><span>يومك الحالي</span></div>
          <div className="stat"><b dir="ltr">{Object.keys(p.quiz).length}/{QUIZZES.length}</b><span>كويزات</span></div>
          <div className="stat"><b dir="ltr">{Object.keys(p.trainer).length}/{PROBLEMS.length}</b><span>spectra حليتها</span></div>
        </div>
        <label htmlFor="start" className="row-label">
          <span>تاريخ بداية الخطة</span>
          <input id="start" type="date" value={p.start} onChange={(e) => e.target.value && update((q) => ({ ...q, start: e.target.value }))} />
        </label>
      </section>
      {PLAN.map((d, i) => {
        const n = i + 1;
        const done = d.tasks.filter((_, j) => p.tasks[`${n}-${j}`]).length;
        const ready = d.link ? !!lessonById(d.link.split('/')[1]) : true;
        return (
          <div key={n}>
            {i % 7 === 0 && <p className="wk">{weekNames[i / 7]}</p>}
            <details className={`day${n === cd ? ' today' : ''}${done === d.tasks.length ? ' done' : ''}`} id={`day${n}`} open={n === cd}>
              <summary>
                <span className="dnum">{n}</span>
                <span className="dtitle">
                  <Rich text={d.title} />
                  <small>
                    <Rich text={`السلايدات ${d.slides} · ${done}/${d.tasks.length}${n === cd ? ' · اليوم' : ''}`} />
                  </small>
                </span>
              </summary>
              {d.tasks.map((t, j) => (
                <label className="task" key={j} htmlFor={`t${n}-${j}`}>
                  <input id={`t${n}-${j}`} type="checkbox" checked={!!p.tasks[`${n}-${j}`]} onChange={(e) => toggle(`${n}-${j}`, e.target.checked)} />
                  <span><Rich text={t} /></span>
                </label>
              ))}
              {d.link && (ready ? <a className="btn small-btn" href={`#/${d.link}`}>افتح الدرس</a> : <p className="note">درس هذا اليوم ينضاف بمرحلته.</p>)}
            </details>
          </div>
        );
      })}
    </>
  );
}

/* ---------------- LESSONS ---------------- */
export function LessonList({ p }: { p: Progress }) {
  return (
    <section className="panel">
      <h2>الدروس</h2>
      <p className="muted">كل فكرة بالسلايدات: الجملة الإنكليزية مثل الامتحان، ترجمتها، شرح من الصفر، وتصحيح أخطاء الملزمة.</p>
      <div className="cards">
        {UNITS.map((u) => {
          const l = lessonById(u.id);
          const inner = (
            <>
              <span className="n">{u.n}</span>
              <span className="t">
                <Rich text={u.title} />
                <small><Rich text={`Slides ${u.slides[0]}–${u.slides[1]} · ${l ? (p.lessons[u.id] ? '✓ قريته' : 'جاهز') : 'ينضاف بمرحلته'}`} /></small>
              </span>
            </>
          );
          return l ? <a key={u.id} className="card" href={`#/lesson/${u.id}`}>{inner}</a> : <div key={u.id} className="card off">{inner}</div>;
        })}
      </div>
    </section>
  );
}

export function LessonView({ id, focus, p, update }: { id: string; focus?: string; p: Progress; update: Update }) {
  const l = lessonById(id);
  useEffect(() => {
    if (focus) document.getElementById(`b-${focus}`)?.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }, [id, focus]);
  if (!l) return <section className="panel"><p>الدرس هذا بعده ما انضاف.</p><a className="btn" href="#/lessons">رجوع</a></section>;
  const exam = p.examMode;
  return (
    <>
      <section className="panel lesson-top">
        <p className="kicker" dir="ltr">Unit {l.unit} · Slides {l.slides[0]}–{l.slides[1]}</p>
        <h2><Rich text={l.title} /></h2>
        {!exam && <p className="big"><Rich text={l.bigPicture} /></p>}
        <nav className="toc" aria-label="محتويات الدرس">
          {l.blocks.map((b) => (
            <a key={b.id} href={`#/lesson/${l.id}/${b.id}`}><Rich text={b.title} /></a>
          ))}
        </nav>
      </section>
      {l.blocks.map((b) => <BilingualBlock key={b.id} b={b} exam={exam} />)}
      <section className="panel">
        <h3>🗺️ Memory map</h3>
        <div className="flow" dir="ltr">{l.memoryMap.map((m, i) => <div key={i}>{m}</div>)}</div>
      </section>
      {l.calculators && (
        <section>
          <h3 className="sec">جرّب بالحاسبات</h3>
          <Calculators ids={l.calculators} />
        </section>
      )}
      <section className="panel row">
        <button className="btn primary" onClick={() => update((q) => ({ ...q, lessons: { ...q.lessons, [l.id]: true } }))} disabled={!!p.lessons[l.id]}>
          {p.lessons[l.id] ? '✓ قريته' : 'خلصت قراءة الدرس'}
        </button>
        {l.quizId && <a className="btn" href={`#/quiz/${l.quizId}`}>كويز الوحدة</a>}
      </section>
    </>
  );
}

/* ---------------- QUIZ ---------------- */
export function QuizList({ p }: { p: Progress }) {
  return (
    <section className="panel">
      <h2>الكويزات</h2>
      <p className="muted">أسئلة بالإنكليزي مثل الامتحان. بعد كل جواب يطلعلك ليش.</p>
      <div className="cards">
        {QUIZZES.map((z) => (
          <a key={z.id} className="card" href={`#/quiz/${z.id}`}>
            <span className="n">{z.qs.length}</span>
            <span className="t"><Rich text={z.title} /><small>{p.quiz[z.id] != null ? `أحسن نتيجة: ${p.quiz[z.id]}/${z.qs.length}` : 'ما انحل بعد'}</small></span>
          </a>
        ))}
      </div>
      <p className="note">كل وحدة جديدة تجيب كويزها ويّاها.</p>
    </section>
  );
}

export function QuizRun({ id, update }: { id: string; update: Update }) {
  const z = quizById(id);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<Quiz['qs']>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i]);
  if (!z) return <section className="panel"><p>الكويز مو موجود.</p></section>;
  if (i >= z.qs.length) {
    return (
      <section className="panel">
        <h2>النتيجة: <span dir="ltr">{score}/{z.qs.length}</span></h2>
        {wrong.length ? (
          <>
            <p>راجع هذني، كل واحد ويا رقم سلايده:</p>
            <ul>{wrong.map((w, k) => <li key={k}><span dir="ltr">{w.q}</span>{w.slides && <span className="muted" dir="ltr"> · Slide {w.slides.join(', ')}</span>}</li>)}</ul>
          </>
        ) : <p>كلها صح. انتقل للخطوة الجاية بالخطة.</p>}
        <div className="row">
          <button className="btn primary" onClick={() => { setI(0); setScore(0); setWrong([]); setPicked(null); }}>أعد الكويز</button>
          <a className="btn" href="#/quiz">رجوع</a>
        </div>
      </section>
    );
  }
  const q = z.qs[i];
  const choose = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    const ok = k === q.a;
    const nextScore = score + (ok ? 1 : 0);
    if (ok) setScore(nextScore);
    else setWrong([...wrong, q]);
    if (i === z.qs.length - 1) update((p) => ({ ...p, quiz: { ...p.quiz, [z.id]: Math.max(p.quiz[z.id] ?? 0, nextScore) } }));
  };
  return (
    <section className="panel">
      <p className="muted" dir="ltr">{i + 1} / {z.qs.length}</p>
      <h3 className="q" dir="ltr">{q.q}</h3>
      {q.o.map((o, k) => (
        <button key={k} dir="ltr" className={`opt${picked !== null && k === q.a ? ' right' : ''}${picked === k && k !== q.a ? ' wrong' : ''}`} onClick={() => choose(k)} disabled={picked !== null}>
          {o}
        </button>
      ))}
      {picked !== null && (
        <>
          <div className={`flag ${picked === q.a ? 'flag-hy' : 'flag-trap'}`}><b>{picked === q.a ? 'صح.' : 'مو هذا.'}</b> <Rich text={q.why} /></div>
          <button className="btn primary" onClick={() => { setI(i + 1); setPicked(null); }}>{i + 1 < z.qs.length ? 'السؤال الجاي' : 'شوف النتيجة'}</button>
        </>
      )}
    </section>
  );
}

/* ---------------- TRAINER ---------------- */
export function Trainer({ p, update }: { p: Progress; update: Update }) {
  const [cur, setCur] = useState(0);
  const [tab, setTab] = useState(0);
  const [solved, setSolved] = useState<Record<number, boolean>>({});
  const [tries, setTries] = useState<Record<string, true>>({});
  const prob = PROBLEMS[cur];
  const all = [...prob.steps, { q: 'Choose the final structure:', o: prob.choices, a: prob.answer, why: prob.final }];
  const go = (k: number) => { setCur(k); setTab(0); setSolved({}); setTries({}); };
  const tabs = ['IR', '¹H-NMR', '¹³C-NMR', 'Mass'];
  return (
    <>
      <section className="panel">
        <h2>متدرب الـ Spectra</h2>
        <p className="muted">تحل بإيدك خطوة بخطوة: IHD، بعدين IR، بعدين NMR وMass، وبالأخير التركيب. كل خطوة تنفتح بعد اللي قبلها.</p>
        <div className="chips">
          {PROBLEMS.map((x, k) => (
            <button key={x.id} className={`chip${p.trainer[x.id] ? ' solved' : ''}`} aria-pressed={k === cur} onClick={() => go(k)}>{k + 1}</button>
          ))}
        </div>
      </section>
      <section className="panel">
        <p className="muted">مسألة {cur + 1} من {PROBLEMS.length} · مستوى {prob.level}</p>
        <h2 dir="ltr" className="formula">{prob.formula.split(/(\d+)/).map((s, i) => (/^\d+$/.test(s) ? <sub key={i}>{s}</sub> : s))}</h2>
        <div className="chips">
          {tabs.map((t, k) => <button key={t} className="chip wide" aria-pressed={tab === k} onClick={() => setTab(k)}>{t}</button>)}
        </div>
        <div className="spec">
          {tab === 0 && <IrSpectrum peaks={prob.ir} />}
          {tab === 1 && <HSpectrum peaks={prob.h1} />}
          {tab === 2 && <CSpectrum peaks={prob.c13} />}
          {tab === 3 && <MsSpectrum peaks={prob.ms} />}
        </div>
        <p className="note">اسحب الـ spectrum يمين ويسار إذا الشاشة صغيرة.</p>
        <div className="steps">
          {all.map((s, i) => {
            const open = i === 0 || solved[i - 1];
            return (
              <div key={i} className={`step${open ? '' : ' locked'}`} aria-disabled={!open}>
                <p className="muted small">{i === all.length - 1 ? 'الخطوة الأخيرة' : `خطوة ${i + 1}`}</p>
                <p className="q" dir="ltr">{s.q}</p>
                {s.o.map((o, k) => {
                  const key = `${i}-${k}`;
                  const right = solved[i] && k === s.a;
                  return (
                    <button key={k} dir="ltr" className={`opt${right ? ' right' : ''}${tries[key] ? ' wrong' : ''}`} disabled={!open || solved[i] || !!tries[key]}
                      onClick={() => {
                        if (k === s.a) {
                          setSolved({ ...solved, [i]: true });
                          if (i === all.length - 1) update((q) => ({ ...q, trainer: { ...q.trainer, [prob.id]: true } }));
                        } else setTries({ ...tries, [key]: true });
                      }}>
                      {o}
                    </button>
                  );
                })}
                {solved[i] && <div className="flag flag-hy"><b>صح.</b> <Rich text={s.why} /></div>}
                {!solved[i] && s.o.some((_, k) => tries[`${i}-${k}`]) && <p className="note">جرب مرة ثانية. ارجع للـ spectrum وفكّر بالمنطق.</p>}
                {solved[i] && i === all.length - 1 && <button className="btn primary" onClick={() => go((cur + 1) % PROBLEMS.length)}>المسألة الجاية</button>}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

/* ---------------- CALCULATORS ---------------- */
export function CalcView() {
  return (
    <>
      <section className="panel"><h2>الحاسبات</h2><p className="muted">حل على الورق أول، وبعدين تأكد هنا.</p></section>
      <Calculators ids={ALL_CALCS} />
    </>
  );
}

/* ---------------- SEARCH ---------------- */
export function SearchView({ q }: { q: string }) {
  const hits = useMemo(() => search(q), [q]);
  return (
    <section className="panel">
      <h2>نتائج البحث</h2>
      {!q.trim() ? <p className="muted">اكتب كلمة أو رقم سلايد بالبحث فوق.</p> : hits.length === 0 ? <p className="muted">ماكو نتائج بالدروس المنشورة لحد الآن.</p> : (
        <ul className="hits">
          {hits.map((h) => (
            <li key={h.lesson + h.block}>
              <a href={`#/lesson/${h.lesson}/${h.block}`}><Rich text={h.title} /></a>
              <span className="muted small" dir="ltr"> Unit {h.unit} · Slide {h.slides}</span>
              <p className="small en" dir="ltr">{h.snippet}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="note">البحث يشمل {LESSONS.length} من {UNITS.length} وحدات منشورة.</p>
    </section>
  );
}
