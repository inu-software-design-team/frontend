'use client';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import type { ElementType } from 'types';

import { Icon } from 'components/ui';

const PageHeader = () => {
  const pathname = usePathname();
  const pageInfo = NAV_ITEMS.reduce<ElementType<typeof NAV_ITEMS>>(
    (bestMatch, item) => {
      if (pathname === item.path || pathname.startsWith(item.path)) {
        if (!bestMatch || item.path.length > bestMatch.path.length) return item;
      }
      return bestMatch;
    },
    NAV_ITEMS[0],
  );

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
