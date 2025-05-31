import { redirect } from 'next/navigation';

import type { IdParams, SearchParams } from 'types';

import { getUserInfo } from 'features/auth';
import {
  DataController,
  EditableTable,
  getGradeList,
  getYearListForGrade,
  GradeItemManagerProvider,
  ManageCloseButton,
} from 'features/grades';
import { checkStudentExistence, StudentProfile } from 'features/students';

export default async function GradeManage({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { studentYear }: { studentYear?: string } = await searchParams;
  const studentId = Number(id);
  const { role } = await getUserInfo();

  await checkStudentExistence({
    role,
    studentId,
    year: Number(studentYear),
    category: 'grade/manage',
  });

  // 교사만 접근 가능
  if (role !== 'teacher')
    redirect(`/dashboard/grade/${studentId}?studentYear=${studentYear}`);

  const years = await getYearListForGrade({
    studentId,
  });
  const grades = await getGradeList({
    studentId,
    years,
  });

  return (
    <div className="flex w-full flex-col gap-y-12">
      <div className="flex w-full justify-between">
        <StudentProfile
          studentId={studentId}
          studentYear={Number(studentYear)}
        />
        <ManageCloseButton year={Number(studentYear)} studentId={studentId} />
      </div>
      <GradeItemManagerProvider>
        <div className="w-full space-y-4">
          <EditableTable studentId={studentId} grades={grades} />
          <DataController studentId={studentId} />
        </div>
      </GradeItemManagerProvider>
    </div>
  );
}
