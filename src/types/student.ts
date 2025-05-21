import type { StrictOmit } from 'types';

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
