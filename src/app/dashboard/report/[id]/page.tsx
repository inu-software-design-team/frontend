import type { Metadata } from 'next';

import type { IdParams, SearchParams } from 'types';

import {
  checkStudentExistence,
  getStudent,
  StudentProfile,
} from 'features/students';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const { studentYear } = await searchParams;

  const { name, classInfo } = await getStudent({
    year: Number(studentYear),
    studentId: Number(id),
  });

  return {
    title: `${classInfo.grade}-${classInfo.class} ${name} | 성적`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 성적 페이지 입니다.`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const {
    studentYear,
  }: {
    studentYear?: string;
  } = await searchParams;
  const studentId = Number(id);

  await checkStudentExistence({
    studentId,
    studentYear: Number(studentYear),
    category: 'grade',
  });

  return (
    <>
      <div className="flex w-full justify-between">
        <StudentProfile
          student={getStudent({ year: Number(studentYear), studentId })}
        />
      </div>
    </>
  );
}
