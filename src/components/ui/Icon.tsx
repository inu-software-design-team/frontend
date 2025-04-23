import type { WithIconComponent } from 'types';

interface IconProps
  extends Required<WithIconComponent<'src'>>,
    React.ComponentPropsWithoutRef<'svg'> {
  size?: 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40 | 48;
}

const Icon = ({ src, size = 20, ...props }: IconProps) => {
  const IconComponent = src;
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
