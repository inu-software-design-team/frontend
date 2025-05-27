import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';

const meta = {
  title: 'Components/Loader',
  tags: ['autodocs'],
  component: Loader,
  args: {
    isLoading: true,
  },
} satisfies Meta<typeof Loader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
