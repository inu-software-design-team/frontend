'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { Filter, Sort } from 'assets/icons';

import type { StudentInfo } from 'types';

import { IconButton } from 'components/ui';

import SearchBox from './SearchBox';
import StudentCard from './StudentCard';

interface StudentListProps {
  initialData?: StudentInfo[];
}

const StudentList = ({ initialData = [] }: StudentListProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nameParams = decodeURIComponent(searchParams.get('name') ?? '');
  const shouldShowStudentList =
    pathname.includes('dashboard') && !pathname.endsWith('dashboard');
  const [studentList, setStudentList] = useState<StudentInfo[]>([
    ...initialData,
  ]);

  const updateStudentList = useCallback(
    (nameParams: string) => {
      setStudentList(() =>
        nameParams.length === 0
          ? initialData
          : initialData.filter(({ name }) => name.includes(nameParams)),
      );
    },
    [initialData],
  );

  useEffect(() => {
    updateStudentList(nameParams);
  }, [updateStudentList, nameParams]);

  return (
    <article
      className={`bg-default shadow-drop border-tertiary flex size-full max-w-[25rem] flex-col rounded-md border p-8 ${!shouldShowStudentList ? 'hidden' : ''}`}
    >
      <h2 className="text-title4 mb-12 font-semibold">
        학생 목록 <small>{`(${studentList.length})`}</small>
      </h2>
      <div className="flex w-full flex-col gap-y-2">
        <SearchBox pathname={pathname} />
        <div className="flex w-full justify-end gap-x-2">
          <IconButton
            icon={Filter}
            variant="outlined"
            color="primary"
            spacing="compact"
          />
          <IconButton
            icon={Sort}
            variant="outlined"
            color="primary"
            spacing="compact"
          />
        </div>
      </div>
      <div className="mt-4 grid size-full auto-rows-max grid-cols-1 overflow-y-auto">
        {studentList.map(({ id, ...props }) => (
          <StudentCard key={id} pathname={pathname} id={id} {...props} />
        ))}
      </div>
    </article>
  );
};

export default StudentList;
