import type { IdParams, SearchParams } from 'types';

import {
  DataController,
  EditableTable,
  getGradeList,
  getYearListForGrade,
  GradeItemManagerProvider,
  ManageCloseButton,
} from 'features/grade';
import { StudentProfile } from 'features/students';

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
        <StudentProfile year={Number(studentYear)} studentId={studentId} />
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
