'use server';

import { cookies } from 'next/headers';

import { FETCH_PREFIX_TEACHER } from 'data';

export const getYearList = async (): Promise<
  { id: string; year: number }[]
> => {
  const response = await fetch(`${FETCH_PREFIX_TEACHER}/studentsList`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  if (!response.ok) throw new Error(response.statusText);

  const { yearSelection }: { yearSelection: number[] } = await response.json();

  return yearSelection
    .toSorted((a, b) => b - a)
    .map(year => ({
      id: crypto.randomUUID(),
      year,
    }));
};
