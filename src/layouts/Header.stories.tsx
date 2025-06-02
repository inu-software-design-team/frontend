import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'Layouts/Header',
  tags: ['autodocs'],
  component: Header,
  args: {
    username: '이름',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
