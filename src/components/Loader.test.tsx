import { render, screen } from '@testing-library/react';

import Loader from './Loader';

describe('Loader Component', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    const { container } = render(<Loader isLoading={true} />);

    expect(container).toBeInTheDocument();
  });

  it('isLoading이 true일 때 로딩 애니메이션을 적용해야 합니다.', () => {
    render(<Loader isLoading={true} data-testid="loader" />);
    const loader = screen.getByTestId('loader');
    const circles = loader.querySelectorAll('svg');

    circles.forEach((circle, index) => {
      expect(circle).toHaveClass('animate-[opacity-bounce_1s_infinite]');
      expect(circle).toHaveStyle({
        animationDelay: `${index * 200}ms`,
      });
    });
  });

  it('isLoading이 false일 때 컴포넌트를 렌더링하지 않아야 합니다.', () => {
    const { container } = render(<Loader isLoading={false} />);

    expect(container).toBeEmptyDOMElement();
  });
});
