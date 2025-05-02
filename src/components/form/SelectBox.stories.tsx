import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SelectBox from './SelectBox';

const meta = {
  title: 'Components/Form/SelectBox',
  tags: ['autodocs'],
  component: SelectBox,
  args: {
    status: 'default',
    label: '레이블',
    options: [
      { id: crypto.randomUUID(), value: '전체' },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: crypto.randomUUID(),
        value: `선택 ${i + 1}`,
        default: i === 0,
      })),
    ],
    onClick: fn(),
    onChange: fn(),
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['default', 'disabled'],
    },
  },
} satisfies Meta<typeof SelectBox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SetDefault: Story = {
  args: {
    options: meta.args.options.map((option, index) => ({
      ...option,
      default: index === 7,
    })),
  },
};

export const Disabled: Story = {
  args: {
    status: 'disabled',
  },
};
