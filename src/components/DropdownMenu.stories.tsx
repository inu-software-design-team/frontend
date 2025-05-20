import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { useState } from 'react';

import DropdownMenu from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  tags: ['autodocs'],
  component: DropdownMenu,
  args: {
    children: 'Trigger',
    status: 'default',
    size: 'md',
    options: Array.from({ length: 3 }, (_, i) => ({
      id: crypto.randomUUID(),
      value: `Option ${i + 1}`,
    })),
    onChange: fn(),
  },
} satisfies Meta<typeof DropdownMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

const DropdownMenuRender = ({
  children,
  options,
  ...props
}: Parameters<typeof DropdownMenu>[0]) => {
  const [selectedId, setSelectedId] = useState(
    props.status === 'disabled'
      ? ''
      : (options.find(option => option.default)?.id ?? options[0]?.id ?? ''),
  );

  return (
    <>
      <small className="w-full">
        {`[selected : ${
          options.find(option => option.id === selectedId)?.value ?? 'None'
        }]`}
      </small>
      <DropdownMenu
        {...props}
        options={options}
        onChangeSelectedId={id => {
          setSelectedId(id);
          props.onChange?.(id);
        }}
        className="mx-auto cursor-pointer"
      >
        {children}
      </DropdownMenu>
    </>
  );
};

export const Default: Story = {
  render: props => <DropdownMenuRender {...props} />,
};

export const SetDefault: Story = {
  args: {
    options: meta.args.options.map((option, index) => ({
      ...option,
      default: index === 2,
    })),
  },
  render: props => <DropdownMenuRender {...props} />,
};

export const Disabled: Story = {
  args: {
    status: 'disabled',
  },
  render: props => <DropdownMenuRender {...props} />,
};
