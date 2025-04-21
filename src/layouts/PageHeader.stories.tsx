import type { Meta, StoryObj } from '@storybook/react';

import PageHeader from './PageHeader';

const meta = {
  title: 'Layouts/PageHeader',
  tags: ['autodocs'],
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
} satisfies Meta<typeof PageHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {};

export const Grade: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/grade',
      },
    },
  },
};

export const StudentInfo: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/student-info',
      },
    },
  },
};

export const Feedback: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/feedback',
      },
    },
  },
};

export const Counseling: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/counseling',
      },
    },
  },
};

export const Report: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/report',
      },
    },
  },
};
