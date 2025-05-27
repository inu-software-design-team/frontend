import { headers } from 'next/headers';

import { Pretendard } from './fonts';

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
      <body
        className={`font-pretendard bg-secondary has-[dialog[open]]:overflow-hidden has-[dialog[open]]:*:first:z-0 has-[dialog[open]]:**:[aside]:z-0 has-[dialog[open]]:**:[main]:*:last:**:[button]:z-0 ${
          !isMain ? 'flex h-screen w-screen flex-col' : ''
        }`}
      >
        {children}
      </body>
    </html>
  );
}
