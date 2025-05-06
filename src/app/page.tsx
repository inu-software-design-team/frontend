'use client';

import { useRouter } from 'next/navigation';

import { Logo, 카카오 } from 'assets';

export default function Start() {
  const { push } = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-12">
      {/* 로고 */}
      <Logo className="h-[135px] w-96" />

      <div className="flex w-full justify-center">
        <div className="flex w-full justify-center gap-8">
          {/* 카카오 로그인 API 호출 */}
          <button
            type="button"
            onClick={async () => {
              const response = await fetch(
                'http://localhost:4000/api/v1/users/kakao/login',
              );

              if (!response.ok) {
                if (response.status === 400) {
                  const { kakaoId }: { kakaoId: string } =
                    await response.json();
                  push(`/auth?kakaoId=${encodeURIComponent(kakaoId)}`);
                }

                throw new Error(response.statusText);
              }

              push('/dashboard', { scroll: false });
            }}
          >
            <카카오 className="size-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
