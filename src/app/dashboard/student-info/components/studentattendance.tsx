'use client';

import { useEffect, useState } from 'react';

import { DeleteStudentAttendance } from 'api/teacher/student-attendance/deleteStudentAttendance';
import { GetStudentAttendance } from 'api/teacher/student-attendance/getStudentAttendance';
import { PatchStudentAttendance } from 'api/teacher/student-attendance/patchStudentAttendance';
import { PostStudentAttendance } from 'api/teacher/student-attendance/postStudentAttendance';

import { X } from 'assets/icons';

import { SelectBox } from 'components/form';
import { IconButton, Table } from 'components/ui';

interface Props {
  id: string;
}

type AttendanceState = '출석' | '지각' | '조퇴' | '결석';

interface AttendanceRecord {
  _id: string;
  date: string;
  state: AttendanceState;
  reason: string;
  file: string | null;
}

type StateCount = Record<AttendanceState, number>;

interface ApiAttendanceRecord {
  _id: string;
  date: string;
  state: AttendanceState;
  reason: string;
  file: string | null;
  __v?: number;
}

interface GetStudentAttendanceResponse {
  attendance: ApiAttendanceRecord[];
}

const states: AttendanceState[] = ['출석', '지각', '조퇴', '결석'];

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

const countStates = (records: AttendanceRecord[]): StateCount => {
  return records.reduce(
    (acc, cur) => {
      acc[cur.state] = (acc[cur.state] || 0) + 1;
      return acc;
    },
    { 출석: 0, 지각: 0, 조퇴: 0, 결석: 0 },
  );
};

const createNewAttendance = (): AttendanceRecord => ({
  _id: crypto.randomUUID(),
  date: '',
  state: '출석',
  reason: '',
  file: null,
});

const transformApiData = (
  attendance: ApiAttendanceRecord[],
): AttendanceRecord[] =>
  attendance
    .map(item => ({
      _id: item._id,
      date: item.date.slice(0, 10),
      state: item.state,
      reason: item.reason,
      file: item.file ?? null,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const calculateAttendanceDays = (records: AttendanceRecord[]): number => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 2, 1);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let totalDays = 0;
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    totalDays++;
  }

  const absenceCount = records.filter(r => r.state === '결석').length;

  return totalDays - absenceCount;
};

const extractYearsFromData = (records: AttendanceRecord[]): string[] => {
  const years = new Set<string>();
  records.forEach(record => {
    const year = record.date.slice(0, 4);
    years.add(year);
  });
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
};

