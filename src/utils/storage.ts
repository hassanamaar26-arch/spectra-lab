import type { Progress } from '../types';

/**
 * Storage layer. The app only talks to `StorageAdapter`, so a Firebase
 * (or any other) backend can replace `LocalAdapter` later without touching
 * the UI. Today everything lives in this browser's localStorage.
 */
export interface StorageAdapter {
  load(): Promise<Progress | null>;
  save(p: Progress): Promise<void>;
  /** Optional shared leaderboard; undefined means "not available". */
  board?: () => Promise<{ name: string; pct: number; day: number }[]>;
}

const KEY = 'spectra-lab:v1';

export function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function emptyProgress(): Progress {
  return { v: 1, start: todayISO(), tasks: {}, lessons: {}, quiz: {}, trainer: {}, examMode: false };
}

/** Accept only well-formed data; anything else falls back to defaults. */
export function sanitize(raw: unknown): Progress {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<Progress>;
  const rec = <T,>(x: unknown, ok: (v: unknown) => v is T): Record<string, T> => {
    const out: Record<string, T> = {};
    if (x && typeof x === 'object') for (const [k, v] of Object.entries(x)) if (ok(v)) out[k] = v;
    return out;
  };
  const isTrue = (v: unknown): v is true => v === true;
  const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
  return {
    v: 1,
    start: typeof r.start === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.start) ? r.start : base.start,
    tasks: rec(r.tasks, isTrue),
    lessons: rec(r.lessons, isTrue),
    quiz: rec(r.quiz, isNum),
    trainer: rec(r.trainer, isTrue),
    examMode: r.examMode === true,
  };
}

export class LocalAdapter implements StorageAdapter {
  async load(): Promise<Progress | null> {
    try {
      const s = localStorage.getItem(KEY);
      return s ? sanitize(JSON.parse(s)) : null;
    } catch {
      return null;
    }
  }
  async save(p: Progress): Promise<void> {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      /* storage full or blocked: progress stays in memory for this visit */
    }
  }
}

/*
 * Firebase later (not active): implement StorageAdapter with Firestore,
 *   doc(`users/${uid}`) for progress and collection('board') for the
 *   leaderboard, then swap `new LocalAdapter()` in App.tsx.
 */
export const storage: StorageAdapter = new LocalAdapter();
