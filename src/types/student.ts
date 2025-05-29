import { SEMESTERS, SUBJECTS, TERMS } from 'data';

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
export type Subject = keyof typeof SUBJECTS;
export type Semester = keyof typeof SEMESTERS;
export type Term = keyof typeof TERMS;

export type GradeItem = {
  id: string;
  year: number;
  semester: Semester;
  term: Term;
  subject: Subject;
  score: number;
  level: number;
};

export interface CounselingItem
  extends Pick<ClassInfo, 'classId'>,
    Pick<StudentInfo, 'studentId'> {
  id: string;
  year: number;
  semester: Semester;
  date: Date;
  topic: string;
  title: string;
  content: string;
  nextDate: Date | null;
  nextContent: string;
  teacherId: number;
  teacherName: string;
}
