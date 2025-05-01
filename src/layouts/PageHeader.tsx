'use client';

import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import type { ElementType } from 'types';

import { Icon } from 'components/ui';

const PageHeader = () => {
  const pathname = usePathname();
  const pageInfo = useMemo(
    () =>
      NAV_ITEMS.reduce<ElementType<typeof NAV_ITEMS> | null>(
        (bestMatch, item) => {
          if (pathname === item.path || pathname.startsWith(item.path)) {
            if (!bestMatch || item.path.length > bestMatch.path.length)
              return item;
          }
          return bestMatch;
        },
        null,
      ),
    [pathname],
  );

  return !pageInfo ? null : (
    <div className="bg-primary h-60 w-full p-8">
      <div className="flex items-center gap-x-4 stroke-white text-white">
        <Icon src={pageInfo.icon} size={32} />
        <h1 className="text-heading3 font-bold">{pageInfo.title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
