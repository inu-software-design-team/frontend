import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Menu } from 'assets/icons';

import { ELEMENT_SIZES, ELEMENT_SPACINGS, ELEMENT_STATUS } from 'types';

import IconButton from './IconButton';

const meta = {
  title: 'Components/Ui/IconButton',
  tags: ['autodocs'],
  component: IconButton,
  args: {
    status: 'default',
    variant: 'none',
    color: 'default',
    spacing: 'normal',
    shape: 'square',
    icon: Menu,
    size: 'md',
    onClick: fn(),
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ELEMENT_STATUS,
    },
    variant: {
      control: 'radio',
      options: ['none', 'contained', 'outlined'],
    },
    color: {
      control: 'radio',
      options: ['default', 'primary', 'danger'],
    },
    spacing: {
      control: 'radio',
      options: ELEMENT_SPACINGS,
    },
    shape: {
      control: 'radio',
      options: ['square', 'circle'],
    },
    size: {
      control: 'radio',
      options: ELEMENT_SIZES,
    },
  },
} satisfies Meta<typeof IconButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const None: Story = {};

export const Contained: Story = {
  args: {
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
