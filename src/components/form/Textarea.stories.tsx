import type { Meta, StoryObj } from '@storybook/react';

import Textarea from './Textarea';

const meta = {
  title: 'Components/Form/Textarea',
  tags: ['autodocs'],
  component: Textarea,
  args: {
    label: '',
    autoFocus: false,
    disabled: false,
    readOnly: false,
    required: false,
    rows: 4,
    placeholder: '',
  },
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: '레이블 표시',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '여기에 내용을 입력하세요.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
