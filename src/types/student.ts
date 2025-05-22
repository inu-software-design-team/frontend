import { SUBJECTS, TERMS } from 'data';

import type { StrictOmit } from 'types';

export type Subject = keyof typeof SUBJECTS;
export type GradeItem = {
  id: string;
  year: number;
  semester: 1 | 2;
  term: keyof typeof TERMS;
  subject: Subject;
  score: number;
  level: number;
};

export interface ClassInfo {
  classId: string;
  grade: number;
  class: number;
}

export interface StudentInfo {
  id: string;
  studentId: number;
  name: string;
  classInfo: StrictOmit<ClassInfo, 'classId'> & {
    id: string;
  };
}
