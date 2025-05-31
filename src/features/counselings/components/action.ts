'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { API_PREFIX, SEMESTERS } from 'data';

import type {
  CounselingItem,
  KeysOf,
  SnakeCaseKeys,
  StrictOmit,
  StudentInfo,
} from 'types';

import { getCookieHeader, getUserInfo } from 'features/auth';

import { SelectBox } from 'components/form';

export const getCounselingList = async ({
  studentId,
}: Pick<StudentInfo, 'studentId'>): Promise<CounselingItem[]> => {
  const { role } = await getUserInfo();

  const response = await fetch(`${API_PREFIX[role]}/counselings/${studentId}`, {
    headers: {
      ...(await getCookieHeader()),
    },
  });

  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error(response.statusText);
  }
  const {
    refinedCounselingList,
  }: {
    refinedCounselingList: (SnakeCaseKeys<
      StrictOmit<CounselingItem, 'id' | 'nextDate'>
    > & {
      _id: string;
      next_date: string;
    })[];
  } = await response.json();

  return refinedCounselingList
    .map(item => ({
      id: item._id,
      classId: item.class_id,
      studentId: item.student_id,
      year: item.year,
      semester: item.semester,
      date: new Date(item.date),
      topic: item.topic,
      title: item.title,
      content: item.content,
      nextDate: item.next_date.length === 0 ? null : new Date(item.next_date),
      nextContent: item.next_content,
      teacherId: item.teacher_id,
      teacherName: item.teacher_name,
    }))
    .sort(
      (a, b) => b.date.getTime() - a.date.getTime(),
    ) satisfies CounselingItem[];
};

export const getCounseling = async ({
  studentId,
  id,
}: Pick<StudentInfo, 'studentId'> &
  Pick<CounselingItem, 'id'>): Promise<CounselingItem | null> => {
  const counseling = (
    await getCounselingList({
      studentId,
    })
  ).find(counseling => counseling.id === id);

  return counseling ?? null;
};

export const getOptionsForCounseling = async ({
  counselings,
}: {
  counselings: CounselingItem[];
}): Promise<{
  [option in KeysOf<CounselingItem, 'year' | 'semester' | 'topic'>]: Parameters<
    typeof SelectBox
  >[0]['options'];
}> => {
  return {
    year: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(counselings.flatMap(({ year }) => year)))
        .sort((a, b) => b - a)
        .map(year => ({
          id: crypto.randomUUID(),
          value: year.toString(),
        })),
    ],
    semester: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(counselings.flatMap(({ semester }) => semester)))
        .sort((a, b) => (a < b ? -1 : 1))
        .map(semester => ({
          id: crypto.randomUUID(),
          value: SEMESTERS[semester].toString(),
        })),
    ],
    topic: [
      { id: crypto.randomUUID(), value: '전체', default: true },
      ...Array.from(new Set(counselings.flatMap(({ topic }) => topic)))
        .sort((a, b) => (a < b ? -1 : 1))
        .map(topic => ({
          id: crypto.randomUUID(),
          value: topic,
        })),
    ],
  };
};

export const createCounseling = async ({
  studentId,
  studentYear,
  ...item
}: Pick<StudentInfo, 'studentId'> & {
  studentYear: number;
} & StrictOmit<
    CounselingItem,
    'classId' | 'id' | 'year' | 'semester' | 'teacherId' | 'teacherName'
  >): Promise<void> => {
  const response = await fetch(
    `${API_PREFIX.teacher}/counselings/${studentId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await getCookieHeader()),
      },
      body: JSON.stringify({
        topic: item.topic,
        title: item.title,
        content: item.content,
        next_date: !item.nextDate ? '' : item.nextDate.toISOString(),
        next_content: item.nextContent,
      }),
    },
  );

  if (!response.ok) throw new Error(response.statusText);
  await updatePathForCounseling(
    `/dashboard/counseling/${studentId}?studentYear=${studentYear}`,
  );
};

export const updateCounseling = async ({
  studentId,
  studentYear,
  ...item
}: Pick<StudentInfo, 'studentId'> & {
  studentYear: number;
} & StrictOmit<
    CounselingItem,
    'classId' | 'year' | 'semester' | 'teacherId' | 'teacherName'
  >): Promise<void> => {
  const response = await fetch(
    `${API_PREFIX.teacher}/counselings/${studentId}/${item.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(await getCookieHeader()),
      },
      body: JSON.stringify({
        topic: item.topic,
        date: item.date.toISOString(),
        title: item.title,
        content: item.content,
        next_date: !item.nextDate ? '' : item.nextDate.toISOString(),
        next_content: item.nextContent,
      }),
    },
  );

  if (!response.ok) throw new Error(response.statusText);
  await updatePathForCounseling(
    `/dashboard/counseling/${studentId}?studentYear=${studentYear}`,
  );
};

export const deleteCounseling = async ({
  id,
  studentId,
  studentYear,
}: Pick<StudentInfo, 'studentId'> &
  Pick<CounselingItem, 'id'> & {
    studentYear: number;
  }): Promise<void> => {
  const response = await fetch(
    `${API_PREFIX.teacher}/counselings/${studentId}/${id}`,
    {
      method: 'DELETE',
      headers: {
        ...(await getCookieHeader()),
      },
    },
  );

  if (!response.ok) throw new Error(response.statusText);
  await updatePathForCounseling(
    `/dashboard/counseling/${studentId}?studentYear=${studentYear}`,
  );
};

export const updatePathForCounseling = async (path: string): Promise<void> => {
  revalidatePath(path, 'layout');
  redirect(path, RedirectType.replace);
};
