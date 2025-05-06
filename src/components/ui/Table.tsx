interface TableColumn<T> {
  key: Extract<Exclude<keyof T, 'id'>, string>;
  label: string;
  headerAlign?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

type TableData = Record<string, React.ReactNode> & { id: string };

interface TableProps<T extends TableData>
  extends React.ComponentPropsWithoutRef<'div'> {
  columns?: TableColumn<T>[];
  data: T[];
}

const Table = <T extends TableData>({
  data,
  columns,
  ...props
}: TableProps<T>) => {
  const effectiveColumns =
    columns ??
    Object.keys(data[0] ?? {})
      .filter(key => key !== 'id')
      .map(key => ({
        key: key as Extract<Exclude<keyof T, 'id'>, string>,
        label: key,
        headerAlign: 'center',
        render: value => <>{value}</>,
      }));

  return (
    <div
      {...props}
      className={`border-primary-light-hover w-full rounded-md border ${props.className ?? ''}`}
    >
      <table className="**:[tr]:border-primary-light-hover w-full **:[th,td]:px-4 **:[th,td]:py-3 **:not-last:[tr]:border-b">
        {effectiveColumns.length > 0 && (
          <thead>
            <tr>
              {effectiveColumns.map(
                ({ key, label, headerAlign = 'center' }) => (
                  <th
                    key={key}
                    scope="col"
                    className={`bg-primary-light-hover text-primary-hover ${
                      headerAlign === 'left'
                        ? 'text-left'
                        : headerAlign === 'right'
                        ? 'text-right'
                        : 'text-center'
                    }`}
                    style={{ width: '150px' }} // 모든 열에 동일한 너비 적용
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id}>
              {effectiveColumns.map(({ key, render }) => (
                <td
                  key={key}
                  className="text-center text-pretty whitespace-pre"
                  style={{ width: '150px' }} // 모든 열에 동일한 너비 적용
                >
                  {render?.(row[key], row, rowIndex) ?? row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

