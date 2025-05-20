'use client';

import { useCallback, useEffect, useState } from 'react';

import type {
  ElementStatus,
  HTMLTagToElement,
  PolymorphicPropsWithRef,
  WithElementSize,
} from 'types';

import { Icon } from './ui';

type DropdownMenuProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  WithElementSize & {
    children: React.ReactNode;
    status?: Exclude<ElementStatus, 'active' | 'loading'>;
    options: {
      id: string;
      value: string;
      default?: boolean;
    }[];
    onChangeMenuOpen?: (isOpen: boolean) => void;
    onChangeSelectedId?: (id: string) => void; // id를 받도록 정의
  }
>;

const DropdownMenu = <T extends React.ElementType = 'div'>({
  as,
  children,
  status = 'default',
  size = 'md',
  options,
  onChangeMenuOpen,
  onChangeSelectedId,
  ...props
}: DropdownMenuProps<T>) => {
  const Component = as ?? 'div';
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(
    status === 'disabled' || options.length === 0
      ? ''
      : (options.find(option => option.default)?.id ?? options[0].id),
  );

  useEffect(() => {
    if (
      status !== 'disabled' &&
      options.length > 0 &&
      !options.some(option => option.id === selectedId)
    )
      setSelectedId(
        options.find(option => option.default)?.id ?? options[0].id,
      );
  }, [status, options, selectedId]);

  useEffect(() => {
    if (status !== 'disabled') onChangeSelectedId?.(selectedId);
  }, [status, onChangeSelectedId, selectedId]);

  useEffect(() => {
    onChangeMenuOpen?.(isDropdownMenuOpen);
  }, [onChangeMenuOpen, isDropdownMenuOpen]);

  return (
    <Component
      {...props}
      data-status={status}
      ref={useCallback<(node: HTMLTagToElement<T> | null) => void>(
        node => {
          if (status === 'disabled') return;

          function onClickOutside(event: MouseEvent) {
            if (
              node instanceof HTMLElement &&
              event.target instanceof Node &&
              !node.contains(event.target)
            )
              setIsDropdownMenuOpen(false);
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

        setIsDropdownMenuOpen(prev => !prev);
        props.onClick?.(e);
      }}
      className={`relative flex flex-col gap-y-1 ${
        size === 'sm'
          ? '**:text-body3'
          : size === 'lg'
            ? '**:text-body1'
            : '**:text-body2'
      } ${props.className ?? ''}`}
    >
      {children}
      {options.length > 0 && (
        <ul
          className={`shadow-drop bg-default absolute top-[calc(100%+0.5rem)] left-0 z-10 w-full min-w-50 space-y-1 rounded-md p-2 transition-[translate,_opacity] ${
            isDropdownMenuOpen
              ? ''
              : 'pointer-events-none translate-y-1 opacity-0'
          }`}
        >
          {options.map(({ id, value }) => (
            <li
              key={id}
              id={id}
              onClick={e => setSelectedId(e.currentTarget.id)}
              className={`hover:bg-secondary flex w-full cursor-pointer items-center justify-between gap-x-4 rounded-md px-4 py-3 whitespace-pre transition-colors ${
                id === selectedId
                  ? 'bg-secondary font-semibold'
                  : 'hover:bg-secondary'
              }`}
            >
              {value}
              <Icon
                src="check"
                size={16}
                className={`stroke-current ${
                  id === selectedId ? '' : 'invisible'
                }`}
              />
            </li>
          ))}
        </ul>
      )}
    </Component>
  );
};

export default DropdownMenu;
