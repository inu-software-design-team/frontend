import { Header, SideNav } from 'layouts';

export default async function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <Header />
      <SideNav />
      <main className="size-full">{children}</main>
    </>
  );
}
