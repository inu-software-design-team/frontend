'use client';

import { HeaderLogo } from 'assets';

import { logout } from 'features/auth';

import { IconButton, TextButton } from '../components/ui';
import { getNavConfig, setNavConfig } from './actions';

const Header = ({ username }: { username: string }) => {
  return (
    <header className="bg-default border-tertiary sticky top-0 right-0 left-0 z-50 box-border! flex h-16 w-full items-center gap-x-4 border-b px-3 py-2">
      <div className="flex h-full flex-1 items-center justify-start gap-x-4">
        <IconButton
          icon="menu"
          spacing="compact"
          size="md"
          onClick={async () => {
            document.querySelector('aside')?.classList.toggle('minimized');

            const savedNavConfig = await getNavConfig();
            await setNavConfig(
              savedNavConfig === 'minimized' ? 'default' : 'minimized',
            );
          }}
        />
        <HeaderLogo name="로고" className="h-full" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-x-4">
        <div className="flex items-center gap-x-2 p-1">
          <div className="text-primary-hover bg-primary-light-hover flex size-8 items-center justify-center rounded-full">
            {username[0]}
          </div>
          <div className="text-body2 text-black-off whitespace-nowrap max-md:hidden">
            <span className="text-black">{username}</span> 님
          </div>
        </div>
        <TextButton
          label="로그아웃"
          color="primary"
          spacing="compact"
          onClick={async () => {
            await logout();
          }}
        />
      </div>
    </header>
  );
};

export default Header;
