'use client';

import { useRouter } from 'next/navigation';

import type { ButtonProps, WithIconName } from 'types/ui';

import Icon from './Icon';
import Spinner from './Spinner';

interface IconButtonProps extends ButtonProps, WithIconName<'icon'> {
  variant?: 'contained' | 'outlined' | 'none';
  shape?: 'square' | 'circle';
}

const IconButton = ({
  icon,
  size = 'md',
  status = 'default',
  variant = 'none',
  color = 'default',
  spacing = 'normal',
  shape = 'square',
  ...props
}: IconButtonProps) => {
  const { push, replace } = useRouter();

  return (
    <button
      {...props}
      title={`${icon} 아이콘 버튼`}
      type={props.type ?? 'button'}
      disabled={status === 'disabled'}
      data-status={status}
      onClick={e => {
        if (status === 'disabled' || status === 'loading') {
          e.preventDefault();
          return;
        }
        props.onClick?.(e);

        if (!props.href) return;

        const { pathname } = props.href;
        const shouldReplaceHistory = props.href.replace ?? false;

        if (shouldReplaceHistory) replace(pathname);
        else push(pathname);
      }}
      className={`aspect-square size-max w-max transition-colors ${
        variant === 'contained'
          ? color === 'primary'
            ? 'bg-primary hover:not-disabled:bg-primary-hover active:bg-primary-hover stroke-white'
            : color === 'danger'
              ? 'bg-danger hover:not-disabled:bg-danger-hover active:bg-danger-hover stroke-white'
              : 'bg-secondary hover:not-disabled:bg-tertiary active:bg-tertiary stroke-current'
          : variant === 'outlined'
            ? `shadow-border ${
                color === 'primary'
                  ? 'shadow-primary hover:not-disabled:bg-primary-light-hover active:bg-primary-light-hover stroke-primary'
                  : color === 'danger'
                    ? 'shadow-danger hover:not-disabled:bg-danger-light-hover active:bg-danger-light-hover stroke-danger'
                    : 'hover:not-disabled:bg-secondary active:bg-secondary stroke-current'
              }`
            : color === 'primary'
              ? 'hover:not-disabled:bg-primary-light-hover active:bg-primary-light-hover stroke-primary'
              : color === 'danger'
                ? 'hover:not-disabled:bg-danger-light-hover active:bg-danger-light-hover stroke-danger'
                : 'hover:not-disabled:bg-secondary active:bg-secondary stroke-current'
      } ${
        size === 'xs'
          ? spacing === 'compact'
            ? 'p-1'
            : spacing === 'loose'
              ? 'p-2.5'
              : 'p-2'
          : size === 'sm'
            ? spacing === 'compact'
              ? 'p-1.5'
              : spacing === 'loose'
                ? 'p-3.5'
                : 'p-2.5'
            : size === 'lg'
              ? spacing === 'compact'
                ? 'p-2.5'
                : spacing === 'loose'
                  ? 'p-4.5'
                  : 'p-3.5'
              : spacing === 'compact'
                ? 'p-2'
                : spacing === 'loose'
                  ? 'p-4'
                  : 'p-3'
      } ${
        shape === 'circle' ? 'rounded-full' : 'rounded-md'
      } ${props.className ?? ''}`}
    >
      {status === 'loading' && <Spinner />}
      <Icon
        src={icon}
        size={size === 'xs' ? 16 : size === 'sm' ? 20 : size === 'lg' ? 28 : 24}
      />
    </button>
  );
};

export default IconButton;
