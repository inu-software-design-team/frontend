import { render } from '@testing-library/react';

import DashboardContentBox from './DashboardContentBox';

describe('DashboardContentBox 레이아웃 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<DashboardContentBox />);

    expect(container).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const { container } = render(
      <DashboardContentBox>content</DashboardContentBox>,
    );
    const contentBox = container.querySelector('div');

    expect(contentBox).toHaveTextContent('content');
  });
});
