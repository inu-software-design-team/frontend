'use client';

import { useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { GRADE_COLUMNS } from 'data';

import { SelectBox } from 'components/form';
import { IconButton } from 'components/ui';

import { getOptionsForGrade } from './actions';

interface TableControllerProps {
  options: Awaited<ReturnType<typeof getOptionsForGrade>>;
}

const TableController = ({ options }: TableControllerProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = {
    year: searchParams.get('year') ?? '',
    semester: searchParams.get('semester') ?? '',
    term: searchParams.get('term') ?? '',
    subject: searchParams.get('subject') ?? '',
  } satisfies {
    [key in keyof TableControllerProps['options']]: string;
  };

  const optionList = useMemo(
    () => options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function getChangeHandler({
    key,
    selectedValue,
  }: {
    key: keyof TableControllerProps['options'];
    selectedValue: string;
  }) {
    if (queryParams[key].length === 0 && selectedValue === '전체') return;
    if (selectedValue.length > 0 && queryParams[key] !== selectedValue) {
      replace(
        `${pathname}?${new URLSearchParams({
          ...Object.fromEntries(
            searchParams.entries().filter(param => param[0] !== key),
          ),
          ...(selectedValue === '전체' ? {} : { [key]: selectedValue }),
        })}`,
        { scroll: false },
      );
    }
  }

  return (
    <div className="flex w-full flex-wrap items-end justify-between gap-2">
      <div className="grid w-full flex-4 grid-cols-[repeat(auto-fit,_minmax(10rem,_auto))] gap-2">
        {Object.entries(optionList).map(([key, options]) => {
          const optionKey = key as keyof TableControllerProps['options'];
          const column = GRADE_COLUMNS.find(column => column.key === optionKey);

          return (
            column && (
              <SelectBox
                key={crypto.randomUUID()}
                label={column.label}
                options={options.map(option => ({
                  ...option,
                  default:
                    option.value ===
                    queryParams[key as keyof TableControllerProps['options']],
                }))}
                onChangeSelectedId={id =>
                  getChangeHandler({
                    key: optionKey,
                    selectedValue:
                      optionList[optionKey].find(item => item.id === id)
                        ?.value ?? '',
                  })
                }
              />
            )
          );
        })}
      </div>
      <div className="flex flex-1 items-center justify-end gap-x-2">
        <IconButton icon="filter" variant="outlined" color="primary" />
        <IconButton icon="sort" variant="outlined" color="primary" />
      </div>
    </div>
  );
};

export default TableController;
