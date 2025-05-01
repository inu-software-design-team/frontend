import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectBox from './SelectBox';

describe('SelectBox 컴포넌트 테스트', () => {
  const HIDDEN_CLASS = 'opacity-0 translate-y-1 pointer-events-none';
  const TEST_ID = 'select-box';
  const LABEL = '레이블';
  const options = Array.from({ length: 10 }, (_, i) => ({
    id: crypto.randomUUID(),
    value: `선택 ${i + 1}`,
  }));

  const onClickMock = vi.fn();
  const onChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(
      <SelectBox label={LABEL} options={options} onChange={onChangeMock} />,
    );
    const selectLabel = screen.getByText(LABEL);
    const selectInput = screen.getByRole('textbox');
    const chevronDownIcon = container.querySelector('input ~ svg');

    expect(selectLabel).toBeInTheDocument();
    expect(selectInput).toHaveValue(options[0].value);
    expect(chevronDownIcon).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    render(
      <SelectBox
        label={`변경된 ${LABEL}`}
        options={options}
        data-testid="select-box"
        className="select-box"
      />,
    );
    const selectBox = screen.getByTestId(TEST_ID);
    const selectLabel = selectBox.querySelector('label');

    expect(selectBox).toHaveAttribute('data-testid', TEST_ID);
    expect(selectBox).toHaveClass('select-box');
    expect(selectLabel).toHaveTextContent('변경된 레이블');
  });

  it('빈 선택 목록을 전달했을 때 선택 목록이 보이지 않아야 합니다.', async () => {
    render(
      <SelectBox
        label={LABEL}
        options={[]}
        onChange={onChangeMock}
        data-testid={TEST_ID}
      />,
    );
    const selectBox = screen.getByTestId(TEST_ID);
    const optionList = selectBox.querySelector('ul');

    expect(optionList).not.toBeInTheDocument();
  });

  it('선택 목록 중 default = true를 만족하는 요소의 값이 기본값이 되어야 합니다.', () => {
    render(
      <SelectBox
        label={LABEL}
        options={[
          ...options.map((option, index) => ({
            ...option,
            default: index === 7,
          })),
        ]}
        onChange={onChangeMock}
      />,
    );
    const selectInput = screen.getByRole('textbox');

    expect(selectInput).toHaveValue(options[7].value);
  });

  it('컴포넌트를 클릭하면 선택 목록이 보였다가 보이지 않았다가 해야합니다.', async () => {
    render(<SelectBox label={LABEL} options={options} data-testid={TEST_ID} />);
    const selectBox = screen.getByTestId(TEST_ID);
    const optionList = screen.getByRole('list');

    expect(optionList).toHaveClass(HIDDEN_CLASS);

    await userEvent.click(selectBox);
    expect(optionList).not.toHaveClass(HIDDEN_CLASS);

    await userEvent.click(selectBox);
    expect(optionList).toHaveClass(HIDDEN_CLASS);
  });

  it('선택 목록에서 요소를 선택하면 변경 이벤트가 호출되어야 합니다.', async () => {
    render(
      <SelectBox
        label={LABEL}
        options={options}
        onChange={onChangeMock}
        data-testid={TEST_ID}
      />,
    );
    const selectBox = screen.getByTestId(TEST_ID);
    const selectInput = screen.getByRole('textbox');
    const option = screen.getByText(options[7].value);

    await userEvent.click(selectBox);
    await new Promise(resolve => setTimeout(resolve, 0));
    await userEvent.click(option);

    expect(selectInput).toHaveValue(options[7].value);
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });

  it('바활성화 상태일 때 선택 목록이 보여지거나 클릭/변경 이벤트가 호출되지 않아야 합니다.', async () => {
    render(
      <SelectBox
        label={LABEL}
        options={options}
        status="disabled"
        onClick={onClickMock}
        onChange={onChangeMock}
        data-testid={TEST_ID}
      />,
    );
    const selectBox = screen.getByTestId(TEST_ID);
    const selectInput = screen.getByRole('textbox');
    const optionList = screen.getByRole('list');

    await userEvent.click(selectBox);

    expect(selectBox).toHaveAttribute('data-status', 'disabled');
    expect(selectInput).toBeDisabled();
    expect(optionList).toHaveClass(HIDDEN_CLASS);

    expect(onClickMock).not.toHaveBeenCalled();
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('외부 요소를 클릭하면 선택 목록이 보이지 않아야 합니다.', async () => {
    render(
      <div>
        <SelectBox label={LABEL} options={options} data-testid={TEST_ID} />
        <button data-testid="outside">Outside</button>
      </div>,
    );
    const selectBox = screen.getByTestId(TEST_ID);
    const optionList = screen.getByRole('list');
    const outside = screen.getByTestId('outside');

    await userEvent.click(selectBox);
    expect(optionList).not.toHaveClass(HIDDEN_CLASS);

    await userEvent.click(outside);
    expect(optionList).toHaveClass(HIDDEN_CLASS);
  });
});
