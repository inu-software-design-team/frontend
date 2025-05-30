'use server';

import { notFound, redirect, RedirectType } from 'next/navigation';

import { API_PREFIX } from 'data';

import type { ClassInfo, SnakeCaseKeys, StrictOmit, StudentInfo } from 'types';

import { getCookieHeader } from 'features/auth';

export const getYearListForStudent = async (): Promise<
  { id: string; year: number }[]
> => {
  const response = await fetch(`${API_PREFIX.teacher}/studentsList`, {
    headers: {
      ...(await getCookieHeader()),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  const { yearSelection }: { yearSelection: number[] } = await response.json();

  return yearSelection
    .sort((a, b) => b - a)
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
  const response = await fetch(`${API_PREFIX.teacher}/studentsList/${year}`, {
    headers: {
      ...(await getCookieHeader()),
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

export const checkStudentExistence = async ({
  studentId,
  studentYear,
  category,
}: Pick<StudentInfo, 'studentId'> & {
  studentYear: number;
  category:
    | 'grade'
    | 'grade/manage'
    | 'student-info'
    | 'feedback'
    | 'counseling'
    | 'report';
}) => {
  try {
    await getStudent({
      year: studentYear,
      studentId,
    });
  } catch {
    const years = await getYearListForStudent();

    if (years.length === 0) notFound();
    const updatedStudentYear = years.some(({ year }) => year === studentYear)
      ? studentYear
      : years[0].year;

    const students = await getStudentList({
      year: updatedStudentYear,
    });

    if (students.length === 0) notFound();
    redirect(
      `/dashboard/${
        category.endsWith('/manage')
          ? `${category.replace('/manage', '')}/${students[0].studentId}/manage`
          : `${category}/${students[0].studentId}`
      }?studentYear=${updatedStudentYear}`,
      RedirectType.replace,
    );
  }
};
