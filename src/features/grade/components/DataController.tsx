'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { StudentInfo } from 'types';

import { TextButton } from 'components/ui';

import { useGradeManager } from '../contexts/GradeItemManagerContext';
import {
  createGrade,
  deleteGrade,
  revalidateGradePage,
  updateGrade,
} from './actions';

const DataController = ({ studentId }: Pick<StudentInfo, 'studentId'>) => {
  const { hasChanged, getAddedItems, getRemovedItems, getUpdatedItems, clear } =
    useGradeManager();
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex w-full items-center justify-center gap-4 *:w-40">
      <TextButton
        label="저장"
        status={!hasChanged ? 'disabled' : 'default'}
        variant="outlined"
        onClick={async () => {
          if (hasChanged) {
            if (confirm('변경사항을 저장하시겠습니까?')) {
              const promises: Promise<void>[] = [];

              replace(
                `${pathname}?${new URLSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  status: 'loading',
                }).toString()}`,
              );

              await new Promise(resolve => setTimeout(resolve, 500));

              getRemovedItems().forEach(grade => {
                promises.push(
                  deleteGrade({
                    studentId,
                    grade,
                  }),
                );
              });

              getUpdatedItems().forEach(grade => {
                promises.push(
                  updateGrade({
                    studentId,
                    grade,
                  }),
                );
              });

              getAddedItems().forEach(grade => {
                promises.push(
                  createGrade({
                    studentId,
                    grade,
                  }),
                );
              });

              const results = await Promise.allSettled(promises);
              // 실패한 작업 로그 표시 (추후에 수정 필요)
              results.forEach(result => {
                if (result.status === 'rejected') console.error(result.reason);
              });

              await revalidateGradePage(
                `${pathname}?${searchParams.toString()}`,
              );
            }
          }
        }}
      />
      <TextButton
        label="취소"
        color="danger"
        onClick={async () => {
          if (!hasChanged) {
            if (confirm('성적 관리 페이지를 종료하시겠습니까?'))
              replace(
                `/dashboard/grade/${studentId}?${searchParams.toString()}`,
              );
            return;
          }

          if (confirm('변경사항이 있습니다. 취소하시겠습니까?')) {
            clear();
            refresh();
          }
        }}
      />
    </div>
  );
};

export default DataController;
