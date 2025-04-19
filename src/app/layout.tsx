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
  // 로그인 & 회원가입 API 연동 전 임시 설정
  const isMain = !['/start', '/signup'].includes(headerPathname);

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
