import { render } from '@testing-library/react';

import { Home } from 'assets/icons';

import Icon from './Icon';

describe('Icon 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Icon src={Home} />);

    expect(container).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const { container } = render(
      <Icon src={Home} size={32} className="icon" />,
    );
    const icon = container.querySelector('svg');

    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(icon).toHaveClass('icon');
  });
});
