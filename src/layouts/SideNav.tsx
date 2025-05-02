'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import type { ElementType } from 'types';

import { Icon } from 'components/ui';

function shouldHighlightNavItem(path: string, pathname: string) {
  return (
    path ===
    NAV_ITEMS.reduce<ElementType<typeof NAV_ITEMS>>((bestMatch, item) => {
      if (pathname === item.path || pathname.startsWith(item.path)) {
        if (!bestMatch || item.path.length > bestMatch.path.length) return item;
      }
      return bestMatch;
    }, NAV_ITEMS[0])?.path
  );
}

const SideNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <aside className="bg-default border-tertiary group peer sticky top-16 left-0 box-border h-[calc(100vh-4rem)] w-60 space-y-4 border-r p-3 [.minimized]:w-16">
      <nav className="w-full space-y-1">
        {NAV_ITEMS.map(({ path, title, icon }) => (
          <Link
            key={path}
            scroll={false}
            href={{
              pathname: path,
              query: Object.fromEntries(searchParams.entries()),
            }}
            className={`flex w-full items-center gap-x-3 rounded-md p-2 transition-colors group-[.minimized]:w-max ${shouldHighlightNavItem(path, pathname) ? 'bg-primary stroke-white text-white' : 'hover:bg-secondary stroke-current text-black'}`}
          >
            <div className="p-0.5">
              <Icon src={icon} />
            </div>
            <span className="group-[.minimized]:hidden">{title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
