'use server';

import { cookies } from 'next/headers';

type NavConfig = 'default' | 'minimized';

const NAV_CONFIG = 'navigation-config';

export const getNavConfig = async (): Promise<NavConfig | null> => {
  return ((await cookies()).get(NAV_CONFIG)?.value ?? null) as NavConfig | null;
};

export const setNavConfig = async (config: NavConfig): Promise<void> => {
  const expirationTime = 60 * 60 * 24 * 14;

  (await cookies()).set(NAV_CONFIG, config, {
    maxAge: expirationTime,
    expires: expirationTime * 1000,
  });
};
