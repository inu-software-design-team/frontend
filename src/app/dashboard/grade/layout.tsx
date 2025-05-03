import { DashboardContentBox } from 'layouts';

export default function GradeLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <DashboardContentBox>{children}</DashboardContentBox>;
}
