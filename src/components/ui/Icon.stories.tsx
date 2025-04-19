import type { Meta, StoryObj } from '@storybook/react';

import { Home } from 'assets/icons';

import Icon from './Icon';

const meta = {
  title: 'Components/Ui/Icon',
  tags: ['autodocs'],
  component: Icon,
  args: {
    src: Home,
    size: 20,
  },
  argTypes: {
    size: {
      control: 'select',
      options: [14, 16, 18, 20, 24, 28, 32, 40, 48],
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PrimaryColor: Story = {
  args: {
    className: '*:stroke-primary',
  },
};

export const DangerColor: Story = {
  args: {
    className: '*:stroke-danger',
  },
};
