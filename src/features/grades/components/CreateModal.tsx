'use client';

import { useCallback, useState } from 'react';

import { SEMESTERS, SUBJECTS, TERMS } from 'data';

import type { GradeItem, Semester, Subject, Term } from 'types';

import { Input } from 'components';
import { SelectBox } from 'components/form';
import { IconButton, TextButton } from 'components/ui';

import { getConfirmMessage, getLevelFromScore } from '../utils';

interface CreateModalProps {
  isCreateMode: boolean;
  onCreate: (grade: GradeItem) => void;
  onClose: () => void;
}

const SELECT_OPTIONS = {
  semester: Array.from({ length: 2 }, (_, i) => ({
    id: `semester-${i + 1}`,
    value: (i + 1).toString(),
    default: new Date().getMonth() + 1 < 8 ? i === 0 : i === 1,
  })),
  term: Array.from({ length: 2 }, (_, i) => ({
    id: `term-${i + 1}`,
    value: (i === 0 ? '중간고사' : '기말고사') satisfies (typeof TERMS)[Term],
    default: i === 0,
  })),
  subject: Object.keys(SUBJECTS).map(subject => ({
    id: `subject-${subject}`,
    value: SUBJECTS[subject as Subject],
    default: (subject as Subject) === 'korean',
  })),
};

const CreateModal = ({ isCreateMode, onCreate, onClose }: CreateModalProps) => {
  const [newYear, setNewYear] = useState(new Date().getFullYear());
  const [newSemester, setNewSemester] = useState<Semester>(
    Object.keys(SEMESTERS).find(
      semester =>
        SEMESTERS[semester as Semester] ===
        Number(SELECT_OPTIONS.semester.find(option => option.default)!.value),
    ) as Semester,
  );
  const [newTerm, setNewTerm] = useState<Term>('midterm');
  const [newSubject, setNewSubject] = useState<Subject>('korean');
  const [newScore, setNewScore] = useState(0);

  return (
    <section
      hidden={!isCreateMode}
      className="bg-black-off fixed top-0 left-0 z-99 h-screen w-screen"
    >
      <dialog
        ref={useCallback(
          (node: HTMLDialogElement | null) => {
            if (isCreateMode) node?.show();
            else node?.close();
          },
          [isCreateMode],
        )}
        className="bg-default absolute top-1/2 left-1/2 w-full max-w-[30rem] -translate-1/2 space-y-4 rounded-md p-8"
      >
        <div className="w-full text-right">
          <IconButton
            icon="x"
            size="sm"
            spacing="compact"
            onClick={() => {
              if (confirm('성적 데이터 추가를 취소하시겠습니까?')) onClose();
            }}
          />
        </div>
        <div className="**:[input]:text-body2 w-full space-y-8">
          <form className="*:[:first-child,_:last-child]:*:[input]:text-body2 w-full space-y-4 *:[:first-child,_:last-child]:*:[input]:h-12! *:[:first-child,_:last-child]:*:[input]:px-4 *:[:first-child,_:last-child]:*:[input]:py-3">
            <Input
              label="연도"
              min={0}
              max={new Date().getFullYear()}
              value={newYear}
              validate
              onChange={e => {
                const value = Number(e.target.value);

                setNewYear(
                  isNaN(value) || value < 0 || value > new Date().getFullYear()
                    ? new Date().getFullYear()
                    : value,
                );
              }}
            />
            <SelectBox
              label="학기"
              options={SELECT_OPTIONS.semester}
              onChangeSelectedId={id => {
                const selectedValue = SELECT_OPTIONS.semester.find(
                  item => item.id === id,
                )?.value;

                if (!selectedValue) return;
                setNewSemester(
                  Object.keys(SEMESTERS).find(
                    semester =>
                      SEMESTERS[semester as Semester] === Number(selectedValue),
                  ) as Semester,
                );
              }}
            />
            <SelectBox
              label="유형"
              options={SELECT_OPTIONS.term}
              onChangeSelectedId={id => {
                const selectedValue = SELECT_OPTIONS.term.find(
                  item => item.id === id,
                )?.value;

                if (!selectedValue) return;
                setNewTerm(
                  Object.keys(TERMS).find(
                    term => TERMS[term as keyof typeof TERMS] === selectedValue,
                  ) as keyof typeof TERMS,
                );
              }}
            />
            <SelectBox
              label="과목"
              options={SELECT_OPTIONS.subject}
              onChangeSelectedId={id => {
                const selectedValue = SELECT_OPTIONS.subject.find(
                  subject => subject.id === id,
                )?.value;

                if (!selectedValue) return;
                setNewSubject(
                  Object.keys(SUBJECTS).find(
                    subject =>
                      SUBJECTS[subject as keyof typeof SUBJECTS] ===
                      selectedValue,
                  ) as keyof typeof SUBJECTS,
                );
              }}
            />
            <Input
              label="점수"
              min={0}
              max={100}
              value={newScore}
              validate
              onChange={e => {
                const value = Number(e.target.value);

                if (isNaN(value) || value < 0 || value > 100) return;
                setNewScore(value);
              }}
            />
          </form>
          <TextButton
            label="확인"
            color="primary"
            spacing="compact"
            className="w-full"
            onClick={() => {
              if (
                confirm(
                  getConfirmMessage('새로운 성적 데이터를 추가하시겠습니까?'),
                )
              ) {
                onCreate({
                  id: crypto.randomUUID(),
                  year: newYear,
                  semester: newSemester,
                  term: newTerm,
                  subject: newSubject,
                  score: newScore,
                  level: getLevelFromScore(newScore),
                });
                onClose();
              }
            }}
          />
        </div>
      </dialog>
    </section>
  );
};

export default CreateModal;
