'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { Loader } from 'components';

const DashboardContentBox = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldShowContentBox = pathname !== '/dashboard';
  const isLoading = searchParams.get('status') === 'loading';

  return (
    shouldShowContentBox && (
      <div
        className={`shadow-drop bg-default sticky top-16 left-0 flex h-[calc(100vh-4rem-8rem)] w-full max-w-7xl flex-col gap-12 rounded-md p-8 max-sm:rounded-b-none ${
          isLoading ? '*:not-last:opacity-off' : ''
        }`}
      >
        {children}
        <Loader isLoading={isLoading} />
      </div>
    )
  );
};

export default DashboardContentBox;
