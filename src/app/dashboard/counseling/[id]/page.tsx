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
  nextDate: string;
  nextPlan: string;
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
    title: `${classInfo.grade}-${classInfo.class} ${name} | 상담`,
    description: `${classInfo.grade}학년 ${classInfo.class}반 ${name} 학생의 상담 페이지 입니다.`,
  };
}

const dummyGradeData: RemarkData[] = Array.from({ length: 4 }, (_, i) => {
  const day = 6 + i;
  const reasons = ['학업', '개인', '행동'];
  const reason = reasons[i % reasons.length];

  return {
    id: crypto.randomUUID(),
    year: 2025,
    semester: 1,
    reason,
    title: `상담 제목`,
    content: `${reason} 에 관해 상담을 했습니다.`,
    author: `oo 선생님`,
    date: `2025-05-${String(day).padStart(2, '0')}`,
    nextDate: `2025-06-${String(day).padStart(2, '0')}`,
    nextPlan: `${reason} 관련 진척 상황 확인 예정`,
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

export default async function Counseling({
  params,
  searchParams,
}: {
  params: Promise<IdParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { studentYear } = await searchParams;
  const studentId = Number(id);

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <StudentProfile
          studentId={studentId}
          studentYear={Number(studentYear)}
        />
      </div>
      <div className="flex flex-col overflow-y-auto">
        <div className="flex w-full flex-row items-center">
          <div className="flex w-full">
            <div className="flex items-center gap-2">
              <SelectBox {...optionsFromGradeData.year} />
              <SelectBox {...optionsFromGradeData.semester} />
              <SelectBox {...optionsFromGradeData.subject} />
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
                <p className="mr-4 text-black/40">작성자</p>
                <p>{item.author}</p>
                <p className="ml-auto text-black/40">{item.date}</p>
              </div>
            </div>

            <div className="mt-2 border-[0.5px] border-[#E6F0FB]" />
            <div className="mt-2 ml-1 flex flex-row items-center text-center text-sm font-light">
              <p className="mr-4 text-[#4B89DC]">다음 상담 예정일</p>
              <p>{item.nextDate}</p>
            </div>
            <div className="mt-2 ml-1 flex flex-row items-center text-center text-sm font-light">
              <p className="mr-4 text-sm text-[#4B89DC]">다음 상담 계획</p>
              <p>{item.nextPlan}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
