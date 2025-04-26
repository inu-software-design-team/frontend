import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { usePathname } from 'next/navigation';

import StudentList from './StudentList';

describe('학생 목록 표시 및 검색 기능 테스트', () => {
  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    const { container } = render(<StudentList initialData={[]} />);

    expect(container).toBeInTheDocument();
  });

  it('홈(/dashboard)에서는 학생 목록이 표시되지 않아야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<StudentList initialData={[]} />);
    const studentList = screen.getByRole('article');

    expect(studentList).toHaveClass('hidden');
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    const dummyItems = Array.from({ length: 5 }, (_, i) => ({
      id: `101${(i + 1).toString().padStart(2, '0')}`,
      grade: 1,
      classNumber: 1,
      number: i + 1,
      name: `이름 ${i + 1}`,
    }));

    vi.mocked(usePathname).mockReturnValue('/dashboard/grade');
    render(<StudentList initialData={dummyItems} />);
    const studentItems = screen.getAllByRole('link');

    studentItems.forEach((item, index) => {
      const name = dummyItems[index].name;
      const grade = dummyItems[index].grade.toString();
      const classNumber = dummyItems[index].classNumber.toString();
      const number = dummyItems[index].number.toString();

      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute(
        'href',
        `/dashboard/grade/${grade}${classNumber.padStart(2, '0')}${number.padStart(2, '0')}`,
      );
      expect(item).toHaveTextContent(name);
      expect(item).toHaveTextContent(
        `${grade}학년 ${classNumber}반 ${number}번`,
      );
    });
  });
});
