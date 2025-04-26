import type { Meta, StoryObj } from '@storybook/react';

import DashboardContentBox from './DashboardContentBox';

const meta = {
  title: 'Layouts/DashboardContentBox',
  tags: ['autodocs'],
  component: DashboardContentBox,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DashboardContentBox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-screen w-full p-20">
      <DashboardContentBox />
    </div>
  ),
};
