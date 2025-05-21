import Link from 'next/link';

import type { StrictOmit, StudentInfo } from 'types';

import { Icon } from 'components/ui';

interface StudentCardProps extends StrictOmit<StudentInfo, 'id'> {
  pathname: string;
  year: string;
}

const StudentCard = ({
  pathname,
  year,
  studentId,
  name,
  classInfo,
}: StudentCardProps) => {
  const basePathname = pathname.split('/').slice(0, 3).join('/');

  return (
    <Link
      scroll={false}
      href={`${basePathname}/${studentId}?studentYear=${year}`}
      className={`flex w-full items-center gap-x-4 gap-y-2 rounded-md px-4 py-3 transition-colors ${pathname.includes(studentId.toString()) ? 'bg-primary-light-hover text-primary-hover stroke-primary-hover' : 'hover:not-[data-status="disabled"]:bg-secondary stroke-current'}`}
    >
      <Icon
        src="circle_user"
        size={48}
        className={
          pathname.includes(studentId.toString())
            ? '*:first:fill-primary-hover'
            : ''
        }
      />
      <div className="flex w-full flex-col justify-center">
        <strong className="text-body1 font-semibold">{name}</strong>
        <div className="flex w-full flex-wrap items-center justify-between">
          <span className="text-body3">{`${classInfo.grade}학년 ${classInfo.class}반`}</span>
          <small className="opacity-off text-xs">{`ID : ${studentId}`}</small>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
