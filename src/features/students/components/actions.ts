'use server';

import { cookies } from 'next/headers';

import { FETCH_PREFIX_TEACHER } from 'data';

import type { ClassInfo, StrictOmit, StudentInfo } from 'types';

export const getYearList = async (): Promise<
  { id: string; year: number }[]
> => {
  const response = await fetch(`${FETCH_PREFIX_TEACHER}/studentsList`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  if (!response.ok) throw new Error(response.statusText);

  const { yearSelection }: { yearSelection: number[] } = await response.json();

  return yearSelection
    .toSorted((a, b) => b - a)
    .map(year => ({
      id: crypto.randomUUID(),
      year,
    }));
};

export const getStudentList = async ({
  year,
}: {
  year: number;
}): Promise<StudentInfo[]> => {
  const response = await fetch(`${FETCH_PREFIX_TEACHER}/studentsList/${year}`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  if (!response.ok) throw new Error(response.statusText);

  const {
    data: { studentsList },
  }: {
    data: ClassInfo & {
      studentsList: (StrictOmit<StudentInfo, 'class_info'> & {
        class_id: StudentInfo['class_info'];
      })[];
    };
  } = await response.json();

  return studentsList.map(item => ({
    ...item,
    class_info: item.class_id,
  }));
};
