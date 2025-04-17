import LocalFont from 'next/font/local';

import '../globals.css';

const pretendard = LocalFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="flex h-screen w-screen flex-col bg-[#F1F5F9]">
        {children}
      </body>
    </html>
  );
}
