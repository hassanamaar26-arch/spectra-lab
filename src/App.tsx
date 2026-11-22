import { useCallback, useEffect, useRef, useState } from 'react';
import type { Progress } from './types';
import { emptyProgress, storage } from './utils/storage';
import { CalcView, LessonList, LessonView, PlanView, QuizList, QuizRun, SearchView, Trainer } from './components/Views';
import { planPct } from './utils/progress';

const TABS: [string, string][] = [
  ['plan', 'الخطة'],
  ['lessons', 'الدروس'],
  ['quiz', 'الكويزات'],
  ['trainer', 'متدرب الـ Spectra'],
  ['calc', 'الحاسبات'],
];

function useRoute(): string[] {
  const read = () => decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/').filter(Boolean);
  const [r, setR] = useState(read);
  useEffect(() => {
    const on = () => setR(read());
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  return r;
}

export default function App() {
  const [p, setP] = useState<Progress>(emptyProgress);
  const [loaded, setLoaded] = useState(false);
  const [q, setQ] = useState('');
  const route = useRoute();
  const saveTimer = useRef<number>();

  useEffect(() => {
    storage.load().then((saved) => {
      if (saved) setP(saved);
      setLoaded(true);
    });
  }, []);

  const update = useCallback((fn: (x: Progress) => Progress) => {
    setP((prev) => {
      const next = fn(prev);
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => storage.save(next), 300);
      return next;
    });
  }, []);

  const [view = 'plan', a, b] = route;
  const onSearch = (v: string) => {
    setQ(v);
    if (v.trim()) location.hash = '#/search';
  };
  const inLesson = view === 'lesson';

  return (
    <>
      <div className="strip" aria-hidden="true" />
      <header className="top">
        <div className="brand">
          <h1>مختبر الطيف</h1>
          <p className="sub" dir="ltr">Advanced Pharmaceutical Analysis · 5th stage</p>
        </div>
        <div className="tools">
          <input className="search" type="search" placeholder="ابحث: مصطلح أو رقم سلايد" value={q} onChange={(e) => onSearch(e.target.value)} aria-label="بحث" />
          <button className={`btn exam${p.examMode ? ' on' : ''}`} aria-pressed={p.examMode} onClick={() => update((x) => ({ ...x, examMode: !x.examMode }))} title="يخفي الترجمة والشرح ويبقي الإنكليزي">
            {p.examMode ? 'وضع الامتحان: شغّال' : 'وضع الامتحان'}
          </button>
        </div>
      </header>
      <nav className="rail" aria-label="الأقسام">
        {TABS.map(([id, label]) => (
          <a key={id} href={`#/${id}`} aria-current={view === id || (id === 'lessons' && inLesson) || (id === 'quiz' && view === 'quiz') ? 'page' : undefined}>
            {label}
          </a>
        ))}
        <span className="pct" dir="ltr">{planPct(p)}%</span>
      </nav>
      <main>
        {!loaded ? (
          <p className="muted">جاري التحميل…</p>
        ) : view === 'lessons' ? (
          <LessonList p={p} />
        ) : view === 'lesson' && a ? (
          <LessonView id={a} focus={b} p={p} update={update} />
        ) : view === 'quiz' && a ? (
          <QuizRun key={a} id={a} update={update} />
        ) : view === 'quiz' ? (
          <QuizList p={p} />
        ) : view === 'trainer' ? (
          <Trainer p={p} update={update} />
        ) : view === 'calc' ? (
          <CalcView />
        ) : view === 'search' ? (
          <SearchView q={q} />
        ) : (
          <PlanView p={p} update={update} />
        )}
      </main>
      <footer className="foot">
        <p>مبني على محاضرات Advanced Pharmaceutical Analysis، المرحلة الخامسة 2025–2026. التقدم محفوظ على هذا الجهاز.</p>
      </footer>
    </>
  );
}
