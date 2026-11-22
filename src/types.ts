export type FlagKind = 'hy' | 'trap' | 'fix' | 'extra';

export interface Flag {
  kind: FlagKind;
  /** Iraqi Arabic text; Latin terms are isolated automatically. */
  text: string;
}

export interface Worked {
  /** The question as written on the slide (English). */
  q: string;
  /** Solution steps; each line is an equation or a short Arabic note. */
  steps: string[];
  answer: string;
}

export interface Table {
  head: string[];
  rows: string[][];
}

/** One idea from the slides, shown in the bilingual format. */
export interface Block {
  id: string;
  /** Slide numbers this block covers (used by the coverage audit and search). */
  slides: number[];
  /** Short Arabic heading. */
  title: string;
  /** Academic English as it appears in the course and exam. */
  en: string;
  /** Accurate Arabic translation of `en` (hidden in exam mode). */
  ar: string;
  /** Deep explanation from zero, Iraqi Arabic (hidden in exam mode). */
  deep?: string[];
  /** "فكّر بيها جنّها..." analogy (hidden in exam mode). */
  analogy?: string;
  /** Equations, rendered LTR in monospace. */
  eq?: string[];
  /** Cause → effect chains, rendered LTR. */
  flow?: string[];
  table?: Table;
  flags?: Flag[];
  worked?: Worked[];
  /** Interactive widget rendered inside the block. */
  widget?: WidgetId;
}

export type WidgetId = 'shifts';

export type CalcId = 'tA' | 'beer' | 'emr' | 'ihd' | 'nrule' | 'nplus1' | 'iso';

export interface Lesson {
  id: string;
  unit: number;
  title: string;
  slides: [number, number];
  bigPicture: string;
  blocks: Block[];
  memoryMap: string[];
  calculators?: CalcId[];
  quizId?: string;
}

export interface QuizQ {
  q: string;
  o: string[];
  a: number;
  why: string;
  slides?: number[];
}

export interface Quiz {
  id: string;
  unit: number;
  title: string;
  qs: QuizQ[];
}

export interface UnitMeta {
  n: number;
  id: string;
  title: string;
  slides: [number, number];
}

/** [wavenumber cm-1, depth 0..1, width cm-1] */
export type IrPeak = [number, number, number];
/** [delta ppm, number of H, multiplicity (0 = multiplet, 1 = s, 2 = d, ...)] */
export type HPeak = [number, number, number];
/** [m/z, relative abundance %] */
export type MsPeak = [number, number];

export interface Step {
  q: string;
  o: string[];
  a: number;
  why: string;
}

export interface Problem {
  id: string;
  level: 1 | 2 | 3;
  formula: string;
  ir: IrPeak[];
  h1: HPeak[];
  c13: number[];
  ms: MsPeak[];
  steps: Step[];
  choices: string[];
  answer: number;
  final: string;
}

export interface PlanDay {
  title: string;
  slides: string;
  tasks: string[];
  /** Link target for the day's lesson, e.g. "lesson/uv1". */
  link?: string;
}

export interface Progress {
  v: 1;
  start: string;
  tasks: Record<string, true>;
  lessons: Record<string, true>;
  quiz: Record<string, number>;
  trainer: Record<string, true>;
  examMode: boolean;
}
