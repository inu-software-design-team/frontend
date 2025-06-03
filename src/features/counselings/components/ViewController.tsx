'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { DropdownMenu } from 'components';
import { SelectBox } from 'components/form';
import { IconButton } from 'components/ui';

import { getOptionsForCounseling } from './action';

interface ViewControllerProps {
  options: Awaited<ReturnType<typeof getOptionsForCounseling>>;
}

const COUNSELING_COLUMNS = {
  year: '연도',
  semester: '학기',
  topic: '항목',
} as const;

const ViewController = ({ options }: ViewControllerProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = {
    year: searchParams.get('year') ?? '',
    semester: searchParams.get('semester') ?? '',
    topic: searchParams.get('topic') ?? '',
    date: searchParams.get('date') ?? '',
  } satisfies {
    [key in keyof ViewControllerProps['options']]: string;
  };

  function getChangeHandler({
    key,
    selectedValue,
  }: {
    key: keyof ViewControllerProps['options'];
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
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(10rem,_auto))] gap-2 md:flex-5">
        {Object.entries(options).map(([key, list]) => {
          const optionKey = key as keyof ViewControllerProps['options'];

          return (
            optionKey !== 'date' && (
              <SelectBox
                key={crypto.randomUUID()}
                label={
                  COUNSELING_COLUMNS[
                    optionKey as keyof typeof COUNSELING_COLUMNS
                  ]
                }
                options={list.map(option => ({
                  ...option,
                  default:
                    option.value ===
                    queryParams[key as keyof ViewControllerProps['options']],
                }))}
                onChangeSelectedId={id =>
                  getChangeHandler({
                    key: optionKey,
                    selectedValue:
                      options[optionKey].find(item => item.id === id)?.value ??
                      '',
                  })
                }
              />
            )
          );
        })}
      </div>
      <div className="flex w-max items-center justify-end gap-x-2 max-md:flex-1">
        <DropdownMenu
          options={options.date}
          onChangeSelectedId={id =>
            getChangeHandler({
              key: 'date',
              selectedValue:
                options.date.find(item => item.id === id)?.id ?? '',
            })
          }
        >
          <IconButton icon="sort" variant="outlined" color="primary" />
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ViewController;
