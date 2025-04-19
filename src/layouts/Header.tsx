'use client';

import { HeaderLogo } from 'assets';
import { Bell, Menu } from 'assets/icons';

import IconButton from '../components/ui/IconButton';

const Header = () => {
  const username = 'User';

  return (
    <header className="bg-default border-tertiary box-border! flex h-16 w-full items-center border-b px-3 py-2">
      <div className="flex flex-1 items-center justify-start gap-x-4">
        <IconButton
          icon={Menu}
          spacing="compact"
          size="md"
          onClick={e => {
            e.currentTarget.parentElement?.parentElement?.parentElement
              ?.querySelector('aside')
              ?.classList.toggle('active');
          }}
        />
        <HeaderLogo name="로고" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-x-4 px-4">
        <IconButton icon={Bell} size="md" spacing="compact" shape="circle" />
        <div className="flex items-center gap-x-2 p-1">
          <div className="text-primary-hover bg-primary-light-hover flex size-8 items-center justify-center rounded-full">
            {username[0].toUpperCase()}
          </div>
          <div className="text-body2 text-black-off whitespace-nowrap">
            <span className="text-black">{username}</span> 님
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
