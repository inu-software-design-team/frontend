export * from './student';

// Globals
export type StrictOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
export type KeysOf<T, K extends keyof T> = K;
export type ArrayElementType<T> = T extends (infer U)[] ? U : T;
export type IdParams = {
  id: string;
};
export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

// Polymorphic
type AsProp<T extends React.ElementType> = {
  as?: T;
};
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];
export type PolymorphicPropsWithoutRef<
  T extends React.ElementType,
  P = unknown,
> = AsProp<T> &
  P &
  Partial<StrictOmit<React.ComponentPropsWithoutRef<T>, keyof (AsProp<T> & P)>>;
export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P = unknown,
> = {
  ref?: PolymorphicRef<T>;
} & PolymorphicPropsWithoutRef<T, P>;

// Elements
export const ELEMENT_STATUS = [
  'default',
  'active',
  'disabled',
  'loading',
] as const;
export type ElementStatus = (typeof ELEMENT_STATUS)[number];
export interface WithElementStatus {
  status?: ElementStatus;
}

export const ELEMENT_SPACINGS = ['normal', 'compact', 'loose'] as const;
export type ElementSpacing = (typeof ELEMENT_SPACINGS)[number];
export interface WithElementSpacing {
  spacing?: ElementSpacing;
}

export const ELEMENT_SIZES = ['xs', 'sm', 'md', 'lg'] as const;
export type ElementSize = (typeof ELEMENT_SIZES)[number];
export interface WithElementSize {
  size?: ElementSize;
}

export type WithLinkNavigation = {
  href?: {
    pathname: string;
    replace?: boolean;
  };
};
