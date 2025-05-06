import { ICONS } from 'data';

import type { WithIconName } from 'types/ui';

interface IconProps
  extends WithIconName<'src'>,
    React.ComponentPropsWithoutRef<'svg'> {
  size?: 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40 | 48;
}

const Icon = ({ src, size = 20, ...props }: IconProps) => {
  const IconComponent = ICONS[src];
  return (
    <IconComponent
      {...props}
      width={size}
      height={size}
      className={`*:stroke-inherit ${props.className ?? ''}`}
    />
  );
};

export default Icon;
