import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Home } from 'assets/icons';

import IconButton from './IconButton';

describe('IconButton 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    render(<IconButton icon={Home} />);
    const iconButton = screen.getByRole('button');

    expect(iconButton).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const { container } = render(
      <IconButton
        icon={Home}
        status="active"
        variant="contained"
        color="primary"
        size="lg"
        className="icon-button"
      />,
    );
    const iconButton = screen.getByRole('button');
    const icon = container.querySelector('svg');

    expect(iconButton).toHaveAttribute('data-status', 'active');
    expect(iconButton).toHaveClass('bg-primary');
    expect(iconButton).toHaveClass('icon-button');

    expect(icon).toHaveAttribute('width', '28');
    expect(icon).toHaveAttribute('height', '28');
  });

  it('클릭 이벤트가 정상적으로 호출되어야 합니다.', async () => {
    const handleClick = vi.fn();
    render(<IconButton icon={Home} onClick={handleClick} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('비활성화 상태일 때 클릭 이벤트가 호출되지 않아야 합니다.', async () => {
    const handleClick = vi.fn();
    render(<IconButton icon={Home} status="disabled" onClick={handleClick} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
