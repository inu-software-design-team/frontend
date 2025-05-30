'use client';

import { useEffect, useState } from 'react';

import type { ElementStatus, WithElementSize } from 'types';

import { Icon } from 'components/ui';

import DropdownMenu from '../DropdownMenu';

interface SelectBoxProps
  extends WithElementSize,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onChange'>,
    Pick<
      Parameters<typeof DropdownMenu>[0],
      'onChangeSelectedId' | 'onChangeMenuOpen'
    > {
  status?: Exclude<ElementStatus, 'active' | 'loading'>;
  label: string;
  options: { id: string; value: string; default?: boolean }[];
}

const SelectBox = ({
  label,
  options,
  status = 'default',
  size = 'md',
  onChangeSelectedId,
  onChangeMenuOpen,
  ...props
}: SelectBoxProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(
    status === 'disabled' || options.length === 0
      ? ''
      : (options.find(option => option.default)?.id ?? options[0].id),
  );

  useEffect(() => {
    if (status !== 'disabled') onChangeMenuOpen?.(isMenuOpen);
  }, [status, onChangeMenuOpen, isMenuOpen]);

  // onChangeSelectedId 호출을 useEffect에서 제거
  // 대신 setSelectedId 호출 시 직접 실행
  const handleChangeSelectedId = (id: string) => {
    if (id !== selectedId) {
      setSelectedId(id);
      if (status !== 'disabled') {
        onChangeSelectedId?.(id);
      }
    }
  };

  return (
    <DropdownMenu
      {...props}
      options={options}
      status={status}
      size={size}
      onChangeMenuOpen={isOpen => setIsMenuOpen(isOpen)}
      onChangeSelectedId={handleChangeSelectedId}
    >
      <label className="block w-full">{label}</label>
      <div
        className={`shadow-border bg-default flex cursor-pointer items-center gap-x-4 rounded-md transition-shadow ${
          isMenuOpen ? '' : 'shadow-tertiary'
        } ${
          size === 'sm'
            ? 'px-3.5 py-2.5'
            : size === 'lg'
              ? 'px-4.5 py-3.5'
              : 'px-4 py-3'
        }`}
      >
        <input
          disabled={status === 'disabled'}
          readOnly
          value={options.find(option => option.id === selectedId)?.value ?? ''}
          className="pointer-events-none w-full outline-none"
        />
        <Icon
          src="chevron_down"
          size={16}
          className={`stroke-current transition-transform ${
            isMenuOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
    </DropdownMenu>
  );
};

export default SelectBox;
