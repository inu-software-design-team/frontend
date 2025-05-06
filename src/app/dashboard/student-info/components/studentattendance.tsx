import { SelectBox } from 'components/form';
import { IconButton, Table } from 'components/ui';

interface Props {
  id: string;
}

type StateCount = {
  출석: number;
  지각: number;
  조퇴: number;
  결석: number;
};

const countStates = (data: typeof dummyGradeData) => {
  const count: StateCount = { 출석: 0, 지각: 0, 조퇴: 0, 결석: 0 };
  data.forEach(item => {
    count[item.state as keyof StateCount]++;
  });
  return count;
};

const pad = (n: number) => n.toString().padStart(2, '0');

const states = ['출석', '지각', '조퇴', '결석'];

const dummyGradeData = Array.from({ length: 6 }, (_, i) => {
  const day = 6 + i;
  return {
    id: crypto.randomUUID(),
    year: 2025,
    semester: 1,
    date: `2025-05-${pad(day)}`,
    state: states[i % states.length],
    reason: '',
    file: '',
  };
});

const getStateClass = (state: string) => {
  switch (state) {
    case '출석':
      return 'bg-[#F0FDF4] text-[#00A63E] rounded-[6px] text-sm';
    case '지각':
      return 'bg-[#FEFCE8] text-[#D08700] rounded-[6px] text-sm';
    case '조퇴':
      return 'bg-[#EFF6FF] text-[#155DFC] rounded-[6px] text-sm';
    case '결석':
      return 'bg-[#FEF2F2] text-[#E7000B] rounded-[6px] text-sm';
    default:
      return '';
  }
};

const optionsFromGradeData = {
  year: {
    label: '연도',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(
        new Set(dummyGradeData.map(({ year }) => year.toString())),
      ).map(value => ({ id: crypto.randomUUID(), value })),
    ],
  },
  semester: {
    label: '학기',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(
        new Set(dummyGradeData.map(({ semester }) => semester.toString())),
      ).map(value => ({ id: crypto.randomUUID(), value })),
    ],
  },
};

const StudentAttendance = ({}: Props) => {
  const stateCount = countStates(dummyGradeData);

  return (
    <div className="flex flex-col">
      <div className="flex h-full w-full flex-row items-center">
        <div className="flex w-full">
          <div className="flex items-center gap-2">
            <SelectBox size="sm" {...optionsFromGradeData.year} />
            <SelectBox size="sm" {...optionsFromGradeData.semester} />
          </div>
        </div>
        <IconButton
          icon="edit"
          size="sm"
          variant="outlined"
          color="primary"
          spacing="compact"
        />
      </div>

      <div className="mt-4 mb-4 flex h-full w-full flex-row items-center gap-3">
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#F0FDF4]">
          <p className="text-xl font-bold text-[#00A63E]">
            {stateCount['출석']}
          </p>
          <p className="mt-1 text-xs text-black/48">출석일수</p>
        </div>
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#FEFCE8]">
          <p className="text-xl font-bold text-[#D08700]">
            {stateCount['지각']}
          </p>
          <p className="mt-1 text-xs text-black/48">지각</p>
        </div>
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#EFF6FF]">
          <p className="text-xl font-bold text-[#155DFC]">
            {stateCount['조퇴']}
          </p>
          <p className="mt-1 text-xs text-black/48">조퇴</p>
        </div>
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#FEF2F2]">
          <p className="text-xl font-bold text-[#E7000B]">
            {stateCount['결석']}
          </p>
          <p className="mt-1 text-xs text-black/48">결석</p>
        </div>
      </div>

      {/* 테이블 */}
      <Table
        data={dummyGradeData}
        columns={[
          { key: 'date', label: '날짜' },
          {
            key: 'state',
            label: '상태',
            render: (value: string | number) => (
              <span
                className={`px-3 py-2 text-center ${getStateClass(String(value))}`}
              >
                {String(value)}
              </span>
            ),
          },
          { key: 'reason', label: '사유' },
          { key: 'file', label: '첨부 파일' },
        ]}
      />
    </div>
  );
};

export default StudentAttendance;
