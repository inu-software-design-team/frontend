import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import type { IdParams, SearchParams } from 'types';

import { getStudent, StudentProfile } from 'features/students';

import StudentAttendance from '../components/studentattendance';
import StudentBasicInfo from '../components/studentbasicinfo';
import StudentRemarks from '../components/studentremarks';

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

  const { name, classInfo } = await getStudent({
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

  if (!tabName)
    redirect(
      `/dashboard/student-info/${id}?studentYear=${studentYear}&tabName=${encodeURIComponent(TABS[0].label)}`,
    );

  const activeTab =
    TABS.find(tab => tab.label === decodeURIComponent(tabName)) ?? TABS[0];

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <StudentProfile year={Number(studentYear)} studentId={Number(id)} />
      </div>
      <div className="flex h-11 w-full flex-row items-center justify-center rounded-[6px] bg-[#F1F5F9] p-1">
        {TABS.map(({ label }, index) => (
          <Link
            key={index}
            scroll={false}
            prefetch
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
      <div className="h-full w-full overflow-y-auto">
        <activeTab.item id={id} />
      </div>
    </>
  );
}