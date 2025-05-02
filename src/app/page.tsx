import Link from 'next/link';

import { Logo, 카카오 } from 'assets';

export default function Start() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-12">
      {/* 로고 */}
      <Logo className="h-[135px] w-96" />

      <div className="flex w-full justify-center">
        <div className="flex w-full justify-center gap-8">
          {/* 로그인 하이퍼링크 */}
          <Link href="/auth" className="w-72">
            <카카오 className="size-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}
