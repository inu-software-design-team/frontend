'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { GRADE_COLUMNS } from 'data';

import type { GradeItem, StrictOmit, StudentInfo } from 'types';

import { Table, TextButton } from 'components/ui';

import { useGradeManager } from '../contexts/GradeItemManagerContext';
import { getConfirmMessage, getLevelFromScore } from '../utils';
import CreateModal from './CreateModal';
import ScoreInput from './ScoreInput';

type EditableTableColumn = NonNullable<
  React.ComponentPropsWithoutRef<
    typeof Table<
      StrictOmit<GradeItem, 'score'> & {
        score: React.ReactNode;
        checkbox: React.ReactNode;
      }
    >
  >['columns']
>;

interface EditableTableProps extends Pick<StudentInfo, 'studentId'> {
  grades: GradeItem[];
}

const EditableTable = ({ grades }: EditableTableProps) => {
  const gradesRef = useRef<GradeItem[]>(grades);
  const {
    addItem,
    removeItem,
    updateItem,
    getAddedItems,
    getRemovedItems,
    getUpdatedItems,
    patch,
    clear,
  } = useGradeManager();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [changeItems, setChangeItems] = useState<{ [id: string]: number }>({});

  const gradeList = patch(grades);

  useEffect(() => {
    if (gradesRef.current !== grades) {
      clear();

      if (searchParams.get('status') === 'loading')
        new Promise(resolve => setTimeout(resolve, 500)).then(() =>
          replace(
            `${pathname}?${new URLSearchParams({
              ...Object.fromEntries(
                searchParams.entries().filter(([key]) => key !== 'status'),
              ),
            })}`,
          ),
        );
    }
    gradesRef.current = grades;
  }, [grades, clear, replace, pathname, searchParams]);

  useEffect(() => {
    gradeList.forEach(grade => {
      const checkBox = document.getElementById(
        grade.id,
      ) as HTMLInputElement | null;
      if (!checkBox) return;

      const row = checkBox?.parentElement?.parentElement?.parentElement;
      if (!row) return;

      switch (true) {
        case getAddedItems().some(item => item.id === grade.id):
          row.classList.add('bg-primary-light-hover');
          break;
        case getRemovedItems().some(item => item.id === grade.id):
          row.classList.add('bg-danger-light-hover');
          row.classList.add('cursor-default!');
          row.classList.add('*:opacity-off');
          break;
        case getUpdatedItems().some(item => item.id === grade.id):
          row.classList.add('bg-yellow-50');
          break;
        default:
          break;
      }
    });
  }, [gradeList, grades, getAddedItems, getRemovedItems, getUpdatedItems]);

  useEffect(() => {
    checkedIds.forEach(id => {
      const scoreCell = (document.getElementById(id)?.parentElement
        ?.parentElement?.parentElement?.children[5] ??
        null) as HTMLElement | null;
      if (!scoreCell) return;

      if (isEditMode) scoreCell.classList.add('relative');
      else scoreCell.classList.remove('relative');
    });
  }, [isEditMode, checkedIds]);

  return (
    <div className="w-full space-y-4">
      <div className="flex w-full items-center justify-between gap-2 *:*:whitespace-nowrap">
        <div className="flex flex-1 items-center gap-x-2">
          <TextButton
            label={isEditMode ? '확인' : '수정'}
            leftIcon={isEditMode ? 'check' : 'edit'}
            status={checkedIds.length === 0 ? 'disabled' : 'default'}
            variant={isEditMode ? 'outlined' : 'outlined'}
            color="primary"
            spacing="compact"
            onClick={() => {
              if (Object.keys(changeItems).length > 0) {
                if (
                  isEditMode &&
                  confirm(getConfirmMessage('데이터를 수정하시겠습니까?'))
                ) {
                  for (const id of Object.keys(changeItems)) {
                    const grade = grades.find(grade => grade.id === id);

                    if (!grade) continue;
                    updateItem(grade, changeItems[id]);
                  }
                  setCheckedIds([]);
                }
              }
              setIsEditMode(prev => !prev);
            }}
          />
          <TextButton
            label={isEditMode ? '취소' : '삭제'}
            leftIcon="x"
            status={checkedIds.length === 0 ? 'disabled' : 'default'}
            variant="outlined"
            color="danger"
            spacing="compact"
            onClick={() => {
              if (isEditMode) {
                if (confirm('데이터 수정을 취소하시겠습니까?'))
                  setIsEditMode(false);
                return;
              }

              if (
                confirm(
                  getConfirmMessage(
                    `선택한 ${checkedIds.length}개의 성적을 삭제하시겠습니까?`,
                  ),
                )
              ) {
                for (const id of checkedIds) {
                  const grade = grades.find(grade => grade.id === id);

                  if (!grade) continue;
                  removeItem(grade);
                }
                setCheckedIds([]);
              }
            }}
          />
        </div>
        <TextButton
          label="성적 데이터 추가"
          leftIcon="plus"
          status={isEditMode ? 'disabled' : 'default'}
          color="primary"
          spacing="compact"
          className="max-md:hidden"
          onClick={() => setIsCreateMode(true)}
        />
        <TextButton
          label="추가"
          leftIcon="plus"
          status={isEditMode ? 'disabled' : 'default'}
          color="primary"
          spacing="compact"
          className="md:hidden"
          onClick={() => setIsCreateMode(true)}
        />
      </div>
      <div className="h-[calc(100vh-(4rem+8rem)-(2rem*2)-3.625rem-3rem-(2.5rem+1rem)-(1rem+3rem))] w-full space-y-4 overflow-auto">
        <Table
          className={`**:[thead]:sticky **:[thead]:top-0 **:[thead]:left-0.25 ${isEditMode ? '' : '**:[tbody_>_tr]:cursor-pointer'}`}
          ref={node => {
            const rowsInBody = node?.querySelectorAll('tbody > tr');
            if (!rowsInBody || rowsInBody.length === 0) return;

            rowsInBody.forEach(row => {
              (row as HTMLTableRowElement).onclick = () => {
                (
                  row.querySelector(
                    'input[type="checkbox"]',
                  ) as HTMLInputElement | null
                )?.click();
              };
            });
          }}
          data={gradeList.map(grade => ({
            ...grade,
            score:
              checkedIds.includes(grade.id) && isEditMode ? (
                <ScoreInput
                  initialValue={grade.score}
                  onChange={value => {
                    setChangeItems(prev => ({
                      ...prev,
                      [grade.id]: value,
                    }));
                  }}
                />
              ) : (
                grade.score
              ),
            level: getLevelFromScore(changeItems[grade.id] ?? grade.score),
            checkbox: (
              <input
                id={grade.id}
                type="checkbox"
                checked={checkedIds.includes(grade.id)}
                disabled={
                  getRemovedItems().some(({ id }) => id === grade.id) ||
                  isEditMode
                }
                onChange={e => {
                  const { id, checked } = e.target;

                  setCheckedIds(prev =>
                    checked
                      ? [...prev, id]
                      : prev.filter(value => value !== id),
                  );
                }}
              />
            ),
          }))}
          columns={
            [
              {
                key: 'checkbox',
                label: '',
                render: value => <div className="text-left">{value}</div>,
              },
              ...GRADE_COLUMNS,
            ] as EditableTableColumn
          }
        />
      </div>
      <CreateModal
        isCreateMode={isCreateMode}
        onCreate={grade => addItem(grade)}
        onClose={() => setIsCreateMode(false)}
      />
    </div>
  );
};

export default EditableTable;
