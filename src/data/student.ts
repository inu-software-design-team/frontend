import type { GradeItem, Semester, Subject, Term } from 'types';

import { Table } from 'components/ui';

export const SEMESTERS = {
  firstSemester: 1,
  lastSemester: 2,
} as const;
export const TERMS = {
  midterm: '중간고사',
  finalterm: '기말고사',
} as const;
export const SUBJECTS = {
  korean: '국어',
  math: '수학',
  english: '영어',
  society: '사회',
  science: '과학',
} as const;

export const GRADE_COLUMNS: NonNullable<
  React.ComponentPropsWithoutRef<typeof Table<GradeItem>>['columns']
> = [
  { key: 'year', label: '연도' },
  {
    key: 'semester',
    label: '학기',
    render: value => SEMESTERS[value as Semester],
  },
  {
    key: 'term',
    label: '유형',
    render: value => TERMS[value as Term],
  },
  {
    key: 'subject',
    label: '과목',
    render: value => SUBJECTS[value as Subject],
  },
  { key: 'score', label: '점수' },
  { key: 'level', label: '등급' },
] as const;
