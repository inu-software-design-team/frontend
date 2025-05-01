import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { usePathname } from 'next/navigation';

import PageHeader from './PageHeader';

describe('PageHeader 레이아웃 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');

    const { container } = render(<PageHeader />);

    expect(container).toBeInTheDocument();
  });

  it('현재 경로에 따른 아이콘과 제목을 각각 정상적으로 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard/grade');

    const { container } = render(<PageHeader />);
    const icon = container.querySelector('svg');
    const title = screen.getByRole('heading');

    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(title).toHaveTextContent('성적');
  });

  it('하위 페이지 경로에 대해 알맞게 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard/grade/10101');

    const { container } = render(<PageHeader />);
    const icon = container.querySelector('svg');
    const title = screen.getByRole('heading');

    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(title).toHaveTextContent('성적');
  });
});
