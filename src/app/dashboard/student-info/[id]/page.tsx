import { lazy, Suspense } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import type { IdParams, SearchParams } from 'types';

import { getUserInfo } from 'features/auth';
import {
  checkStudentExistence,
  getStudent,
  StudentProfile,
} from 'features/students';

import { Loader } from 'components';

const StudentBasicInfo = lazy(() => import('../components/studentbasicinfo'));
const StudentAttendance = lazy(() => import('../components/studentattendance'));
const StudentRemarks = lazy(() => import('../components/studentremarks'));

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const { studentYear, tabName }: { studentYear?: string; tabName?: string } =
    await searchParams;
  const { role } = await getUserInfo();

  const { name, classInfo } = await getStudent({
    role,
    year: Number(studentYear),
    studentId: Number(id),
  });

  return {
    title: `${classInfo.grade}-${classInfo.class} ${name} | 학생부 - ${tabName}`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 학생부 - ${tabName} 페이지 입니다.`,
  };
}

const TABS = [
  { label: '기본 정보', item: StudentBasicInfo },
  { label: '출결 사항', item: StudentAttendance },
  { label: '특기 사항', item: StudentRemarks },
];

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { studentYear, tabName }: { studentYear?: string; tabName?: string } =
    await searchParams;
  const studentId = Number(id);
  const { role } = await getUserInfo();

  await checkStudentExistence({
    role,
    studentId,
    year: Number(studentYear),
    category: 'student-info',
  });

  // 교사만 접근 가능
  if (role !== 'teacher') redirect('/dashboard');

  if (!tabName)
    redirect(
      `/dashboard/student-info/${id}?studentYear=${studentYear}&tabName=${encodeURIComponent(TABS[0].label)}`,
    );

  const activeTab =
    TABS.find(tab => tab.label === decodeURIComponent(tabName)) ?? TABS[0];

  return (
    <>
      <div className="flex w-full justify-between">
        <StudentProfile
          studentId={studentId}
          studentYear={Number(studentYear)}
        />
      </div>
      <div className="flex h-11 w-full flex-row items-center justify-center rounded-[6px] bg-[#F1F5F9] p-1">
        {TABS.map(({ label }, index) => (
          <Link
            key={index}
            scroll={false}
            href={`/dashboard/student-info/${id}?studentYear=${studentYear}&tabName=${encodeURIComponent(label)}`}
            className={`flex-1 px-2 py-1.5 text-center ${
              label === activeTab.label
                ? 'rounded-[6px] bg-white text-black'
                : 'text-black/40'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="relative h-full w-full overflow-y-auto">
        <Suspense fallback={<Loader isLoading />}>
          <activeTab.item id={id} />
        </Suspense>
      </div>
    </>
  );
}
