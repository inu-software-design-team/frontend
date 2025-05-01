'use client';

import { usePathname, useRouter } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import { Icon } from 'components/ui';

const PageHeader = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const pageInfo = NAV_ITEMS.find(({ path }) => {
    const secondSlashIndex = pathname.indexOf('/', 1);
    if (secondSlashIndex === -1) return path === pathname;

    const thirdSlashIndex = pathname.indexOf('/', pathname.indexOf('/', 1) + 1);
    return thirdSlashIndex === -1
      ? path === pathname
      : path === pathname.substring(0, thirdSlashIndex);
  });

  if (!pageInfo) {
    replace('/404', { scroll: false });
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
