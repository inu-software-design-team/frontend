'use client';

import { usePathname, useRouter } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import { Icon } from 'components/ui';

const PageHeader = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const pageInfo = NAV_ITEMS.find(item => item.path === pathname);

  if (!pageInfo) {
    replace('/404');
    return null;
  }

  return (
    <div className="bg-primary h-60 w-full p-8">
      <div className="flex items-center gap-x-4 stroke-white text-white">
        <Icon src={pageInfo.icon} size={32} />
        <h1 className="text-heading3 font-bold">{pageInfo.title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
