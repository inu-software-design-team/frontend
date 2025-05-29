import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import Textarea from './Textarea';

describe('Textarea 컴포넌트 테스트', () => {
  const TEST_VALUE = 'This is test value';
  const onChangeMock = vi.fn();

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    render(<Textarea value={TEST_VALUE} onChange={onChangeMock} />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeInTheDocument();

    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });

  it('props를 정상적으로 전달해야 합니다.', async () => {
    render(
      <Textarea
        autoFocus
        rows={3}
        placeholder="placeholder"
        value={TEST_VALUE}
        onChange={onChangeMock}
      />,
    );
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveFocus();
    expect(textarea).toHaveAttribute('rows', '3');
    expect(textarea).toHaveAttribute('placeholder', 'placeholder');
    expect(textarea).toHaveValue(TEST_VALUE);

    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });

  it('textarea에 값을 입력하면 onChange가 호출되고 값이 변경되어야 한다.', async () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <Textarea
          value={value}
          onChange={e => {
            setValue(e.target.value);
            onChangeMock();
          }}
        />
      );
    };

    render(<Wrapper />);
    const textarea = screen.getByRole('textbox');

    await userEvent.type(textarea, 'Hello');

    expect(textarea).toHaveValue('Hello');
    expect(onChangeMock).toHaveBeenCalledTimes(5);
  });

  it('label의 길이가 0보다 클 때, 정상적으로 렌더링되어야 합니다.', async () => {
    const TEST_LABEL = 'Test Label';
    render(
      <Textarea
        id="textarea"
        label={TEST_LABEL}
        value={TEST_VALUE}
        onChange={onChangeMock}
      />,
    );
    const label = screen.getByText(TEST_LABEL);
    const textarea = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'textarea');
    expect(label).toHaveTextContent(TEST_LABEL);

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'textarea');

    await userEvent.click(label);

    expect(textarea).toHaveFocus();
  });
});
