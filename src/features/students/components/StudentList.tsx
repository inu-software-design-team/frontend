'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

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
  const shouldShowStudentList = pathname !== '/dashboard';
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
      className={`bg-default shadow-drop border-tertiary flex size-full min-h-[calc(100vh-4rem-8rem)] max-w-[25rem] flex-col rounded-md border p-8 ${!shouldShowStudentList ? 'hidden' : ''}`}
    >
      <h2 className="text-title4 mb-12 font-semibold">
        학생 목록 <small>{`(${studentList.length})`}</small>
      </h2>
      <div className="flex w-full flex-col gap-y-2">
        <SearchBox pathname={pathname} />
        <div className="flex w-full justify-end gap-x-2">
          <IconButton
            icon="filter"
            variant="outlined"
            color="primary"
            spacing="compact"
          />
          <IconButton
            icon="sort"
            variant="outlined"
            color="primary"
            spacing="compact"
          />
        </div>
      </div>
      <div
        className={`mt-4 grid size-full min-h-[calc(100vh-(4rem+8rem)-(2rem*2)-(1.875rem+3rem)-(3rem+0.5rem+2.5rem)-1rem)] gap-y-2 ${
          studentList.length > 0
            ? 'auto-rows-max grid-cols-1'
            : 'place-items-center'
        }`}
      >
        {studentList.length === 0 ? (
          <p className="opacity-off text-center">
            해당 학생을 찾을 수 없습니다.
          </p>
        ) : (
          studentList.map(({ id, ...props }) => (
            <StudentCard key={id} pathname={pathname} id={id} {...props} />
          ))
        )}
      </div>
    </article>
  );
};

export default StudentList;
