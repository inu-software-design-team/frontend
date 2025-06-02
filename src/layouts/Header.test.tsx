import { render } from '@testing-library/react';

import Header from './Header';

describe('Header 레이아웃 컴포넌트 테스트', () => {
  const USERNAME = '이름';

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header username={USERNAME} />);

    expect(container).toBeInTheDocument();
  });

  it('메뉴 토글 버튼을 정상적으로 렌더링해야 합니다.', async () => {
    const { container } = render(<Header username={USERNAME} />);
    const menuToggleButton = container.querySelector(
      'div:first-child > button:first-child',
    );

    expect(menuToggleButton).toBeInTheDocument();
  });

  it('로고를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header username={USERNAME} />);
    const logo = container.querySelector('div:first-child > svg:last-child');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('name', '로고');
  });

  it('사용자 정보를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header username={USERNAME} />);
    const userInfo = container.querySelector(
      'div:last-child > div:first-child',
    );

    expect(userInfo).toBeInTheDocument();
  });
});
