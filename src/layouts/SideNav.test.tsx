import { render, screen } from '@testing-library/react';

import { NAV_ITEMS } from 'data';

import SideNav from './SideNav';

describe('SideNav 레이아웃 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<SideNav />);

    expect(container).toBeInTheDocument();
  });

  it('네비게이션 요소들을 정상적으로 렌더링해야 합니다.', () => {
    render(<SideNav />);
    const links = screen.getAllByRole('link');

    links.forEach((link, index) => {
      const icon = link.querySelector('svg');

      expect(icon).toBeInTheDocument();
      expect(link).toHaveAttribute('href', NAV_ITEMS[index].path);
      expect(link).toHaveTextContent(NAV_ITEMS[index].title);
    });
  });
});
