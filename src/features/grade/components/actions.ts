'use server';

import { cookies } from 'next/headers';

import { FETCH_PREFIX_TEACHER, GRADE_COLUMNS, SUBJECTS, TERMS } from 'data';

import type { GradeItem, StudentInfo, Subject } from 'types';

import { SelectBox } from 'components/form';

type Semester = 'firstSemester' | 'lastSemester';
type Term = 'midterm' | 'finalterm';

function getLevelFromScore(score: number): number {
  return score === 100 ? 1 : score < 10 ? 9 : Math.ceil((100 - score) / 10);
}

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

  return gradeList;
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
