import { Logo, 카카오 } from 'assets';

export default function Start() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* 로고 */}
      <Logo className="w-96" />

      <div className="mt-12 flex w-full justify-center">
        <div className="flex w-full justify-center gap-8">
          {/* 카카오 로그인 API 호출 */}
          <a href="http://localhost:4000/api/v1/users/kakao/login" className="w-72">
             <카카오 className="size-full" />
          </a>
        </div>
      </div>
    </div>
  );
}
