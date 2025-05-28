'use client';

import { use } from 'react';

import { getStudent } from './actions';

interface StudentInfoProps {
  student: ReturnType<typeof getStudent>;
}

const StudentProfile = ({ student }: StudentInfoProps) => {
  const { name, classInfo, studentId } = use(student);

  return (
    <div className="flex w-full flex-col gap-y-2">
      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <strong className="text-title4">{name}</strong>
        <span>{`${classInfo.grade}학년 ${classInfo.class}반`}</span>
      </p>
      <small className="opacity-off text-body3">{`ID : ${studentId}`}</small>
    </div>
  );
};

export default StudentProfile;
