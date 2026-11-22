import type { Lesson, Quiz } from '../types';
import { uv1 } from './lessons/uv1';
import { quizUv1 } from './quizzes/uv1';

/** Published lessons, in unit order. Each new phase appends here. */
export const LESSONS: Lesson[] = [uv1];
export const QUIZZES: Quiz[] = [quizUv1];

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);
export const quizById = (id: string) => QUIZZES.find((q) => q.id === id);
