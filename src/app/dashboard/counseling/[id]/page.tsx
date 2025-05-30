import type { Metadata } from 'next';

import { SEMESTERS } from 'data';

import type { IdParams, SearchParams } from 'types';

import { getUserInfo } from 'features/auth';
import {
  CounselingCard,
  getCounseling,
  getCounselingList,
  getOptionsForCounseling,
  ItemModal,
  ViewController,
} from 'features/counselings';
import {
  checkStudentExistence,
  getStudent,
  StudentProfile,
} from 'features/students';

import { Empty } from 'components';
import { TextButton } from 'components/ui';

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
    title: `${classInfo.grade}-${classInfo.class} ${name} | 상담`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 상담 페이지 입니다.`,
  };
}

export default async function Counseling({
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
    topic,
    status,
    id: counselingId,
  }: {
    studentYear?: string;
    year?: string;
    semester?: string;
    topic?: string;
    status?: string;
    id?: string;
  } = await searchParams;
  const studentId = Number(id);

  await checkStudentExistence({
    studentId,
    studentYear: Number(studentYear),
    category: 'counseling',
  });

  const counselings = await getCounselingList({
    studentId,
  });
  const options = await getOptionsForCounseling({
    counselings,
  });
  const filteredCounselings = counselings.filter(
    counseling =>
      (year ? counseling.year === Number(year) : true) &&
      (semester ? SEMESTERS[counseling.semester] === Number(semester) : true) &&
      (topic ? counseling.topic === topic : true),
  );

  return (
    <>
      <ItemModal
        isActive={status === 'create' || status === 'edit'}
        studentYear={Number(studentYear)}
        topics={options.topic.filter(({ value }) => value !== '전체')}
        counseling={getCounseling({ studentId, id: counselingId ?? '' })}
      />
      <div className="flex items-start justify-between">
        <StudentProfile
          student={getStudent({ year: Number(studentYear), studentId })}
        />
        <TextButton
          label="상담일지 추가"
          leftIcon="plus"
          color="primary"
          spacing="compact"
          className="whitespace-nowrap"
          href={{
            pathname: `/dashboard/counseling/${id}?studentYear=${Number(studentYear)}&status=create`,
          }}
        />
      </div>
      <div className="h-[calc(100vh-(4rem+8rem)-(2rem*2)-3.625rem-3rem)] space-y-4 overflow-y-auto">
        {filteredCounselings.length === 0 ? (
          <Empty />
        ) : (
          <>
            <ViewController options={options} />
            {filteredCounselings.map(item => (
              <CounselingCard
                key={item.id}
                userInfo={getUserInfo()}
                {...item}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
