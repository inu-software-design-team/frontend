'use server';

import { notFound, redirect, RedirectType } from 'next/navigation';

import { API_PREFIX } from 'data';

import type { ClassInfo, SnakeCaseKeys, StrictOmit, StudentInfo } from 'types';
import type { UserRole } from 'types/auth';

import { getCookieHeader } from 'features/auth';

type RoleBasedParams =
  | { role: Exclude<UserRole, 'teacher'> }
  | {
      role: Extract<UserRole, 'teacher'>;
      year: number;
    };

export const getYearListForStudent = async (): Promise<
  { id: string; year: number }[]
> => {
  const response = await fetch(`${API_PREFIX.teacher}/studentslist`, {
    headers: {
      ...(await getCookieHeader()),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  const { yearSelection }: { yearSelection: number[] } = await response.json();

  return yearSelection
    .sort((a, b) => b - a)
    .map(year => ({
      id: year.toString(),
      year,
    }));
};

export const getStudentList = async (
  params: RoleBasedParams,
): Promise<StudentInfo[]> => {
  const yearParam = params.role === 'teacher' ? `/${params.year}` : '';

  const response = await fetch(
    `${API_PREFIX[params.role]}/studentslist${yearParam}`,
    {
      headers: {
        ...(await getCookieHeader()),
      },
    },
  );

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

export const getStudent = async (
  params: RoleBasedParams & { studentId: number },
) => {
  const student = (await getStudentList(params)).find(
    student => student.studentId === params.studentId,
  );
  if (!student)
    throw new Error(`학번이 ${params.studentId}인 학생을 찾을 수 없습니다.`);
  return student;
};

export const checkStudentExistence = async (
  params: RoleBasedParams &
    Pick<StudentInfo, 'studentId'> & {
      category:
        | 'grade'
        | 'grade/manage'
        | 'student-info'
        | 'feedback'
        | 'counseling'
        | 'report';
    },
) => {
  try {
    await getStudent(params);
  } catch {
    if (params.role !== 'teacher') notFound();

    const years = await getYearListForStudent();

    if (years.length === 0) notFound();
    const updatedStudentYear = years.some(({ year }) => year === params.year)
      ? params.year
      : years[0].year;

    const students = await getStudentList({
      role: params.role,
      year: updatedStudentYear,
    });

    if (students.length === 0) notFound();
    redirect(
      `/dashboard/${
        params.category.endsWith('/manage')
          ? `${params.category.replace('/manage', '')}/${students[0].studentId}/manage`
          : `${params.category}/${students[0].studentId}`
      }?studentYear=${updatedStudentYear}`,
      RedirectType.replace,
    );
  }
};
