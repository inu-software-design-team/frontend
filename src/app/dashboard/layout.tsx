import type { StudentInfo } from 'types';

import {
  DashboardContentBox,
  getNavConfig,
  Header,
  PageHeader,
  SideNav,
} from 'layouts';

import { StudentList, ToggleButton } from 'features/students';

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
  return (
    <>
      <Header />
      <div className="grid w-full grid-cols-[minmax(0,_max-content)_1fr] max-xl:grid-cols-1">
        <SideNav initialNavConfig={await getNavConfig()} />
        <main className="w-full">
          <PageHeader />
          <section className="-mt-28 grid w-full grid-cols-1 justify-center gap-x-8 sm:px-4 md:px-8 xl:grid-cols-[minmax(0,_25rem)_minmax(0,_1fr)]">
            <ToggleButton />
            <StudentList initialData={dummyData} />
            <DashboardContentBox>{children}</DashboardContentBox>
          </section>
        </main>
      </div>
    </>
  );
}
