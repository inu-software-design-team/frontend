'use server';

import { cookies } from 'next/headers';

import { FETCH_PREFIX_TEACHER } from 'data';

import type { ClassInfo, SnakeCaseKeys, StrictOmit, StudentInfo } from 'types';

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
    data: SnakeCaseKeys<ClassInfo> & {
      studentsList: (SnakeCaseKeys<StrictOmit<StudentInfo, 'classInfo'>> & {
        class_id: StudentInfo['classInfo'];
      })[];
    };
  } = await response.json();

  return studentsList.map(({ id, student_id, name, class_id }) => ({
    id,
    name,
    studentId: student_id,
    classInfo: {
      id: class_id.id,
      grade: class_id.grade,
      class: class_id.class,
    },
  }));
};

export const getStudent = async ({
  year,
  studentId,
}: {
  year: number;
  studentId: number;
}) => {
  const student = (await getStudentList({ year })).find(
    student => student.studentId === studentId,
  );
  if (!student)
    throw new Error(`학번이 ${studentId}인 학생을 찾을 수 없습니다.`);
  return student;
};
