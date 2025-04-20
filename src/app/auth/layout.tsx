import { Logo } from 'assets';

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="flex w-1/2 flex-col items-end justify-center">
        <Logo className="mr-24 w-0 md:w-80" />
        <div className="mt-[-20px] h-0 w-0 border-[0.2px] border-[#121212] opacity-30 md:w-[420px]" />
      </div>
      <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:items-start">
        <div className="rounded-[6px] drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)]">
          {children}
        </div>
      </div>
    </div>
  );
}
