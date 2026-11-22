import type { Lesson, Quiz } from '../types';
import { uv1 } from './lessons/uv1';
import { quizUv1 } from './quizzes/uv1';
import { uv2 } from './lessons/uv2';
import { quizUv2 } from './quizzes/uv2';
import { ir1 } from './lessons/ir1';
import { quizIr1 } from './quizzes/ir1';

/** Published lessons, in unit order. Each new phase appends here. */
export const LESSONS: Lesson[] = [uv1, uv2, ir1];
export const QUIZZES: Quiz[] = [quizUv1, quizUv2, quizIr1];

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);
export const quizById = (id: string) => QUIZZES.find((q) => q.id === id);
