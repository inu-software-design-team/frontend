'use server';

import { revalidatePath } from 'next/cache';

import {
  API_PREFIX,
  GRADE_COLUMNS,
  SEMESTERS,
  SORT_OPTIONS,
  SUBJECTS,
  TERMS,
} from 'data';

import type { GradeItem, Semester, StudentInfo, Subject, Term } from 'types';

import {
  getCookieHeader,
  getCSRFTokenHeader,
  getUserInfo,
} from 'features/auth';

import { SelectBox } from 'components/form';

import { getLevelFromScore } from '../utils';

export const getYearListForGrade = async ({
  studentId,
}: Pick<StudentInfo, 'studentId'>): Promise<number[]> => {
  const { role } = await getUserInfo();

  const response = await fetch(
    role === 'teacher'
      ? `${API_PREFIX.teacher}/grades/${studentId}`
      : `${API_PREFIX[role]}/grades/yearList/${studentId}`,
    {
      headers: {
        ...(await getCookieHeader()),
      },
    },
  );

  if (!response.ok) throw new Error(response.statusText);
  const { yearSelection }: { yearSelection: number[] } = await response.json();

  return yearSelection.sort((a, b) => b - a);
};

export const getGradeList = async ({
  studentId,
  years,
}: Pick<StudentInfo, 'studentId'> & {
  years: number[];
}): Promise<GradeItem[]> => {
  if (years.length === 0) return [];

  const { role } = await getUserInfo();

  const gradeList: GradeItem[] = [];

  for (const year of years) {
    const response = await fetch(
      `${API_PREFIX[role]}/grades/${studentId}/${year}`,
      {
        headers: {
          ...(await getCookieHeader()),
        },
      },
    );

    if (!response.ok) throw new Error(response.statusText);
    const {
      data: { grade },
    }: {
      data: {
        grade: {
          id: string;
          year: number;
        } & {
          [key in Subject | 'total_score' | 'average']: {
            [semester in Semester]: {
              [term in Term]: number | null;
            };
          };
        };
      };
    } = await response.json();

    gradeList.push(
      ...Object.keys(SUBJECTS).reduce<GradeItem[]>((acc, cur) => {
        const subject = cur as Subject;

        for (const key2 of Object.keys(grade[subject])) {
          const semester = key2 as Semester;

          for (const key3 of Object.keys(grade[subject][semester])) {
            const term = key3 as Term;
            const score = grade[subject][semester][term];

            if (!score) continue;
            acc.push({
              id: crypto.randomUUID(),
              year: grade.year,
              semester,
              term,
              subject,
              score,
              level: getLevelFromScore(score),
            });
          }
        }

        return acc;
      }, []),
    );
  }

  return gradeList.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.semester !== b.semester) return a.semester < b.semester ? 1 : -1;
    if (a.term !== b.term) return a.term < b.term ? -1 : 1;
    if (a.subject !== b.subject) {
      const keys = Object.keys(SUBJECTS);
      return keys.indexOf(a.subject) - keys.indexOf(b.subject);
    }
    return 0;
  });
};

export const getOptionsForGrade = async ({
  years,
  grades,
}: {
  years: Awaited<ReturnType<typeof getYearListForGrade>>;
  grades: GradeItem[];
}): Promise<{
  [option in
    | Exclude<(typeof GRADE_COLUMNS)[number]['key'], 'score' | 'level'>
    | 'date']: Parameters<typeof SelectBox>[0]['options'];
}> => {
  return {
    year: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(years))
        .sort((a, b) => b - a)
        .map(year => ({
          id: crypto.randomUUID(),
          value: year.toString(),
        })),
    ],
    semester: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(
        new Set(grades.flatMap(({ semester }) => SEMESTERS[semester])),
      ).map(value => ({
        id: crypto.randomUUID(),
        value: value.toString(),
      })),
    ],
    term: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(grades.flatMap(({ term }) => TERMS[term])))
        .sort((a, b) => (a < b ? 1 : -1))
        .map(value => ({
          id: crypto.randomUUID(),
          value,
        })),
    ],
    subject: [
      { id: 'all', value: '전체', default: true },
      ...Array.from(
        new Set(grades.flatMap(({ subject }) => SUBJECTS[subject])),
      ).map(value => ({
        id: value,
        value: value,
      })),
    ],
    date: Object.keys(SORT_OPTIONS).map(key => {
      const sortOptionKey = key as keyof typeof SORT_OPTIONS;
      return {
        id: sortOptionKey,
        value: `날짜 - ${SORT_OPTIONS[sortOptionKey]}`,
        default: sortOptionKey === 'desc',
      };
    }),
  };
};

export const createGrade = async ({
  studentId,
  grade: { year, semester, term, subject, score },
}: Pick<StudentInfo, 'studentId'> & {
  grade: GradeItem;
}): Promise<void> => {
  const response = await fetch(`${API_PREFIX.teacher}/grades/${studentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getCookieHeader()),
      ...(await getCSRFTokenHeader()),
    },
    body: JSON.stringify({
      year,
      semester,
      term: term,
      subject,
      score,
    }),
  });

  if (!response.ok) throw new Error(response.statusText);
};

export const updateGrade = async ({
  studentId,
  grade: { year, semester, term, subject, score },
}: Pick<StudentInfo, 'studentId'> & {
  grade: GradeItem;
}): Promise<void> => {
  const response = await fetch(`${API_PREFIX.teacher}/grades/${studentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(await getCookieHeader()),
      ...(await getCSRFTokenHeader()),
    },
    body: JSON.stringify({
      year,
      semester,
      term,
      subject,
      score,
    }),
  });

  if (!response.ok) throw new Error(response.statusText);
};

export const deleteGrade = async ({
  studentId,
  grade: { year, semester, term, subject },
}: Pick<StudentInfo, 'studentId'> & {
  grade: GradeItem;
}): Promise<void> => {
  const response = await fetch(
    `${API_PREFIX.teacher}/grades/${studentId}/${year}/${subject}/${semester}/${term}`,
    {
      method: 'DELETE',
      headers: {
        ...(await getCookieHeader()),
        ...(await getCSRFTokenHeader()),
      },
    },
  );

  if (!response.ok) throw new Error(response.statusText);
};

export const revalidateGradePage = async (path: string): Promise<void> => {
  revalidatePath(path);
};
