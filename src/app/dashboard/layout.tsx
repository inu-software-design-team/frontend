import { StudentInfo } from 'types';

import {
  DashboardContentBox,
  getNavConfig,
  Header,
  PageHeader,
  SideNav,
} from 'layouts';

import {
  getStudentList,
  getYearListForStudent,
  StudentList,
  ToggleButton,
} from 'features/students';

export default async function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const years = await getYearListForStudent();
  const students: StudentInfo[] =
    years.length === 0
      ? []
      : await getStudentList({
          year: years[0].year,
        });

  return (
    <>
      <Header />
      <div className="grid w-full grid-cols-[minmax(0,_max-content)_1fr] max-xl:grid-cols-1">
        <SideNav initialNavConfig={await getNavConfig()} />
        <main className="w-full">
          <PageHeader />
          <section className="-mt-28 grid w-full grid-cols-1 justify-center gap-x-8 sm:px-4 md:px-8 xl:grid-cols-[minmax(0,_25rem)_minmax(0,_1fr)]">
            <ToggleButton />
            <StudentList years={years} students={students} />
            <DashboardContentBox>{children}</DashboardContentBox>
          </section>
        </main>
      </div>
    </>
  );
}
