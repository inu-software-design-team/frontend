import Link from 'next/link';

import { CircleUser } from 'assets/icons';

import { Icon } from 'components/ui';

interface StudentCardProps {
  pathname: string;
  id: string;
  grade: number;
  classNumber: number;
  number: number;
  name: string;
}

const StudentCard = ({
  pathname,
  id,
  grade,
  classNumber,
  number,
  name,
}: StudentCardProps) => {
  const basePathname = pathname.split('/').slice(0, 3).join('/');
  const studentInfo = `${grade}학년 ${classNumber}반 ${number}번`;

  return (
    <Link
      scroll={false}
      href={`${basePathname}/${id}`}
      className={`flex w-full items-center gap-4 gap-x-4 rounded-md px-4 py-3 transition-colors ${pathname.includes(id) ? 'bg-primary-light-hover text-primary-hover stroke-primary-hover' : 'hover:not-[data-status="disabled"]:bg-secondary stroke-current'}`}
    >
      <Icon
        src={CircleUser}
        size={48}
        className={pathname.includes(id) ? '*:first:fill-primary-hover' : ''}
      />
      <div className="flex flex-col justify-center">
        <strong className="text-body1 font-semibold">{name}</strong>
        <span className="text-body3">{studentInfo}</span>
      </div>
    </Link>
  );
};

export default StudentCard;
