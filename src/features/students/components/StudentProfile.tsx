import { StudentInfo } from 'types';

import { getStudent } from './actions';

interface StudentInfoProps extends Pick<StudentInfo, 'studentId'> {
  studentYear: number;
}

const StudentProfile = async ({ studentId, studentYear }: StudentInfoProps) => {
  const { name, classInfo } = await getStudent({
    studentId,
    year: studentYear,
  });

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
