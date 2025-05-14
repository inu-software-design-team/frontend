import type { Meta, StoryObj } from '@storybook/react';

import SideNav from './SideNav';

const meta = {
  title: 'Layouts/SideNav',
  tags: ['autodocs'],
  component: SideNav,
  args: {
    initialNavConfig: null,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SideNav>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => (
    <div className="h-screen">
      <SideNav {...props} />
    </div>
  ),
};
