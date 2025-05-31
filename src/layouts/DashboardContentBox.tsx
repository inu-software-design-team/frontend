'use client';

import { useSearchParams } from 'next/navigation';

import { Loader } from 'components';

const DashboardContentBox = ({ children }: React.PropsWithChildren) => {
  const searchParams = useSearchParams();
  const isLoading = searchParams.get('status') === 'loading';

  return (
    <div className="shadow-drop bg-default sticky top-16 left-0 flex h-[calc(100vh-4rem-8rem)] w-full flex-col gap-12 rounded-md p-8 max-sm:rounded-b-none">
      {children}
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default DashboardContentBox;
