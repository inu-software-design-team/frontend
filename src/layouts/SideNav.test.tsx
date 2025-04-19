import { render, screen } from '@testing-library/react';

import { Chart, Comment, Heart, Home, Layer, User } from 'assets/icons';

import { Icon } from 'components/ui';

import SideNav from './SideNav';

const dummyItems: {
  path: string;
  title: string;
  icon: React.ComponentPropsWithoutRef<typeof Icon>['src'];
}[] = [
  { path: '/', title: '홈', icon: Home },
  { path: '/grade', title: '성적', icon: Chart },
  { path: '/student-info', title: '학생부', icon: User },
  { path: '/feedback', title: '피드백', icon: Comment },
  { path: '/meeting', title: '상담', icon: Heart },
  { path: '/report', title: '보고서', icon: Layer },
];

describe('SideNav 레이아웃 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<SideNav />);

    expect(container).toBeInTheDocument();
  });

  it('네비게이션 요소들을 정상적으로 렌더링해야 합니다.', () => {
    render(<SideNav />);
    const navItems = screen.getAllByRole('link');

    navItems.forEach((navItem, index) => {
      const icon = navItem.querySelector('svg');

      expect(icon).toBeInTheDocument();
      expect(navItem).toHaveAttribute('href', dummyItems[index].path);
      expect(navItem).toHaveTextContent(dummyItems[index].title);
    });
  });
});
