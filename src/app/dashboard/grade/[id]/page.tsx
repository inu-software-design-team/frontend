import type { Metadata } from 'next';

import { GRADE_COLUMNS, SUBJECTS, TERMS } from 'data';

import type { IdParams, SearchParams } from 'types';

import {
  getGradeList,
  getOptionsForGrade,
  getYearListForGrade,
  TableController,
} from 'features/grade';
import { getStudent, StudentProfile } from 'features/students';

import { IconButton, Table } from 'components/ui';

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

export default async function Grade({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const {
    studentYear,
    year,
    semester,
    term,
    subject,
  }: {
    studentYear?: string;
    year?: string;
    semester?: string;
    term?: string;
    subject?: string;
  } = await searchParams;
  const studentId = Number(id);

  const years = await getYearListForGrade({
    studentId,
  });
  const grades = await getGradeList({
    studentId,
    years,
  });
  const options = await getOptionsForGrade({
    years,
    grades,
  });
  const filteredGrades = grades.filter(
    grade =>
      (year ? grade.year === Number(year) : true) &&
      (semester ? grade.semester === Number(semester) : true) &&
      (term ? TERMS[grade.term] === decodeURIComponent(term) : true) &&
      (subject
        ? SUBJECTS[grade.subject] === decodeURIComponent(subject)
        : true),
  );
  const statsFromGrades = {
    total_score: {
      label: '총점',
      value: grades.reduce((acc, { score }) => acc + score, 0),
    },
    average_score: {
      label: '평균 점수',
      value: Number(
        (
          grades.reduce((acc, { score }) => acc + score, 0) / grades.length
        ).toFixed(2),
      ),
    },
    average_level: {
      label: '평균 등급',
      value: Number(
        (
          grades.reduce((acc, { level }) => acc + level, 0) / grades.length
        ).toFixed(2),
      ),
    },
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <StudentProfile year={Number(studentYear)} studentId={studentId} />
        <IconButton
          icon="edit"
          size="sm"
          variant="outlined"
          color="primary"
          spacing="compact"
          href={{
            pathname: `/dashboard/grade/${id}/manage?studentYear=${studentYear}`,
          }}
        />
      </div>
      <div className="h-[calc(100vh-(4rem+8rem)-(2rem*2)-3.625rem-3rem)] w-full space-y-8 overflow-y-auto">
        <div className="w-full space-y-8">
          <TableController options={options} />
          <div className="w-full overflow-x-auto">
            <Table data={filteredGrades} columns={GRADE_COLUMNS} />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
          <div className="bg-primary-light-hover aspect-[10/9]">차트</div>
          <ul className="mx-auto w-full max-w-[25rem]">
            {Object.entries(statsFromGrades).map(
              ([key, { label, value }], index) => (
                <li key={key} className="w-full">
                  {index !== 0 && (
                    <hr className="border-primary-light-hover w-full" />
                  )}
                  <div className="flex w-full justify-between py-4">
                    <span className="text-body1 whitespace-nowrap">
                      {label}
                    </span>
                    <strong className="text-title4 text-primary">
                      {isNaN(value) ? 0 : value}
                    </strong>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
