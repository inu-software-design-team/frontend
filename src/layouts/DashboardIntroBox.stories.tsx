import type { Meta, StoryObj } from '@storybook/react';

import { INTRO_ITEMS } from 'data';

import DashboardIntroBox from './DashboardIntroBox';

const meta = {
  title: 'Layouts/DashboardIntroBox',
  tags: ['autodocs'],
  component: DashboardIntroBox,
  args: {
    ...INTRO_ITEMS.grade,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DashboardIntroBox>;
export default meta;

type Story = StoryObj<typeof meta>;

const DashboardIntroBoxRender = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof DashboardIntroBox>) => (
  <div className="h-screen w-full p-20">
    <DashboardIntroBox {...props} />
  </div>
);

export const Grade: Story = {
  render: ({ ...props }) => <DashboardIntroBoxRender {...props} />,
};

export const StudentInfo: Story = {
  args: {
    ...INTRO_ITEMS['student-info'],
  },
  render: ({ ...props }) => <DashboardIntroBoxRender {...props} />,
};

export const Feedback: Story = {
  args: {
    ...INTRO_ITEMS.feedback,
  },
  render: ({ ...props }) => <DashboardIntroBoxRender {...props} />,
};

export const Counseling: Story = {
  args: {
    ...INTRO_ITEMS.counseling,
  },
  render: ({ ...props }) => <DashboardIntroBoxRender {...props} />,
};

export const Report: Story = {
  args: {
    ...INTRO_ITEMS.report,
  },
  render: ({ ...props }) => <DashboardIntroBoxRender {...props} />,
};
