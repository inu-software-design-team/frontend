import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import SideNav from './SideNav';

describe('SideNav 레이아웃 컴포넌트 테스트', () => {
  const initialNavConfig = null;

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    const { container } = render(
      <SideNav role="teacher" initialNavConfig={initialNavConfig} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('네비게이션 요소들을 정상적으로 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<SideNav role="teacher" initialNavConfig={initialNavConfig} />);
    const links = screen.getAllByRole('link');

    links.forEach((link, index) => {
      const icon = link.querySelector('svg');

      expect(icon).toBeInTheDocument();
      expect(link).toHaveAttribute('href', NAV_ITEMS[index].path);
      expect(link).toHaveTextContent(NAV_ITEMS[index].title);
    });
  });

  it('사용자가 교사가 아닐 때 일부 네비게이션 요소가 노출되지 않아야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<SideNav role="student" initialNavConfig={initialNavConfig} />);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(NAV_ITEMS.length - 2);
    links.forEach((link, index) => {
      const linkIndex = index >= 2 ? index + Math.floor(index / 2) : index;
      const icon = link.querySelector('svg');
      const text = link.textContent?.trim();

      expect(icon).toBeInTheDocument();
      expect(text).not.toBe('학생부');
      expect(text).not.toBe('보고서');
      expect(link).toHaveAttribute('href', NAV_ITEMS[linkIndex].path);
      expect(link).toHaveTextContent(NAV_ITEMS[linkIndex].title);
    });
  });
});
