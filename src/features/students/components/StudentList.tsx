'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SORT_OPTIONS } from 'data';

import { StudentInfo } from 'types';
import type { UserRole } from 'types/auth';

import { DropdownMenu } from 'components';
import { SelectBox } from 'components/form';
import { IconButton } from 'components/ui';

import { getStudentList, getYearListForStudent } from './actions';
import SearchBox from './SearchBox';
import StudentCard from './StudentCard';

interface StudentListProps {
  role: UserRole;
  years: Awaited<ReturnType<typeof getYearListForStudent>>;
  students: Awaited<ReturnType<typeof getStudentList>>;
}

const STUDENTS_SORT_KEYS = {
  name: '이름',
  studentId: '학번',
} as const;

const StudentList = ({ role, years, students }: StudentListProps) => {
  const ref = useRef<HTMLElement>(null);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldShowStudentList = pathname !== '/dashboard';
  const queryParams = {
    studentYear: searchParams.get('studentYear') ?? '',
    studentName: searchParams.get('studentName') ?? '',
    sortKey: (searchParams.get('sortKey') ??
      'studentId') as keyof typeof STUDENTS_SORT_KEYS,
    sortValue: (searchParams.get('sortValue') ??
      'asc') as keyof typeof SORT_OPTIONS,
  };

  const [studentList, setStudentList] = useState<StudentInfo[]>(students);
  const filteredSortedStudentList = useMemo(
    () =>
      (queryParams.studentName.length === 0
        ? studentList
        : studentList.filter(({ name }) =>
            name.includes(queryParams.studentName),
          )
      ).sort((a, b) =>
        queryParams.sortKey === 'studentId'
          ? queryParams.sortValue === 'desc'
            ? b.studentId - a.studentId
            : a.studentId - b.studentId
          : queryParams.sortValue === 'desc'
            ? a.name < b.name
              ? 1
              : -1
            : a.name < b.name
              ? -1
              : 1,
      ),
    [
      queryParams.studentName,
      queryParams.sortKey,
      queryParams.sortValue,
      studentList,
    ],
  );

  useEffect(() => {
    if (!shouldShowStudentList) return;

    if (queryParams.studentYear.length === 0) setStudentList(students);
    else
      getStudentList({
        role,
        year: Number(queryParams.studentYear),
      }).then(res => setStudentList(res));
  }, [role, students, years, queryParams.studentYear, shouldShowStudentList]);

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
          학생 목록 <small>{`(${filteredSortedStudentList.length})`}</small>
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
      {role === 'teacher' && (
        <div className="w-full space-y-4">
          <div className="flex w-full flex-wrap items-end justify-between gap-x-2">
            <SelectBox
              label="연도"
              size="sm"
              options={years.map(({ id, year }) => ({
                id,
                value: year.toString(),
                default: year.toString() === queryParams.studentYear,
              }))}
              onChangeSelectedId={id => {
                const selectedYear = years
                  .find(year => year.id === id)
                  ?.year.toString();

                if (
                  shouldShowStudentList &&
                  selectedYear &&
                  selectedYear.length > 0 &&
                  queryParams.studentYear !== selectedYear
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
              <DropdownMenu
                options={Object.keys(STUDENTS_SORT_KEYS).flatMap(key1 =>
                  Object.keys(SORT_OPTIONS).map(key2 => {
                    const sortKey = key1 as keyof typeof STUDENTS_SORT_KEYS;
                    const sortValue = key2 as keyof typeof SORT_OPTIONS;
                    return {
                      id: `${sortKey}-${sortValue}`,
                      value: `${STUDENTS_SORT_KEYS[sortKey]} - ${SORT_OPTIONS[sortValue]}`,
                      default:
                        sortKey === queryParams.sortKey &&
                        sortValue === queryParams.sortValue,
                    };
                  }),
                )}
                onChangeSelectedId={id => {
                  const [sortKey, sortValue] = id
                    .split('-')
                    .map(value => value.trim());
                  const selectedSortKey =
                    sortKey as keyof typeof STUDENTS_SORT_KEYS;
                  const selectedSortValue =
                    sortValue as keyof typeof SORT_OPTIONS;

                  if (
                    shouldShowStudentList &&
                    (queryParams.sortKey !== selectedSortKey ||
                      queryParams.sortValue !== selectedSortValue)
                  )
                    replace(
                      `${pathname}?${new URLSearchParams({
                        ...Object.fromEntries(searchParams.entries()),
                        sortKey: selectedSortKey,
                        sortValue: selectedSortValue,
                      }).toString()}`,
                      {
                        scroll: false,
                      },
                    );
                }}
              >
                <IconButton
                  icon="sort"
                  variant="outlined"
                  color="primary"
                  spacing="compact"
                />
              </DropdownMenu>
            </div>
          </div>
          <SearchBox pathname={pathname} />
        </div>
      )}
      <div
        className={`mt-4 grid size-full min-h-[calc(100vh-(4rem+8rem)-(2rem*2)-(1.875rem+3rem)-(3rem+0.5rem+2.5rem)-1rem)] gap-y-2 overflow-y-auto ${
          filteredSortedStudentList.length > 0
            ? 'auto-rows-max grid-cols-1'
            : 'place-items-center'
        }`}
      >
        {filteredSortedStudentList.length === 0 ? (
          <p className="opacity-off text-center">
            해당 학생을 찾을 수 없습니다.
          </p>
        ) : (
          filteredSortedStudentList.map(({ id, ...props }) => (
            <StudentCard
              key={id}
              pathname={pathname}
              year={
                queryParams.studentYear.length === 0
                  ? years[0].year.toString()
                  : queryParams.studentYear
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
