import type { Progress } from '../types';
import { PLAN } from '../data/plan';
import { todayISO } from './storage';

const TOTAL_TASKS = PLAN.reduce((s, d) => s + d.tasks.length, 0);

export function currentDay(start: string): number {
  const a = new Date(start + 'T00:00:00').getTime();
  const b = new Date(todayISO() + 'T00:00:00').getTime();
  return Math.min(PLAN.length, Math.max(1, Math.round((b - a) / 864e5) + 1));
}

export const planPct = (p: Progress) => Math.round((Object.keys(p.tasks).length / TOTAL_TASKS) * 100);
