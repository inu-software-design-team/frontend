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

export const ELEMENT_SIZES = ['sm', 'md', 'lg'] as const;
export type ElementSize = (typeof ELEMENT_SIZES)[number];
export interface WithElementSize {
  size?: ElementSize;
}
