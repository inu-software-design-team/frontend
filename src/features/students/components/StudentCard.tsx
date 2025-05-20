import Link from 'next/link';

import type { StudentInfoWithoutId } from 'types';

import { Icon } from 'components/ui';

interface StudentCardProps extends StudentInfoWithoutId {
  pathname: string;
}

const StudentCard = ({
  pathname,
  student_id,
  name,
  class_info,
}: StudentCardProps) => {
  const basePathname = pathname.split('/').slice(0, 3).join('/');

  return (
    <Link
      scroll={false}
      href={`${basePathname}/${student_id}`}
      className={`flex w-full items-center gap-x-4 gap-y-2 rounded-md px-4 py-3 transition-colors ${pathname.includes(student_id) ? 'bg-primary-light-hover text-primary-hover stroke-primary-hover' : 'hover:not-[data-status="disabled"]:bg-secondary stroke-current'}`}
    >
      <Icon
        src="circle_user"
        size={48}
        className={
          pathname.includes(student_id) ? '*:first:fill-primary-hover' : ''
        }
      />
      <div className="flex w-full flex-col justify-center">
        <strong className="text-body1 font-semibold">{name}</strong>
        <div className="text-body3 flex w-full flex-wrap items-center justify-between">
          <span>{`${class_info.grade}학년 ${class_info.class}반`}</span>
          <span className="opacity-off">{`ID : ${student_id}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
