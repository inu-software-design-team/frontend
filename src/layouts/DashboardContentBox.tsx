'use client';

import { usePathname } from 'next/navigation';

const DashboardContentBox = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const shouldShowContentBox = pathname !== '/dashboard';

  return (
    shouldShowContentBox && (
      <div
        className={`shadow-drop bg-default sticky top-16 left-0 flex h-[calc(100vh-4rem-8rem)] w-full max-w-7xl flex-col gap-12 rounded-md p-8 max-sm:rounded-b-none`}
      >
        {children}
      </div>
    )
  );
};

export default DashboardContentBox;
