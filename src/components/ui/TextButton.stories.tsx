import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TextButton from './TextButton';

const meta = {
  title: 'Components/Ui/TextButton',
  tags: ['autodocs'],
  component: TextButton,
  args: {
    label: '텍스트 버튼',
    size: 'md',
    status: 'default',
    variant: 'contained',
    color: 'default',
    spacing: 'normal',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['contained', 'outlined'],
    },
    color: {
      control: 'radio',
      options: ['default', 'primary', 'danger'],
    },
  },
} satisfies Meta<typeof TextButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ContainedWithoutIcon: Story = {
  args: {
    label: '아이콘 없는 채우기 버튼',
  },
};

export const ContainedWithLeftIcon: Story = {
  args: {
    label: '왼쪽에 아이콘 있는 채우기 버튼',
    leftIcon: 'check',
  },
};

export const ContainedWithRightIcon: Story = {
  args: {
    label: '오른쪽에 아이콘 있는 채우기 버튼',
    rightIcon: 'check',
  },
};

export const OutlinedWithoutIcon: Story = {
  args: {
    label: '아이콘 없는 라인 버튼',
    variant: 'outlined',
  },
};

export const OutlinedWithLeftIcon: Story = {
  args: {
    label: '왼쪽에 아이콘 있는 라인 버튼',
    variant: 'outlined',
    leftIcon: 'check',
  },
};

export const OutlinedWithRightIcon: Story = {
  args: {
    label: '오른쪽에 아이콘 있는 라인 버튼',
    variant: 'outlined',
    rightIcon: 'check',
  },
};
