import type { Metadata } from 'next';

import type { IdParams, SearchParams } from 'types';

import { getStudent, StudentProfile } from 'features/students';

import { SelectBox } from 'components/form';

type RemarkData = {
  id: string;
  year: number;
  semester: number;
  reason: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

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
    title: `${classInfo.grade}-${classInfo.class} ${name} | 피드백`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 피드백 페이지 입니다.`,
  };
}

const dummyGradeData: RemarkData[] = Array.from({ length: 4 }, (_, i) => {
  const day = 6 + i;
  const reasons = ['성적', '출결/태도'];
  const reason = reasons[i % reasons.length];

  return {
    id: crypto.randomUUID(),
    year: 2025,
    semester: 1,
    reason,
    title: `피드백 제목`,
    content: `${reason} 에 관해 피드백을 했습니다.`,
    author: `oo 선생님`,
    date: `2025-05-${String(day).padStart(2, '0')}`,
  };
});

const optionsFromGradeData = {
  year: {
    label: '연도',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(new Set(dummyGradeData.map(d => d.year.toString()))).map(
        value => ({ id: crypto.randomUUID(), value }),
      ),
    ],
  },
  semester: {
    label: '학기',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(
        new Set(dummyGradeData.map(d => d.semester.toString())),
      ).map(value => ({ id: crypto.randomUUID(), value })),
    ],
  },
  subject: {
    label: '사유',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(new Set(dummyGradeData.map(d => d.reason))).map(
        subject => ({
          id: crypto.randomUUID(),
          value: subject,
        }),
      ),
    ],
  },
};

export default async function FeedBack({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { studentYear } = await searchParams;

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <StudentProfile year={Number(studentYear)} studentId={Number(id)} />
      </div>
      <div className="flex flex-col overflow-y-auto">
        <div className="flex w-full flex-row items-center">
          <div className="flex w-full">
            <div className="flex items-center gap-2">
              <SelectBox size="sm" {...optionsFromGradeData.year} />
              <SelectBox size="sm" {...optionsFromGradeData.semester} />
              <SelectBox size="sm" {...optionsFromGradeData.subject} />
            </div>
          </div>
        </div>
        {dummyGradeData.map(item => (
          <div
            key={item.id}
            className="mt-4 flex w-full flex-col rounded-[6px] border border-[#E6F0FB] p-4"
          >
            <div className="mb-4">
              <div className="flex flex-row items-center text-center">
                <p className="mr-1.5 text-[#4B89DC]">{item.reason}</p>
                <p className="text-lg font-semibold">ㆍ {item.title}</p>
              </div>
              <p className="mt-6">{item.content}</p>
              <div className="mt-8 flex flex-row items-center text-center text-sm">
                <p className="mr-4 text-black/40">작성자 </p>
                <p> {item.author}</p>
                <p className="ml-auto text-black/40">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
