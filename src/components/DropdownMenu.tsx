'use client';

import { useCallback, useEffect, useState } from 'react';

import type {
  ElementStatus,
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
  const [dropdownAlign, setDropdownAlign] = useState<
    'left' | 'center' | 'right'
  >('left');
  const [selectedId, setSelectedId] = useState(
    status === 'disabled' || options.length === 0
      ? ''
      : (options.find(option => option.default)?.id ?? options[0].id),
  );

  useEffect(() => {
    if (status !== 'disabled') onChangeMenuOpen?.(isDropdownMenuOpen);
  }, [status, onChangeMenuOpen, isDropdownMenuOpen]);

  useEffect(() => {
    if (status !== 'disabled') onChangeSelectedId?.(selectedId);
  }, [status, onChangeSelectedId, selectedId]);

  return (
    <Component
      {...props}
      data-status={status}
      ref={useCallback(
        (node: HTMLElement | null) => {
          if (status === 'disabled') return;

          const ac = new AbortController();

          function onClickOutside(event: MouseEvent) {
            if (
              node instanceof HTMLElement &&
              event.target instanceof Node &&
              !node.contains(event.target)
            )
              setIsDropdownMenuOpen(false);
          }
          function onResize() {
            if (node) {
              const centeredOffset = node.offsetLeft + node.clientWidth / 2;
              const findWiderContainerWidth = (elem: HTMLElement): number =>
                !elem.parentElement
                  ? window.innerWidth
                  : elem.parentElement.clientWidth > elem.clientWidth
                    ? elem.parentElement.clientWidth
                    : findWiderContainerWidth(elem.parentElement);

              // 만약 현재 요소의 너비가 부모 요소 너비의 1/3보다 크면 왼쪽, 오른쪽 정렬만 고려
              const widerContainerWidth = findWiderContainerWidth(node);
              setDropdownAlign(
                node.clientWidth * 3 > widerContainerWidth
                  ? centeredOffset < widerContainerWidth / 2
                    ? 'left'
                    : 'right'
                  : centeredOffset <
                      (widerContainerWidth - node.clientWidth) / 3
                    ? 'left'
                    : centeredOffset >
                        ((widerContainerWidth - node.clientWidth) / 3) * 2
                      ? 'right'
                      : 'center',
              );
            }
          }

          onResize();

          document.addEventListener('click', onClickOutside, ac);
          window.addEventListener('resize', onResize, ac);

          return () => ac.abort();
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
          className={`shadow-drop bg-default absolute top-[calc(100%+0.5rem)] z-10 w-full min-w-50 space-y-1 rounded-md p-2 transition-[translate,_opacity] ${
            dropdownAlign === 'left'
              ? 'left-0'
              : dropdownAlign === 'right'
                ? 'right-0'
                : 'left-1/2 -translate-x-1/2'
          } ${
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
