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

export default function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
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
