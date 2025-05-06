'use client';

import { useCallback, useEffect, useState } from 'react';

import type { ElementStatus, WithElementSize } from 'types';

import { Icon } from 'components/ui';

interface SelectBoxProps
  extends WithElementSize,
    Omit<React.ComponentPropsWithoutRef<'form'>, 'children' | 'onChange'> {
  status?: Exclude<ElementStatus, 'active' | 'loading'>;
  label: string;
  options: { id: string; value: string; default?: boolean }[];
  onChange?: (id: string) => void; // id를 받도록 정의
}

const SelectBox = ({
  label,
  options,
  status = 'default',
  size = 'md',
  onChange,
  ...props
}: SelectBoxProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    options.find(option => option.default === true)?.id ??
      options[0]?.id ??
      null,
  );

  useEffect(() => {
    if (status !== 'disabled' && selectedId) {
      onChange?.(selectedId); // 선택된 id를 부모 컴포넌트로 전달
    }
  }, [status, selectedId, onChange]);

  return (
    <form
      {...props}
      data-status={status}
      ref={useCallback(
        (node: HTMLFormElement | null) => {
          if (status === 'disabled') return;

          function onClickOutside(event: MouseEvent) {
            if (
              node &&
              event.target instanceof Node &&
              !node.contains(event.target)
            )
              setIsDropdownOpen(false);
          }

          document.addEventListener('click', onClickOutside);
          return () => document.removeEventListener('click', onClickOutside);
        },
        [status],
      )}
      onClick={e => {
        if (status === 'disabled') {
          e.preventDefault();
          return;
        }
        setIsDropdownOpen(prev => !prev);
        props.onClick?.(e);
      }}
      className={`relative flex w-full flex-col gap-y-1 ${size === 'sm' ? '**:text-body3' : size === 'lg' ? '**:text-body1' : '**:text-body2'} ${props.className ?? ''}`}
    >
      <label htmlFor="select" className="block w-full">
        {label}
      </label>
      <div
        className={`shadow-border bg-default flex cursor-pointer items-center gap-x-4 rounded-md px-4 py-3 transition-shadow ${isDropdownOpen ? '' : 'shadow-tertiary'}`}
      >
        <input
          disabled={status === 'disabled'}
          readOnly
          id="select"
          value={options.find(({ id }) => id === selectedId)?.value ?? ''}
          className="pointer-events-none w-full outline-none"
        />
        <Icon
          src="chevron_down"
          size={16}
          className={`stroke-current transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {options.length > 0 && (
        <ul
          className={`shadow-drop bg-default absolute top-[calc(100%+0.5rem)] left-1/2 z-10 min-w-full -translate-x-1/2 space-y-1 rounded-md p-2 transition-[translate,_opacity] ${isDropdownOpen ? '' : 'pointer-events-none translate-y-1 opacity-0'}`}
        >
          {options.map(({ id, value }) => (
            <li
              key={id}
              id={id}
              onClick={() => setSelectedId(id)} // id를 setSelectedId로 설정
              className={`hover:bg-secondary flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-md px-4 py-3 transition-colors ${id === selectedId ? 'bg-secondary font-semibold' : 'hover:bg-secondary'}`}
            >
              {value}
              <Icon
                src="check"
                size={16}
                className={`stroke-current ${id === selectedId ? '' : 'invisible'}`}
              />
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SelectBox;
