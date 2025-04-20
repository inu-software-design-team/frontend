import { headers } from 'next/headers';

import { Pretendard } from './fonts';

import { Header, SideNav } from 'layouts';

import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const headersList = await headers();
  const headerPathname = headersList.get('x-pathname') ?? '';

  const isMain = !(
    headerPathname === '/' || headerPathname.startsWith('/auth')
  );

  return (
    <html lang="ko" className={Pretendard.variable}>
      <body className="font-pretendard bg-secondary flex h-screen w-screen flex-col">
        {isMain && <Header />}
        {isMain && <SideNav />}
        {children}
      </body>
    </html>
  );
}
