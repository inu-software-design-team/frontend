import type {
  WithElementSize,
  WithElementSpacing,
  WithElementStatus,
} from '..';

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'disabled'>,
    WithElementStatus,
    WithElementSize,
    WithElementSpacing {
  color?: 'default' | 'primary' | 'danger';
  href?: string;
}
