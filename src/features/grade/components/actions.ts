'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { FETCH_PREFIX_TEACHER, GRADE_COLUMNS, SUBJECTS, TERMS } from 'data';

import type { GradeItem, StudentInfo, Subject } from 'types';

import { SelectBox } from 'components/form';

import { getLevelFromScore } from '../utils';

type Semester = 'firstSemester' | 'lastSemester';
type Term = 'midterm' | 'finalterm';

export const getYearListForGrade = async ({
  studentId,
}: Pick<StudentInfo, 'studentId'>): Promise<number[]> => {
  const response = await fetch(`${FETCH_PREFIX_TEACHER}/grades/${studentId}`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  const { yearSelection }: { yearSelection: number[] } = await response.json();

  return yearSelection.toSorted((a, b) => b - a);
};

export const getGradeList = async ({
  studentId,
  years,
}: Pick<StudentInfo, 'studentId'> & {
  years: number[];
}): Promise<GradeItem[]> => {
  if (years.length === 0) return [];

  const gradeList: GradeItem[] = [];

  for (const year of years) {
    const response = await fetch(
      `${FETCH_PREFIX_TEACHER}/grades/${studentId}/${year}`,
      {
        headers: {
          Cookie: (await cookies()).toString(),
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
              semester: semester === 'firstSemester' ? 1 : 2,
              term: term === 'midterm' ? 'mid' : 'final',
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

  return gradeList.toSorted((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.semester !== b.semester) return b.semester - a.semester;
    if (a.term !== b.term) return a.term < b.term ? 1 : -1;
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
  [option in Exclude<
    (typeof GRADE_COLUMNS)[number]['key'],
    'score' | 'level'
  >]: Parameters<typeof SelectBox>[0]['options'];
}> => {
  return {
    year: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(years))
        .toSorted((a, b) => b - a)
        .map(year => ({
          id: crypto.randomUUID(),
          value: year.toString(),
        })),
    ],
    semester: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(grades.flatMap(({ semester }) => semester))).map(
        value => ({
          id: crypto.randomUUID(),
          value: value.toString(),
        }),
      ),
    ],
    term: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(grades.flatMap(({ term }) => TERMS[term])))
        .toSorted((a, b) => (b > a ? 1 : -1))
        .map(value => ({
          id: crypto.randomUUID(),
          value: value,
        })),
    ],
    subject: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(
        new Set(grades.flatMap(({ subject }) => SUBJECTS[subject])),
      ).map(value => ({
        id: crypto.randomUUID(),
        value: value,
      })),
    ],
  };
};

export const createGrade = async ({
  studentId,
  grade: { year, semester, term, subject, score },
}: Pick<StudentInfo, 'studentId'> & {
  grade: GradeItem;
}): Promise<void> => {
  const response = await fetch(`${FETCH_PREFIX_TEACHER}/grades/${studentId}`, {
    method: 'POST',
    headers: {
      Cookie: (await cookies()).toString(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      year,
      semester: (semester === 1
        ? 'firstSemester'
        : 'lastSemester') satisfies Semester,
      term: (term === 'mid' ? 'midterm' : 'finalterm') satisfies Term,
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
  const response = await fetch(`${FETCH_PREFIX_TEACHER}/grades/${studentId}`, {
    method: 'PUT',
    headers: {
      Cookie: (await cookies()).toString(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      year,
      semester: (semester === 1
        ? 'firstSemester'
        : 'lastSemester') satisfies Semester,
      term: (term === 'mid' ? 'midterm' : 'finalterm') satisfies Term,
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
    `${FETCH_PREFIX_TEACHER}/grades/${studentId}/${year}/${subject}/${
      (semester === 1 ? 'firstSemester' : 'lastSemester') satisfies Semester
    }/${(term === 'mid' ? 'midterm' : 'finalterm') satisfies Term}`,
    {
      method: 'DELETE',
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
  );

  if (!response.ok) throw new Error(response.statusText);
};

export const revalidateGradePage = async (path: string): Promise<void> => {
  revalidatePath(path);
};
