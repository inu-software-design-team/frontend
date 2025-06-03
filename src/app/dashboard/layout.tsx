import {
  DashboardContentBox,
  getNavConfig,
  Header,
  PageHeader,
  SideNav,
} from 'layouts';

import { getUserInfo, getUserName } from 'features/auth';
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
  const { role } = await getUserInfo();

  const years = role === 'teacher' ? await getYearListForStudent() : [];
  const students =
    role === 'teacher' && years.length === 0
      ? []
      : await getStudentList({
          role,
          year: years[0].year,
        });

  return (
    <>
      <Header username={await getUserName()} />
      <div className="grid w-full grid-cols-[minmax(0,_max-content)_1fr] max-xl:grid-cols-1">
        <SideNav role={role} initialNavConfig={await getNavConfig()} />
        <main className="relative w-full">
          <PageHeader />
          <section className="-mt-28 flex w-full gap-x-8 sm:px-4 md:px-8">
            <ToggleButton />
            <StudentList role={role} years={years} students={students} />
            <DashboardContentBox>{children}</DashboardContentBox>
          </section>
        </main>
      </div>
    </>
  );
}
