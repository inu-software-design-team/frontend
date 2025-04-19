import type { Meta, StoryObj } from '@storybook/react';

import SideNav from './SideNav';

const meta = {
  title: 'Layouts/SideNav',
  tags: ['autodocs'],
  component: SideNav,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SideNav>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <SideNav />
    </div>
  ),
};
