import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Check } from 'assets/icons';

import TextButton from './TextButton';

describe('TextButton 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<TextButton label="text-button" />);

    expect(container).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const { container } = render(
      <TextButton
        label="text-button"
        leftIcon={Check}
        status="active"
        variant="outlined"
        color="primary"
        size="lg"
        spacing="loose"
        className="text-button"
      />,
    );
    const button = screen.getByRole('button');
    const icon = container.querySelector('svg:first-child');

    expect(button).toHaveAttribute('data-status', 'active');
    expect(button).toHaveClass(
      'shadow-border shadow-primary text-body1 gap-5 px-5 py-4 text-button',
    );
    expect(icon).toHaveAttribute('width', '18');
    expect(icon).toHaveAttribute('height', '18');
    expect(button).toHaveTextContent('text-button');
  });

  it('클릭 이벤트가 정상적으로 호출되어야 합니다.', async () => {
    const handleClick = vi.fn();
    render(<TextButton label="text-button" onClick={handleClick} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('비활성화 상태일 때 클릭 이벤트가 호출되지 않아야 합니다.', async () => {
    const handleClick = vi.fn();
    render(
      <TextButton
        label="text-button"
        status="disabled"
        onClick={handleClick}
      />,
    );
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('로딩 상태일 때 Spinner를 정상적으로 렌더링해야 합니다.', () => {
    render(<TextButton label="text-button" status="loading" />);
    const button = screen.getByRole('button');
    const spinner = button.querySelector('svg:first-child');

    expect(button).toHaveAttribute('data-status', 'loading');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });
});
