'use client';

import { usePathname } from 'next/navigation';

import { IconButton } from 'components/ui';

const ToggleButton = () => {
  const pathname = usePathname();
  const shouldShowToggleButton = pathname !== '/dashboard';

  return (
    shouldShowToggleButton && (
      <IconButton
        icon="search"
        color="default"
        spacing="compact"
        className="fixed top-16 right-0 z-30 my-4 rounded-r-none xl:hidden"
        onClick={e => {
          e.currentTarget.parentElement
            ?.querySelector('#student-list')
            ?.classList.add('show');
        }}
      />
    )
  );
};

export default ToggleButton;
