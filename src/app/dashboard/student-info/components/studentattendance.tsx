import { useState } from 'react';
import { SelectBox } from 'components/form';
import { IconButton, Table } from 'components/ui';

interface Props {
  id: string;
}

type AttendanceState = '출석' | '지각' | '조퇴' | '결석';

type AttendanceRecord = {
  id: string;
  year: number;
  semester: number;
  date: string;
  state: AttendanceState;
  reason: string;
  file: string;
};

type StateCount = Record<AttendanceState, number>;

const states: AttendanceState[] = ['출석', '지각', '조퇴', '결석'];

const pad = (n: number) => n.toString().padStart(2, '0');

const dummyGradeData: AttendanceRecord[] = Array.from({ length: 6 }, (_, i) => {
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

const countStates = (data: AttendanceRecord[]): StateCount => {
  const count: StateCount = { 출석: 0, 지각: 0, 조퇴: 0, 결석: 0 };
  data.forEach(({ state }) => {
    count[state]++;
  });
  return count;
};

const getStateClass = (state: AttendanceState) => {
  switch (state) {
    case '출석':
      return 'bg-[#F0FDF4] text-[#00A63E] rounded-[6px] text-sm';
    case '지각':
      return 'bg-[#FEFCE8] text-[#D08700] rounded-[6px] text-sm';
    case '조퇴':
      return 'bg-[#EFF6FF] text-[#155DFC] rounded-[6px] text-sm';
    case '결석':
      return 'bg-[#FEF2F2] text-[#E7000B] rounded-[6px] text-sm';
  }
};

const optionsFromGradeData = {
  year: {
    label: '연도',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(new Set(dummyGradeData.map(({ year }) => year.toString()))).map(value => ({
        id: crypto.randomUUID(),
        value,
      })),
    ],
  },
  semester: {
    label: '학기',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from(new Set(dummyGradeData.map(({ semester }) => semester.toString()))).map(value => ({
        id: crypto.randomUUID(),
        value,
      })),
    ],
  },
};

const createNewAttendance = (): AttendanceRecord => ({
  id: crypto.randomUUID(),
  year: 2025,
  semester: 1,
  date: '',
  state: '출석',
  reason: '',
  file: '',
});

const StudentAttendance = ({}: Props) => {
  const [data, setData] = useState<AttendanceRecord[]>(dummyGradeData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [editData, setEditData] = useState<AttendanceRecord[]>([]);

  const stateCount = countStates(data);

  const toggleEditMode = () => {
    if (!isEditMode) {
      setEditData(data.map(item => ({ ...item })));
    } else {
      setCheckedItems({});
    }
    setIsEditMode(prev => !prev);
  };

  const toggleChecked = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (id: string, field: keyof Omit<AttendanceRecord, 'id' | 'year' | 'semester' | 'file'>, value: string) => {
    setEditData(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    setData(prev =>
      prev.map(item =>
        checkedItems[item.id]
          ? editData.find(edited => edited.id === item.id) ?? item
          : item
      )
      .concat(editData.filter(edited => !prev.some(d => d.id === edited.id)))
    );
    setIsEditMode(false);
    setCheckedItems({});
    setEditData([]);
  };

  const handleCancel = () => {
    setEditData([]);
    setIsEditMode(false);
    setCheckedItems({});
  };

  const handleAdd = () => {
    const newAttendance = createNewAttendance();
    setEditData(prev => [...prev, newAttendance]);
    setCheckedItems(prev => ({ ...prev, [newAttendance.id]: true }));
  };

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
          variant={isEditMode ? 'contained' : 'outlined'}
          color="primary"
          spacing="compact"
          onClick={toggleEditMode}
        />
      </div>

      <div className="mt-4 mb-4 flex h-full w-full flex-row items-center gap-3">
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#F0FDF4]">
          <p className="text-xl font-bold text-[#00A63E]">{stateCount['출석']}</p>
          <p className="mt-1 text-xs text-black/48">출석일수</p>
        </div>
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#FEFCE8]">
          <p className="text-xl font-bold text-[#D08700]">{stateCount['지각']}</p>
          <p className="mt-1 text-xs text-black/48">지각</p>
        </div>
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#EFF6FF]">
          <p className="text-xl font-bold text-[#155DFC]">{stateCount['조퇴']}</p>
          <p className="mt-1 text-xs text-black/48">조퇴</p>
        </div>
        <div className="flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] bg-[#FEF2F2]">
          <p className="text-xl font-bold text-[#E7000B]">{stateCount['결석']}</p>
          <p className="mt-1 text-xs text-black/48">결석</p>
        </div>
      </div>

      <Table
        data={(isEditMode ? editData : data).map(item => ({
          ...item,
          checkbox: isEditMode ? (
            <input
              type="checkbox"
              checked={!!checkedItems[item.id]}
              onChange={() => toggleChecked(item.id)}
              aria-label={`출석 상태 ${item.date} 체크박스`}
            />
          ) : null,
          date:
            isEditMode && checkedItems[item.id] ? (
              <input
                type="date"
                value={item.date}
                onChange={e => handleChange(item.id, 'date', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            ) : (
              item.date
            ),
          state:
            isEditMode && checkedItems[item.id] ? (
              <select
                value={item.state}
                onChange={e => handleChange(item.id, 'state', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {states.map(stateOption => (
                  <option key={stateOption} value={stateOption}>
                    {stateOption}
                  </option>
                ))}
              </select>
            ) : (
              <span className={`px-3 py-2 text-center ${getStateClass(item.state)}`}>
                {item.state}
              </span>
            ),
          reason:
            isEditMode && checkedItems[item.id] ? (
              <input
                type="text"
                value={item.reason}
                onChange={e => handleChange(item.id, 'reason', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            ) : (
              item.reason
            ),
        }))}
        columns={[
          ...(isEditMode
            ? [
                {
                  key: 'checkbox' as const,
                  label: '',
                  width: 20,
                  render: (val: React.ReactNode) => (
                    <div className="flex justify-center">{val}</div>
                  ),
                },
              ]
            : []),
          { key: 'date' as const, label: '날짜' },
          { key: 'state' as const, label: '상태' },
          { key: 'reason' as const, label: '사유' },
          { key: 'file' as const, label: '첨부파일' },
        ]}
        className="mt-2"
      />

     {isEditMode && (
        <div className="flex flex-row mt-4 mb-2 gap-3">
          <div className="flex flex-1 justify-start">
            <button
              onClick={handleAdd}
              className="w-35 h-10 rounded-[6px] border bg-[#4B89DC] text-xs text-white"
            >
              + 새 출결 사항 추가
            </button>
          </div>

          <div className="flex flex-1 justify-center gap-3">
            <button
              onClick={handleSave}
              className="w-30 h-10 rounded-[6px] border border-black bg-white px-2 py-1 text-xs"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="w-30 h-10 rounded-[6px] bg-[#FB2C36] text-white px-2 py-1 text-xs"
            >
              취소
            </button>
          </div>

          <div className="flex flex-1" />
        </div>
      )}

    </div>
  );
};

export default StudentAttendance;
