import { render } from '@testing-library/react';

import Header from './Header';

describe('Header 레이아웃 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header />);

    expect(container).toBeInTheDocument();
  });

  it('메뉴 토글 버튼을 정상적으로 렌더링해야 합니다.', async () => {
    const { container } = render(<Header />);
    const menuToggleButton = container.querySelector(
      'div:first-child > button:first-child',
    );

    expect(menuToggleButton).toBeInTheDocument();
  });

  it('로고를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header />);
    const logo = container.querySelector('div:first-child > svg:last-child');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('name', '로고');
  });

  it('알림 버튼을 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header />);
    const noticeButton = container.querySelector(
      'div:last-child > button:first-child',
    );

    expect(noticeButton).toBeInTheDocument();
  });

  it('사용자 정보를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Header />);
    const userInfo = container.querySelector('div:last-child > div:last-child');

    expect(userInfo).toBeInTheDocument();
  });
});
