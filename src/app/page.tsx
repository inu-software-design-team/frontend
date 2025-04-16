'use client';

import { Logo, 카카오 } from '@public';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* 로고 */}
      <Logo className="w-96" />

      {/* 버튼 */}
      <div className="mt-12 flex w-full justify-center">
        <div className="flex w-full justify-center gap-8">
          {/* 로그인 버튼 */}
          <button
            className="flex w-72 items-center justify-center"
            onClick={() => push('/login')}
          >
            <카카오 className="h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
