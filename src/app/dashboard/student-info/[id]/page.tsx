import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import type { IdParams, SearchParams } from 'types';

import { getStudent } from 'features/students';

import StudentAttendance from '../components/studentattendance';
import StudentBasicInfo from '../components/studentbasicinfo';
import StudentRemarks from '../components/studentremarks';

const TABS = [
  { label: '기본 정보', item: StudentBasicInfo },
  { label: '출결 사항', item: StudentAttendance },
  { label: '특기 사항', item: StudentRemarks },
];

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

  // React.use to await params
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setStudentId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  if (!studentId) {
    return null;
  }

  return <StudentInfo id={studentId} />;
}
