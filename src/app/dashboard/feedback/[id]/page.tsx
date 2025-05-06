import { SelectBox } from 'components/form';
import { DashboardContentBox } from 'layouts';
import type { IdParams } from 'types';

interface Props {
  id: string;
}


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

export async function generateMetadata(props: { params: IdParams }) {
  const params = await props.params;
  const { id } = params;

  return {
    id,
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
      ...Array.from(new Set(dummyGradeData.map(d => d.semester.toString()))).map(
        value => ({ id: crypto.randomUUID(), value }),
      ),

    ],
  },
  subject: {
    label: '사유',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(new Set(dummyGradeData.map(d => d.reason))).map(subject => ({
        id: crypto.randomUUID(),
        value: subject,
      })),
    ],
  },
};

export default async function FeedBack(props: { params: IdParams }) {
  const params = await props.params;
  const { id } = params;
  
  return (
    <>
    <div className="flex w-full justify-between mb-4">
      <div className="flex w-full flex-col gap-y-1">
        <strong className="text-title4">이름</strong>
        <p>{`${id[0]}학년 ${parseInt(id.substring(1, 3))}반 ${parseInt(id.substring(3))}번`}</p>
      </div>
    </div>

    <div className="flex flex-col overflow-y-auto">
      <div className="flex flex-row w-full items-center">
        <div className="flex w-full">
          <div className="flex items-center gap-2">
            <SelectBox
              size="sm"
              {...optionsFromGradeData.year}
            />
            <SelectBox
              size="sm"
              {...optionsFromGradeData.semester}
            />
            <SelectBox
              size="sm"
              {...optionsFromGradeData.subject}
            />
          </div>
        </div>
      </div>
      {dummyGradeData.map(item => (
        <div 
          key={item.id} 
          className="flex flex-col w-full rounded-[6px] p-4 border border-[#E6F0FB] mt-4"
        >
          <div className="mb-4">
            <div className="flex flex-row text-center items-center">
              <p className="text-[#4B89DC] mr-1.5">{item.reason}</p>
              <p className="text-lg font-semibold">ㆍ  {item.title}</p>
            </div>    
            <p className=" mt-6">{item.content}</p>
            <div className="flex flex-row text-center items-center mt-8 text-sm">
              <p className="text-black/40 mr-4">작성자 </p>
              <p> {item.author}</p>
              <p className="text-black/40 ml-auto">{item.date}</p>
            </div>      
          </div>
        </div>
      ))}
    </div>
    </>
  );
};