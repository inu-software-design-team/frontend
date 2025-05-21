'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { debounce } from 'es-toolkit';

import { Icon, IconButton } from 'components/ui';

interface SearchBoxProps {
  pathname: string;
}

const SearchBox = ({ pathname }: SearchBoxProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChangeInput = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      setSearchText(e.target.value);
    },
    [],
  );

  const updateSearchParams = useCallback(
    (param: string) => {
      const debouncedReplace = debounce((param: string) => {
        const queryParams = new URLSearchParams({
          ...Object.fromEntries(
            searchParams.entries().filter(([key]) => key !== 'studentName'),
          ),
          ...(param.length === 0 ? {} : { studentName: param }),
        });

        replace(
          queryParams.size === 0
            ? pathname
            : `${pathname}?${queryParams.toString()}`,
        );
      }, 300);
      debouncedReplace(param);
    },
    [searchParams, pathname, replace],
  );

  useEffect(() => {
    updateSearchParams(searchText);
  }, [updateSearchParams, searchText]);

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={`flex h-12 w-full items-center gap-2 border-b py-1 transition-colors ${
        isFocused ? 'border-black' : 'border-tertiary'
      }`}
    >
      <Icon
        src="search"
        size={24}
        className="opacity-off block stroke-current"
      />
      <input
        ref={useCallback<(node: HTMLInputElement | null) => void>(
          node => {
            inputRef.current = node;
            if (searchText.length === 0) inputRef.current?.focus();
          },
          [searchText],
        )}
        type="search"
        placeholder="검색어를 입력하세요."
        value={searchText}
        onChange={onChangeInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`placeholder:text-black-off size-full appearance-none outline-none placeholder:transition-opacity [&::-webkit-search-cancel-button]:appearance-none ${
          isFocused ? '' : 'placeholder:opacity-off'
        }`}
      />
      <IconButton
        icon="x"
        size="sm"
        spacing="compact"
        shape="circle"
        className={`transition-opacity ${searchText.length === 0 ? 'opacity-0' : ''}`}
        onClick={() => setSearchText('')}
      />
    </form>
  );
};

export default SearchBox;
