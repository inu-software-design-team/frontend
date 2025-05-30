import type { Metadata } from 'next';

import type { IdParams, SearchParams } from 'types';

import {
  checkStudentExistence,
  getStudent,
  StudentProfile,
} from 'features/students';

import ReportView from '../components/ReportView';

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
    title: `${classInfo.grade}-${classInfo.class} ${name} | 보고서`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 보고서 페이지 입니다.`,
  };
}

export default async function Report({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { studentYear } = await searchParams;
  const studentId = Number(id);

  await checkStudentExistence({
    studentId,
    studentYear: Number(studentYear),
    category: 'report',
  });

  return (
    <div className="space-y-12">
      <StudentProfile studentId={studentId} studentYear={Number(studentYear)} />
      <ReportView id={id} />
    </div>
  );
}