const StudentAttendance = ({ id: studentId }: Props) => {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [editData, setEditData] = useState<AttendanceRecord[]>([]);
  const [selectedYearId, setSelectedYearId] = useState('');
  const [yearOptions, setYearOptions] = useState<{ id: string; value: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response: GetStudentAttendanceResponse =
          await GetStudentAttendance(studentId);
        if (response?.attendance) {
          const transformed = transformApiData(response.attendance);
          setData(transformed);

          const years = extractYearsFromData(transformed);
          setYearOptions(years.map(y => ({ id: y, value: y })));

          setSelectedYearId(years.includes('2025') ? '2025' : years[0] || '');
        } else {
          setData([]);
          setYearOptions([]);
          setSelectedYearId('');
        }
      } catch (error) {
        console.error('출결 데이터를 불러오는 중 오류 발생:', error);
      }
    })();
  }, [studentId]);

  const filteredData = data.filter(item => item.date.startsWith(selectedYearId));

  const stateCount = countStates(filteredData);
  const attendanceDays = calculateAttendanceDays(filteredData);

  const toggleEditMode = () => {
    if (!isEditMode) {
      setEditData(data.map(item => ({ ...item })));
    } else {
      setCheckedItems({});
    }
    setIsEditMode(prev => !prev);
  };

  const toggleChecked = (_id: string) => {
    setCheckedItems(prev => ({ ...prev, [_id]: !prev[_id] }));
  };

  const handleChange = (
    _id: string,
    field: keyof Omit<AttendanceRecord, '_id' | 'file'>,
    value: string,
  ) => {
    setEditData(prev =>
      prev.map(item => (item._id === _id ? { ...item, [field]: value } : item)),
    );
  };

  const handleAdd = () => {
    const newAttendance = createNewAttendance();
    setEditData(prev => [newAttendance, ...prev]);
    setCheckedItems(prev => ({ ...prev, [newAttendance._id]: true }));
  };

  const handleDelete = async () => {
    const toDelete = editData.filter(
      item => checkedItems[item._id] && data.some(d => d._id === item._id),
    );

    try {
      await Promise.all(toDelete.map(item => DeleteStudentAttendance(item._id)));
      const remainingData = data.filter(
        item => !toDelete.some(d => d._id === item._id),
      );
      setData(remainingData);
      setEditData(remainingData.map(item => ({ ...item })));
      setCheckedItems({});
    } catch (error) {
      console.error('출결 정보 삭제 중 오류 발생:', error);
      alert('출결 정보 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    const newEntries = editData.filter(
      item => !data.some(d => d._id === item._id),
    );
    const updates = editData.filter(
      item => checkedItems[item._id] && data.some(d => d._id === item._id),
    );

    try {
      await Promise.all(
        newEntries.map(item =>
          PostStudentAttendance(
            studentId,
            item.date,
            item.state,
            item.reason,
            item.file ?? '',
          ),
        ),
      );

      await Promise.all(
        updates.map(item =>
          PatchStudentAttendance(
            item._id,
            item.date,
            item.state,
            item.reason,
            item.file ?? '',
          ),
        ),
      );

      const response: GetStudentAttendanceResponse =
        await GetStudentAttendance(studentId);
      if (response?.attendance) {
        const refreshed = transformApiData(response.attendance);
        setData(refreshed);
      }

      setIsEditMode(false);
      setCheckedItems({});
      setEditData([]);
    } catch (error) {
      console.error('출결 정보 저장 중 오류 발생:', error);
      alert('출결 정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    setEditData([]);
    setIsEditMode(false);
    setCheckedItems({});
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-full w-full flex-row items-center justify-between">
        {isEditMode ? (
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex h-10 w-36 items-center justify-center gap-3 rounded-[6px] border bg-[#4B89DC] px-3 text-white"
            >
              <span className="mb-0.5 text-xl font-extralight"> + </span>
              <span className="text-sm"> 새 출결사항 추가 </span>
            </button>
            <button
              onClick={handleDelete}
              className="flex h-[39px] w-20 items-center justify-center gap-1.5 rounded-[6px] border border-[#FB2C36] bg-white px-3 text-sm text-[#FB2C36]"
            >
              <X className="h-4 w-4 text-[#FB2C36]" />
              삭제
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <SelectBox
              key={selectedYearId}
              label="연도"
              options={yearOptions.map(opt => ({
                ...opt,
                default: opt.id === selectedYearId,
              }))}
              onChangeSelectedId={id => setSelectedYearId(id)}
              size="sm"
            />
          </div>
        )}
        <IconButton
          icon={isEditMode ? 'x' : 'edit'}
          size="sm"
          variant="outlined"
          color="primary"
          spacing="compact"
          onClick={toggleEditMode}
        />
      </div>

      {!isEditMode && (
        <div className="mt-4 mb-4 flex h-full w-full flex-row items-center gap-3">
          {states.map(state => (
            <div
              key={state}
              className={`flex h-20 w-1/4 flex-col items-center justify-center rounded-[6px] ${
                getStateClass(state).split(' ')[0]
              }`}
            >
              <p
                className={`text-xl font-bold ${getStateClass(state).split(' ')[1]}`}
              >
                {state === '출석' ? attendanceDays : stateCount[state]}
              </p>
              <p className="mt-1 text-xs text-black/48">
                {state === '출석' ? '출석일수' : state}
              </p>
            </div>
          ))}
        </div>
      )}

      <div
        className={`mt-2 ${isEditMode ? 'max-h-[180px] overflow-y-auto' : ''}`}
      >
        <Table
          data={(isEditMode ? editData : filteredData).map(item => ({
            id: item._id,
            ...item,
            checkbox: isEditMode ? (
              <input
                type="checkbox"
                checked={!!checkedItems[item._id]}
                onChange={() => toggleChecked(item._id)}
                aria-label={`출석 상태 ${item.date} 체크박스`}
              />
            ) : null,
            date:
              isEditMode && checkedItems[item._id] ? (
                <input
                  type="date"
                  value={item.date}
                  onChange={e => handleChange(item._id, 'date', e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                />
              ) : (
                <p className="text-base font-normal"> {item.date} </p>
              ),
            state:
              isEditMode && checkedItems[item._id] ? (
                <select
                  value={item.state}
                  onChange={e =>
                    handleChange(
                      item._id,
                      'state',
                      e.target.value as AttendanceState,
                    )
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                >
                  {states.map(stateOption => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  className={`px-3 py-2 text-center text-sm ${getStateClass(item.state)}`}
                >
                  {item.state}
                </span>
              ),
            reason:
              isEditMode && checkedItems[item._id] ? (
                <input
                  type="text"
                  value={item.reason}
                  onChange={e =>
                    handleChange(item._id, 'reason', e.target.value)
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                />
              ) : (
                <p className="text-[15px] font-normal"> {item.reason} </p>
              ),
            file: item.file ? (
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                첨부파일
              </a>
            ) : (
              '-'
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
            { key: 'date', label: '날짜' },
            { key: 'state', label: '상태' },
            { key: 'reason', label: '사유' },
            { key: 'file', label: '첨부파일' },
          ]}
          className="mt-2"
        />
      </div>

      {isEditMode && (
        <div className="mt-4 mb-2 flex flex-row gap-2">
          <div className="flex flex-grow gap-3 items-center justify-center">
            <button
              className="h-10 w-32 rounded-[6px] border border-black bg-white px-2 py-1 text-sm"
              onClick={handleSave}
            >
              저장
            </button>

            <button
              className="h-10 w-32 rounded-[6px] bg-[#FB2C36] px-2 py-1 text-sm text-white"
              onClick={handleCancel}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
