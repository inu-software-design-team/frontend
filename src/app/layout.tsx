import '../globals.css';

export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
