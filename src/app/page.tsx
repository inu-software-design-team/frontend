import { Logo } from 'assets';

import { LoginButton } from 'features/auth';

export default function Start() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-12">
      {/* 로고 */}
      <Logo className="h-[135px] w-96" />

      <LoginButton />
    </div>
  );
}
