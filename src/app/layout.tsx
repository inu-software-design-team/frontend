import { Pretendard } from './fonts';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="ko" className={Pretendard.className}>
      <body className="flex h-screen w-screen flex-col bg-[#F1F5F9]">
        {children}
      </body>
    </html>
  );
}
