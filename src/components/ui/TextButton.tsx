'use client';

import { useRouter } from 'next/navigation';

import type { WithIconComponent } from 'types';
import type { ButtonProps } from 'types/ui';

import Icon from './Icon';
import Spinner from './Spinner';

interface TextButtonProps
  extends ButtonProps,
    WithIconComponent<'leftIcon' | 'rightIcon'> {
  label: string;
  variant?: 'contained' | 'outlined';
}

const TextButton = ({
  label,
  leftIcon,
  rightIcon,
  size = 'md',
  status = 'default',
  variant = 'contained',
  color = 'default',
  spacing = 'normal',
  href = '',
  ...props
}: TextButtonProps) => {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
  const { push } = useRouter();

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      title={props.title ?? `${label} 버튼`}
      disabled={status === 'disabled'}
      data-status={status}
      onClick={e => {
        if (status === 'disabled' || status === 'loading') e.preventDefault();
        else {
          if (href.length > 0) push(href, { scroll: false });
          props.onClick?.(e);
        }
      }}
      className={`flex items-center justify-center rounded-md text-center transition-all ${
        variant === 'outlined'
          ? `bg-default shadow-border ${
              color === 'primary'
                ? 'stroke-primary shadow-primary text-primary hover:not-disabled:bg-primary-light-hover active:bg-primary-light-hover'
                : color === 'danger'
                  ? 'hover:not-disabled:bg-danger-light-hover active:bg-danger-light-hover shadow-danger stroke-danger text-danger'
                  : 'hover:not-disabled:bg-secondary active:bg-secondary stroke-current text-black'
            } ${size === 'lg' ? 'font-medium' : ''}`
          : `font-semibold ${
              color === 'primary'
                ? 'bg-primary hover:not-disabled:bg-primary-hover active:bg-primary-hover stroke-white text-white'
                : color === 'danger'
                  ? 'bg-danger hover:not-disabled:bg-danger-hover active:bg-danger-hover stroke-white text-white'
                  : 'bg-secondary hover:not-disabled:bg-tertiary active:bg-tertiary stroke-current text-black'
            }`
      } ${size === 'sm' ? 'text-body3' : size === 'lg' ? 'text-body1' : 'text-body2'} ${
        spacing === 'compact'
          ? 'gap-3 px-3 py-2'
          : spacing === 'loose'
            ? 'gap-5 px-5 py-4'
            : 'gap-4 px-4 py-3'
      } ${props.className ?? ''}`}
    >
      {status === 'loading' && <Spinner />}
      {leftIcon && <Icon src={leftIcon} size={iconSize} />}
      <span>{label}</span>
      {rightIcon && <Icon src={rightIcon} size={iconSize} />}
    </button>
  );
};

export default TextButton;
