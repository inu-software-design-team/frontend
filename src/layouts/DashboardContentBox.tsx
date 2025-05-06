'use client';

import { usePathname } from 'next/navigation';

const DashboardContentBox = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const shouldShowContentBox = pathname !== '/dashboard';

  return (
    <div
      className={`shadow-drop bg-default sticky top-16 left-0 flex h-[calc(100vh-4rem-8rem)] w-full flex-col gap-12 rounded-md p-8 ${
        !shouldShowContentBox ? 'hidden' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default DashboardContentBox;
