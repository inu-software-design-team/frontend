import { ICONS } from 'data';

export type IconComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>;
export type WithIconComponent<K extends string = 'icon'> = Record<
  K,
  IconComponent
>;

// 자동 생성된 파일입니다. 수정하지 마세요.
export type IconName = keyof typeof ICONS;
export type WithIconName<K extends string = 'name'> = Record<K, IconName>;
