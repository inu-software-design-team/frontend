import type { Meta, StoryObj } from '@storybook/react';

import { Clock } from 'assets/icons';

import Icon from './Icon';
import Table from './Table';

const dummyItems: Parameters<typeof Table>[0]['data'] = Array.from(
  { length: 3 },
  (_, i) => ({
    id: crypto.randomUUID(),
    name: `이름 ${i + 1}`,
    age: (i + 1) * 20,
  }),
);

const meta = {
  title: 'Components/Ui/Table',
  tags: ['autodocs'],
  component: Table,
  args: {
    className: 'max-w-[50vw]',
    data: dummyItems,
    columns: [
      {
        key: 'name',
        label: '이름',
      },
      {
        key: 'age',
        label: '나이',
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

const TableRender = ({ ...props }: Parameters<typeof Table>[0]) => (
  <div className="grid h-screen w-screen place-items-center">
    <Table {...props} />
  </div>
);

export const Default: Story = {
  render: ({ ...props }) => <TableRender {...props} />,
};

export const HeaderAlign: Story = {
  args: {
    columns: meta.args.columns.map(column => ({
      ...column,
      headerAlign: 'left',
    })),
  },
  render: ({ ...props }) => <TableRender {...props} />,
};

export const CustomRender: Story = {
  args: {
    columns: meta.args.columns.map(column => ({
      ...column,
      render: (value: React.ReactNode) =>
        !value ? null : column.key === 'name' ? (
          value
        ) : (
          <div className="flex items-center justify-center gap-2">
            {value}
            <Icon src={Clock} size={16} />
          </div>
        ),
    })),
  },
  render: ({ ...props }) => <TableRender {...props} />,
};
