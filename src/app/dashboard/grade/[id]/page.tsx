import type { Metadata } from 'next';

import { GRADE_COLUMNS, SEMESTERS, SUBJECTS, TERMS } from 'data';

import type { IdParams, SearchParams, Subject } from 'types';

import { getUserInfo } from 'features/auth';
import {
  getGradeList,
  getOptionsForGrade,
  getYearListForGrade,
  RadarChart,
  TableController,
} from 'features/grades';
import {
  checkStudentExistence,
  getStudent,
  StudentProfile,
} from 'features/students';

import { Empty } from 'components';
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
  const { role } = await getUserInfo();

  const { name, classInfo } = await getStudent({
    role,
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
    date,
  }: {
    studentYear?: string;
    year?: string;
    semester?: string;
    term?: string;
    subject?: string;
    date?: string;
  } = await searchParams;
  const studentId = Number(id);
  const { role } = await getUserInfo();

  await checkStudentExistence({
    role,
    studentId,
    year: Number(studentYear),
    category: 'grade',
  });

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
  const filteredGrades = grades
    .filter(
      grade =>
        (year ? grade.year === Number(year) : true) &&
        (semester ? SEMESTERS[grade.semester] === Number(semester) : true) &&
        (term ? TERMS[grade.term] === decodeURIComponent(term) : true) &&
        (subject
          ? SUBJECTS[grade.subject] === decodeURIComponent(subject)
          : true),
    )
    .sort((a, b) => {
      const isAscending = decodeURIComponent(date ?? '') === 'asc';

      if (a.year !== b.year)
        return isAscending ? a.year - b.year : b.year - a.year;
      if (a.semester !== b.semester)
        return isAscending
          ? a.semester < b.semester
            ? -1
            : 1
          : a.semester < b.semester
            ? 1
            : -1;
      if (a.term !== b.term)
        return isAscending
          ? a.term < b.term
            ? 1
            : -1
          : a.term < b.term
            ? -1
            : 1;

      return 0;
    });
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
        <StudentProfile
          studentId={studentId}
          studentYear={Number(studentYear)}
        />
        {role === 'teacher' && (
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
        )}
      </div>
      {grades.length === 0 ? (
        <Empty />
      ) : (
        <div className="h-[calc(100vh-(4rem+8rem)-(2rem*2)-3.625rem-3rem)] w-full space-y-8 overflow-y-auto">
          <div className="w-full space-y-8">
            <TableController options={options} />
            <div className="h-full w-full overflow-x-auto">
              <Table data={filteredGrades} columns={GRADE_COLUMNS} />
            </div>
          </div>
          {filteredGrades.length === 0 && (
            <Empty className="flex h-max flex-col" />
          )}
          <div className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
            <RadarChart
              className="mx-auto"
              labels={Object.values(SUBJECTS)}
              data={Object.values(
                grades.reduce(
                  (acc, grade) => {
                    if (grade.subject in acc) {
                      acc[grade.subject].score += grade.score;
                      acc[grade.subject].length += 1;
                    } else {
                      acc[grade.subject] = {
                        score: grade.score,
                        length: 1,
                      };
                    }

                    return acc;
                  },
                  {} as {
                    [subject in Subject]: { score: number; length: number };
                  },
                ),
              ).map(({ score, length }) => Number((score / length).toFixed(2)))}
            />
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
      )}
    </>
  );
}
