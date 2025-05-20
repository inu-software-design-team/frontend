import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { usePathname } from 'next/navigation';

import StudentList from './StudentList';

describe('학생 목록 표시 및 검색 기능 테스트', () => {
  const years = Array.from(
    {
      length: 2,
    },
    (_, i) => ({
      id: `${i + 1}`,
      year: i + 1,
    }),
  );
  const students = Array.from({ length: 3 }, (_, i) => ({
    id: `${i + 1}`,
    student_id: `${i + 1}`,
    name: `학생 ${i + 1}`,
    class_info: {
      id: `${i + 1}`,
      grade: 1,
      class: 1,
    },
  }));

  it('컴포넌트를 정상적으로 렌더링해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    const { container } = render(
      <StudentList years={years} students={students} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('홈(/dashboard)에서는 학생 목록이 표시되지 않아야 합니다.', async () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    const { container } = render(
      <StudentList years={years} students={students} />,
    );
    const studentList = container.querySelector('article');

    expect(studentList).toHaveClass('hidden');
  });

  it('props를 정상적으로 전달해야 합니다.', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard/grade');
    render(<StudentList years={years} students={students} />);
    const studentItems = screen.getAllByRole('link');

    studentItems.forEach((item, index) => {
      const studentId = students[index].student_id;
      const name = students[index].name;
      const grade = students[index].class_info.grade;
      const classNumber = students[index].class_info.class;

      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('href', `/dashboard/grade/${studentId}`);
      expect(item).toHaveTextContent(name);
      expect(item).toHaveTextContent(`${grade}학년 ${classNumber}반`);
    });
  });
});
