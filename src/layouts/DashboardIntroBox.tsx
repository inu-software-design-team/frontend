import type { WithIconComponent } from 'types';

import { Icon } from 'components/ui';

import DashboardContentBox from './DashboardContentBox';

interface DashboardIntroBoxProps extends Required<WithIconComponent> {
  description: string;
}

const DashboardIntroBox = ({ icon, description }: DashboardIntroBoxProps) => {
  return (
    <DashboardContentBox>
      <div className="*:opacity-off flex size-full flex-col items-center justify-center gap-y-8 stroke-current">
        <Icon src={icon} size={48} className="scale-150" />
        <p className="text-center font-semibold text-pretty">{description}</p>
      </div>
    </DashboardContentBox>
  );
};

export default DashboardIntroBox;
