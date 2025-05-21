'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { StudentInfo } from 'types';

import { SelectBox } from 'components/form';
import { IconButton } from 'components/ui';

import { getStudentList, getYearList } from './actions';
import SearchBox from './SearchBox';
import StudentCard from './StudentCard';

interface StudentListProps {
  years: Awaited<ReturnType<typeof getYearList>>;
  students: Awaited<ReturnType<typeof getStudentList>>;
}

const StudentList = ({ years, students }: StudentListProps) => {
  const ref = useRef<HTMLElement>(null);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldShowStudentList = pathname !== '/dashboard';
  const yearParam = searchParams.get('studentYear') ?? '';
  const nameParam = searchParams.get('studentName') ?? '';

  const [studentList, setStudentList] = useState<StudentInfo[]>(students);
  const yearList = useMemo(
    () => years,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const filteredStudentList = useMemo(
    () =>
      nameParam.length === 0
        ? studentList
        : studentList.filter(({ name }) => name.includes(nameParam)),
    [nameParam, studentList],
  );

  useEffect(() => {
    if (!shouldShowStudentList) return;

    if (yearParam.length === 0) setStudentList(students);
    else
      getStudentList({
        year: parseInt(yearParam),
      }).then(students => setStudentList(students));
  }, [yearParam, students, years, shouldShowStudentList]);

  useEffect(() => {
    if (shouldShowStudentList) ref.current?.classList.remove('show');
  }, [shouldShowStudentList, pathname]);

  return (
    <article
      ref={useCallback(
        (node: HTMLElement | null) => {
          ref.current = node;

          if (!shouldShowStudentList) return;

          function updateMinimized() {
            if (window.innerWidth < 1280) node?.classList.add('minimized');
            else node?.classList.remove('minimized');
          }

          window.addEventListener('resize', updateMinimized);

          return () => window.removeEventListener('resize', updateMinimized);
        },
        [shouldShowStudentList],
      )}
      id="student-list"
      className={`bg-default shadow-drop border-tertiary flex size-full min-h-[calc(100vh-4rem-8rem)] max-w-[25rem] flex-col rounded-md border p-8 ${
        !shouldShowStudentList
          ? 'hidden'
          : 'max-xl:fixed max-xl:top-16 max-xl:left-full max-xl:z-30 max-xl:h-[calc(100vh-4rem)] max-xl:translate-x-full max-xl:rounded-r-none max-xl:transition-transform max-[25rem]:rounded-none max-xl:[.show]:-translate-x-full'
      }`}
    >
      <div className="mb-12 flex w-full justify-between">
        <h2 className="text-title4 font-semibold">
          학생 목록 <small>{`(${filteredStudentList.length})`}</small>
        </h2>
        <IconButton
          icon="x"
          size="sm"
          spacing="compact"
          className="xl:hidden"
          onClick={e => {
            e.currentTarget.parentElement?.parentElement?.classList.remove(
              'show',
            );
          }}
        />
      </div>
      <div className="w-full space-y-4">
        <div className="flex w-full flex-wrap items-end justify-between gap-x-2">
          <SelectBox
            label="연도"
            size="sm"
            options={yearList.map(({ id, year }) => ({
              id,
              value: year.toString(),
              default: year.toString() === yearParam,
            }))}
            onChangeSelectedId={id => {
              const selectedYear = yearList
                .find(year => year.id === id)
                ?.year.toString();

              if (
                shouldShowStudentList &&
                selectedYear &&
                selectedYear?.length > 0 &&
                yearParam !== selectedYear
              )
                replace(
                  `${pathname}?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    studentYear: selectedYear,
                  }).toString()}`,
                  {
                    scroll: false,
                  },
                );
            }}
            className="w-40"
          />
          <div className="flex justify-end gap-x-2">
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
        <SearchBox pathname={pathname} />
      </div>
      <div
        className={`mt-4 grid size-full min-h-[calc(100vh-(4rem+8rem)-(2rem*2)-(1.875rem+3rem)-(3rem+0.5rem+2.5rem)-1rem)] gap-y-2 overflow-y-auto ${
          filteredStudentList.length > 0
            ? 'auto-rows-max grid-cols-1'
            : 'place-items-center'
        }`}
      >
        {filteredStudentList.length === 0 ? (
          <p className="opacity-off text-center">
            해당 학생을 찾을 수 없습니다.
          </p>
        ) : (
          filteredStudentList.map(({ id, ...props }) => (
            <StudentCard
              key={id}
              pathname={pathname}
              year={
                yearParam.length === 0 ? yearList[0].year.toString() : yearParam
              }
              {...props}
            />
          ))
        )}
      </div>
    </article>
  );
};

export default StudentList;
