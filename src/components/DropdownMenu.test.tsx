import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownMenu from './DropdownMenu';

describe('DropdownMenu', () => {
  const options = [
    { id: '1', value: 'option1' },
    { id: '2', value: 'option2', default: true },
    { id: '3', value: 'option3' },
  ];

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    render(<DropdownMenu options={options}>trigger</DropdownMenu>);

    expect(screen.getByText('trigger')).toBeInTheDocument();
  });

  it('요소 목록을 정상적으로 렌더링해야 합니다.', async () => {
    render(<DropdownMenu options={options}>trigger</DropdownMenu>);

    await userEvent.click(screen.getByText('trigger'));

    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
    expect(screen.getByText('option3')).toBeInTheDocument();
  });

  it('기본 선택값이 default를 설정한 요소로 설정되어야 합니다.', async () => {
    render(<DropdownMenu options={options}>trigger</DropdownMenu>);

    await userEvent.click(screen.getByText('trigger'));

    expect(screen.getByText('option2')).toHaveClass('font-semibold');
  });

  it('선택 목록에서 요소를 클릭하면 변경 이벤트가 호출되어야 합니다.', async () => {
    const handleChange = vi.fn();
    render(
      <DropdownMenu options={options} onChangeSelectedId={handleChange}>
        trigger
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText('trigger'));
    await userEvent.click(screen.getByText('option1'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('비활성화 상태에서는 드롭다운이 열리지 않아야 합니다.', async () => {
    render(
      <DropdownMenu options={options} status="disabled">
        trigger
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText('trigger'));

    expect(screen.getByRole('list')).toHaveClass('opacity-0');
  });
});
