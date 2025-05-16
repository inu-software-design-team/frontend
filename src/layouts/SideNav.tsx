'use client';

import { useCallback, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { debounce } from 'es-toolkit';

import { NAV_ITEMS } from 'data';

import type { ArrayElementType } from 'types';

import { Icon } from 'components/ui';

import { getNavConfig, setNavConfig } from './actions';

function shouldHighlightNavItem(path: string, pathname: string) {
  return (
    path ===
    NAV_ITEMS.reduce<ArrayElementType<typeof NAV_ITEMS>>((bestMatch, item) => {
      if (pathname === item.path || pathname.startsWith(item.path)) {
        if (!bestMatch || item.path.length > bestMatch.path.length) return item;
      }
      return bestMatch;
    }, NAV_ITEMS[0])?.path
  );
}

const SideNav = ({
  initialNavConfig,
}: {
  initialNavConfig: Awaited<ReturnType<typeof getNavConfig>>;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1280) {
      ref.current?.classList.add('minimized');
      setNavConfig('minimized');
    }
  }, [pathname]);

  return (
    <aside
      ref={useCallback((node: HTMLElement | null) => {
        ref.current = node;

        const updateMinimized = debounce(async () => {
          const savedNavConfig = await getNavConfig();

          switch (true) {
            case window.innerWidth < 1280:
              ref.current?.classList.add('minimized');
              await setNavConfig('minimized');
              break;
            case window.innerWidth >= 1280 && window.innerWidth < 1536:
              if (savedNavConfig === 'minimized')
                ref.current?.classList.add('minimized');
              else ref.current?.classList.remove('minimized');
              break;
            default:
              ref.current?.classList.remove('minimized');
              await setNavConfig('default');
          }
        }, 300);

        updateMinimized();
        window.addEventListener('resize', updateMinimized);

        return () => window.removeEventListener('resize', updateMinimized);
      }, [])}
      className={`bg-default border-tertiary group peer top-16 left-0 z-50 box-border h-[calc(100vh-4rem)] w-60 space-y-4 border-r p-3 max-xl:fixed max-[25rem]:w-full xl:sticky max-xl:[.minimized]:-translate-x-full xl:[.minimized]:w-16 ${
        initialNavConfig === 'minimized' ? 'minimized' : ''
      }`}
    >
      <nav className="w-full space-y-1">
        {NAV_ITEMS.map(({ path, title, icon }) => (
          <Link
            key={path}
            scroll={false}
            href={{
              pathname: path,
              query: Object.fromEntries(searchParams.entries()),
            }}
            className={`flex w-full items-center gap-x-3 rounded-md p-2 transition-colors xl:group-[.minimized]:w-max ${shouldHighlightNavItem(path, pathname) ? 'bg-primary stroke-white text-white' : 'hover:bg-secondary stroke-current text-black'}`}
          >
            <div className="p-0.5">
              <Icon src={icon} />
            </div>
            <span className="xl:group-[.minimized]:hidden">{title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
