import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Spinner size={20} />);

    expect(container).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const { container } = render(<Spinner size={32} />);
    const icon = container.querySelector('.loader');

    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
  });
});
