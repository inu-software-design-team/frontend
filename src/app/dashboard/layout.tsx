import { cookies } from 'next/headers';

import type { StudentInfo } from 'types';

import { DashboardContentBox, Header, PageHeader, SideNav } from 'layouts';

import { StudentList } from 'features/students';

const dummyData: StudentInfo[] = Array.from({ length: 20 }, (_, i) => ({
  id: `101${(i + 1).toString().padStart(2, '0')}`,
  grade: 1,
  classNumber: 1,
  number: i + 1,
  name: `이름 ${i + 1}`,
}));

export default async function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const sessionId = (await cookies()).get('connect.sid')?.value ?? '';

  if (sessionId.length > 0) {
    try {
      const response = await fetch(
        'http://backend:4000/api/v1/users/csrf-token',
        {
          credentials: 'include',
        },
      );

      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);

      const { csrfToken }: { csrfToken: string } = await response.json();
      console.log(`CSRF 토큰 요청 성공 : ${csrfToken}`);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <>
      <Header />
      <div className="flex w-full">
        <SideNav />
        <main className="w-full">
          <PageHeader />
          <section className="-mt-28 flex w-full gap-x-8 px-8">
            <StudentList initialData={dummyData} />
            <DashboardContentBox>{children}</DashboardContentBox>
          </section>
        </main>
      </div>
    </>
  );
}
