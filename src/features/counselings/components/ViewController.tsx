'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SelectBox } from 'components/form';

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
    <div className="grid w-full flex-3 grid-cols-[repeat(auto-fill,_minmax(10rem,_auto))] gap-2">
      {Object.entries(options).map(([key, list]) => {
        const optionKey = key as keyof ViewControllerProps['options'];

        return (
          <SelectBox
            key={crypto.randomUUID()}
            label={COUNSELING_COLUMNS[optionKey]}
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
                  options[optionKey].find(item => item.id === id)?.value ?? '',
              })
            }
          />
        );
      })}
    </div>
  );
};

export default ViewController;
