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
        className={`font-pretendard bg-secondary h-screen w-screen ${
          !isMain
            ? 'flex flex-col'
            : 'grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] *:first:col-start-1 *:first:col-end-3'
        }`}
      >
        {children}
      </body>
    </html>
  );
}
