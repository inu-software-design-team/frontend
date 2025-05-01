import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import Table from './Table';

describe('Table 컴포넌트 테스트', () => {
  const DATA: Parameters<typeof Table>[0]['data'] = [
    { id: '1', name: '홍길동', age: 30, role: '개발자' },
    { id: '2', name: '김철수', age: 25, role: '디자이너' },
    { id: '3', name: '박영희', age: 28, role: '기획자' },
  ];
  const COLUMNS: Parameters<typeof Table>[0]['columns'] = [
    { key: 'name', label: '이름' },
    { key: 'age', label: '나이' },
    { key: 'role', label: '직책' },
  ];

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    render(<Table data={DATA} />);

    const table = screen.getByRole('table');
    const headerCells = screen.getAllByRole('columnheader');
    const rows = screen.getAllByRole('row');

    expect(table).toBeInTheDocument();
    expect(headerCells.length).toBeGreaterThan(0);
    expect(rows.length).toBe(DATA.length + 1);
  });

  it('빈 데이터 배열을 전달했을 때 적절히 처리되어야 합니다.', () => {
    const { rerender } = render(<Table data={[]} />);

    const table = screen.getByRole('table');
    const headers = screen.queryAllByRole('columnheader');
    const tableBody = screen.getByRole('table').querySelector('tbody');

    expect(table).toBeInTheDocument();
    expect(headers.length).toBe(0);
    expect(tableBody?.childElementCount).toBe(0);

    rerender(<Table data={[]} columns={COLUMNS} />);

    COLUMNS.forEach(({ label }) => {
      const headerCell = screen.getByRole('columnheader', {
        name: label,
      });
      expect(headerCell).toBeInTheDocument();
    });
    expect(tableBody?.childElementCount).toBe(0);
  });

  it('columns 전달 유무에 따라 열 제목이 적절히 표시되어야 합니다.', () => {
    const { rerender } = render(<Table data={DATA} />);

    Object.keys(DATA[0])
      .filter(key => key !== 'id')
      .forEach(key => {
        const headerCell = screen.getByRole('columnheader', {
          name: key,
        });
        expect(headerCell).toBeInTheDocument();
      });

    rerender(<Table data={DATA} columns={COLUMNS} />);

    COLUMNS.forEach(({ label }) => {
      const headerCell = screen.getByRole('columnheader', {
        name: label,
      });
      expect(headerCell).toBeInTheDocument();
    });
  });

  it('headerAlign 속성이 적용되어야 합니다.', () => {
    const columnsWithAlign = COLUMNS.map((column, index) => ({
      ...column,
      headerAlign:
        index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right',
    })) satisfies Parameters<typeof Table>[0]['columns'];
    render(<Table data={DATA} columns={columnsWithAlign} />);

    const nameHeader = screen.getByRole('columnheader', { name: '이름' });
    const ageHeader = screen.getByRole('columnheader', { name: '나이' });
    const roleHeader = screen.getByRole('columnheader', { name: '직책' });

    expect(nameHeader).toHaveClass('text-left');
    expect(ageHeader).toHaveClass('text-center');
    expect(roleHeader).toHaveClass('text-right');
  });

  it('render함수가 제대로 호출되어야 합니다.', () => {
    const nameTestId = 'custom-name-render';
    const ageTestId = 'custom-age-render';
    const columnsWithRender = [
      {
        key: 'name',
        label: '이름',
        render: value => <span data-testid={nameTestId}>{value}</span>,
      },
      {
        key: 'age',
        label: '나이',
        render: value => <span data-testid={ageTestId}>{value}</span>,
      },
    ] satisfies Parameters<typeof Table>[0]['columns'];
    render(<Table data={DATA} columns={columnsWithRender} />);
    const customRenderedNameCells = screen.getAllByTestId(nameTestId);
    const customRenderedAgeCells = screen.getAllByTestId(ageTestId);

    customRenderedNameCells.forEach((cell, index) => {
      expect(cell).toHaveTextContent(`${DATA[index].name}`);
    });
    customRenderedAgeCells.forEach((cell, index) => {
      expect(cell).toHaveTextContent(`${DATA[index].age}`);
    });
  });

  it('render함수에 row와 index가 전달되어야 합니다.', () => {
    const renderFn = vi.fn().mockImplementation(value => <span>{value}</span>);
    const columnsWithRender = [
      {
        key: 'name',
        label: '이름',
        render: renderFn,
      },
    ];
    render(<Table data={DATA} columns={columnsWithRender} />);

    expect(renderFn).toHaveBeenCalledTimes(DATA.length);
    expect(renderFn).toHaveBeenCalledWith(DATA[0].name, DATA[0], 0);
    expect(renderFn).toHaveBeenCalledWith(DATA[1].name, DATA[1], 1);
  });

  it('모든 컬럼과 행이 올바르게 렌더링되어야 합니다.', () => {
    render(<Table data={DATA} columns={COLUMNS} />);

    const headers = screen.getAllByRole('columnheader');

    expect(headers.length).toBe(COLUMNS.length);
    COLUMNS.forEach(({ label }, index) => {
      expect(headers[index]).toHaveTextContent(label);
    });
    DATA.forEach((item, rowIndex) => {
      COLUMNS.forEach(({ key }) => {
        const cellContent = item[key];
        const cells = screen.getAllByRole('cell');
        const cellIndex =
          rowIndex * COLUMNS.length + COLUMNS.findIndex(col => col.key === key);

        expect(cells[cellIndex]).toHaveTextContent(`${cellContent}`);
      });
    });
  });
});
