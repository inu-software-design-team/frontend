import type { Metadata } from 'next';

import type { IdParams, SearchParams } from 'types';

import { getUserInfo } from 'features/auth';
import {
  checkStudentExistence,
  getStudent,
  StudentProfile,
} from 'features/students';

import FeedbackList from '../components/FeedbackList';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const { studentYear } = await searchParams;
  const { role } = await getUserInfo();

  const { name, classInfo } = await getStudent({
    role,
    year: Number(studentYear),
    studentId: Number(id),
  });

  return {
    title: `${classInfo.grade}-${classInfo.class} ${name} | 피드백`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 피드백 페이지 입니다.`,
  };
}

export default async function FeedBack({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { studentYear } = await searchParams;
  const studentId = Number(id);
  const { role } = await getUserInfo();

  await checkStudentExistence({
    role,
    studentId,
    year: Number(studentYear),
    category: 'feedback',
  });

  return (
    <div className="space-y-12">
      <StudentProfile studentId={studentId} studentYear={Number(studentYear)} />

      <div className="h-[calc(100vh-(4rem+8rem)-(2rem*2)-3.625rem-3rem)] overflow-y-auto">
        <FeedbackList id={id} role={role} />
      </div>
    </div>
  );
}
