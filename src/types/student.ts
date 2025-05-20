import type { StrictOmit } from 'types';

export interface ClassInfo {
  class_id: string;
  grade: number;
  class: number;
}

export interface StudentInfo {
  id: string;
  student_id: string;
  name: string;
  class_info: StrictOmit<ClassInfo, 'class_id'> & {
    id: string;
  };
}
export type StudentInfoWithoutId = StrictOmit<StudentInfo, 'id'>;
