'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from 'data';

import { Icon } from 'components/ui';

const SideNav = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-default border-tertiary group box-border h-full w-60 space-y-4 border-r p-3 [.active]:w-16">
      <nav className="w-full space-y-1">
        {NAV_ITEMS.map(({ path, title, icon }) => (
          <Link
            key={path}
            href={path}
            className={`flex w-full items-center gap-x-3 rounded-md p-2 transition-colors group-[.active]:w-max ${path === pathname ? 'bg-primary stroke-white text-white' : 'hover:bg-secondary stroke-current text-black'}`}
          >
            <div className="p-0.5">
              <Icon src={icon} />
            </div>
            <span className="group-[.active]:hidden">{title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
