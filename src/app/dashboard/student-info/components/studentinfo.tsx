'use client';

import { useState } from 'react';

import StudentAttendance from './studentattendance';
import StudentBasicInfo from './studentbasicinfo';
import StudentRemarks from './studentremarks';

export default function StudentInfo({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState(0);

  const grade = id?.[0] || '';
  const classNumber = parseInt(id?.substring(1, 3)) || 0;
  const number = parseInt(id?.substring(3)) || 0;

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <div className="flex w-full flex-col gap-y-1">
          <strong className="text-title4">이름</strong>
          <p>{`${grade}학년 ${classNumber}반 ${number}번`}</p>
        </div>
      </div>

      <div className="flex h-11 w-full flex-row items-center justify-center rounded-[6px] bg-[#F1F5F9] p-1">
        {['기본 정보', '출결 현황', '특기 사항'].map((label, index) => (
          <button
            key={index}
            className={`flex-1 px-2 py-1.5 ${
              activeTab === index
                ? 'rounded-[6px] bg-white text-black'
                : 'text-black/40'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="h-full w-full overflow-y-auto">
        {activeTab === 0 && <StudentBasicInfo id={id} />}
        {activeTab === 1 && <StudentAttendance id={id} />}
        {activeTab === 2 && <StudentRemarks id={id} />}
      </div>
    </>
  );
}
