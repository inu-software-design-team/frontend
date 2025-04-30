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

export const Default: Story = {
  render: props => (
    <div className="stroke-current">
      <Spinner {...props} />
    </div>
  ),
};

export const PrimaryColor: Story = {
  render: props => (
    <div className="stroke-primary">
      <Spinner {...props} />
    </div>
  ),
};

export const DangerColor: Story = {
  render: props => (
    <div className="stroke-danger">
      <Spinner {...props} />
    </div>
  ),
};
