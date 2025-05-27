'use client';

import { useRouter } from 'next/navigation';

import type { StudentInfo } from 'types';

import { IconButton } from 'components/ui';

interface ManageCloseButtonProps extends Pick<StudentInfo, 'studentId'> {
  year: number;
}

const ManageCloseButton = ({ year, studentId }: ManageCloseButtonProps) => {
  const { push } = useRouter();

  return (
    <IconButton
      icon="x"
      size="sm"
      spacing="compact"
      onClick={() => {
        if (confirm('성적 관리 페이지를 종료하시겠습니까?'))
          push(`/dashboard/grade/${studentId}?studentYear=${year}`);
      }}
    />
  );
};

export default ManageCloseButton;
