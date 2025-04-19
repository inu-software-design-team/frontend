import { Loader } from 'assets/icons';

import Icon from './Icon';

const Spinner = ({
  size,
}: Pick<React.ComponentPropsWithoutRef<typeof Icon>, 'size'>) => {
  return (
    <Icon
      src={Loader}
      size={size}
      className="loader absolute top-1/2 left-1/2 z-10 -translate-1/2 animate-spin *:stroke-inherit"
    />
  );
};

export default Spinner;
