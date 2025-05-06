import type {
  WithElementSize,
  WithElementSpacing,
  WithElementStatus,
  WithLinkNavigation,
} from '..';

export interface ButtonProps
  extends Omit<
      React.ComponentPropsWithoutRef<'button'>,
      'children' | 'disabled'
    >,
    WithElementStatus,
    WithElementSize,
    WithElementSpacing,
    WithLinkNavigation {
  color?: 'default' | 'primary' | 'danger';
}
