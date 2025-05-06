import { render } from '@testing-library/react';

import { INTRO_ITEMS } from 'data';

import DashboardIntroBox from './DashboardIntroBox';

describe('DashboardIntroBox 레이아웃 컴포넌트 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<DashboardIntroBox {...INTRO_ITEMS.grade} />);

    expect(container).toBeInTheDocument();
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const { container } = render(
      <DashboardIntroBox icon="check" description="description" />,
    );
    const introBox = container.querySelector('div');

    expect(introBox?.firstElementChild?.tagName).toBe('svg');
    expect(introBox).toHaveTextContent('description');
  });
});
