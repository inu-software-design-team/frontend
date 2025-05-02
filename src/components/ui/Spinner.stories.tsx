import type { Meta, StoryObj } from '@storybook/react';

import IconStoriesMeta from './Icon.stories';
import Spinner from './Spinner';

const meta = {
  title: 'Components/Ui/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  args: {
    size: 20,
  },
  argTypes: {
    size: {
      control: 'select',
      options: IconStoriesMeta.argTypes.size.options,
    },
  },
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

const SpinnerRender = ({
  size,
  ...props
}: React.ComponentPropsWithoutRef<typeof Spinner> &
  Pick<React.ComponentPropsWithoutRef<'div'>, 'className'>) => {
  return (
    <div {...props}>
      <Spinner size={size} />
    </div>
  );
};

export const Default: Story = {
  render: props => <SpinnerRender {...props} />,
};

export const PrimaryColor: Story = {
  render: props => <SpinnerRender {...props} className="stroke-primary" />,
};

export const DangerColor: Story = {
  render: props => <SpinnerRender {...props} className="stroke-danger" />,
};
