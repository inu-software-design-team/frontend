'use client';

import { SelectBox } from 'components/form';

interface Props {
  id: string;
}

type RemarkData = {
  id: string;
  year: number;
  semester: number;
  subject: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

const dummyGradeData: RemarkData[] = Array.from({ length: 6 }, (_, i) => {
  const day = 6 + i;
  const subjects = ['국어', '영어', '수학', '사회', '과학'];
  const subject = subjects[i % subjects.length];
  return {
    id: crypto.randomUUID(),
    year: 2025,
    semester: 1,
    subject,
    title: `${subject} 학습 내용`,
    content: `${subject} 수업에서 중요한 개념을 정리했습니다.`,
    author: `${subject} 선생님`,
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
    label: '과목',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(new Set(dummyGradeData.map(d => d.subject))).map(
        subject => ({
          id: crypto.randomUUID(),
          value: subject,
        }),
      ),
    ],
  },
};

const StudentRemarks = ({}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-full w-full flex-row items-center">
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
          key={item.id} // Apply key here to the outer div
          className="mt-4 flex w-full flex-col rounded-[6px] border border-[#E6F0FB] p-4"
        >
          <div className="mb-4">
            <div className="flex flex-row items-center text-center">
              <p className="mr-1.5 text-[#4B89DC]">{item.subject}</p>
              <p className="text-lg font-semibold">ㆍ {item.title}</p>
            </div>
            <p className="mt-6 text-sm">{item.content}</p>
            <div className="mt-8 flex flex-row items-center text-center">
              <p className="mr-4 text-xs text-black/40">작성자 </p>
              <p className="text-sm"> {item.author}</p>
              <p className="ml-auto text-sm text-black/40">{item.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRemarks;
