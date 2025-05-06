import type { WithIconName } from 'types/ui';

import { Icon } from 'components/ui';

interface DashboardIntroBoxProps extends WithIconName<'icon'> {
  description: string;
}

const DashboardIntroBox = ({ icon, description }: DashboardIntroBoxProps) => {
  return (
    <div className="*:opacity-off flex size-full flex-col items-center justify-center gap-y-8 stroke-current">
      <Icon src={icon} size={48} className="scale-150" />
      <p className="text-center font-semibold text-pretty">{description}</p>
    </div>
  );
};

export default DashboardIntroBox;
