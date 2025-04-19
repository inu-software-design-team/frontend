interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  src: React.FC<React.SVGProps<SVGSVGElement>>;
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
