'use client';

import { useRouter } from 'next/navigation';

import { Logo, SignupBtn } from 'assets';

import { Input } from 'components';

export default function Login() {
  const { push } = useRouter();

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      {/* 로고 */}
      <div className="flex w-1/2 flex-col items-end justify-center">
        <Logo className="mr-24 w-0 md:w-80" />
        <div className="mt-[-20px] h-0 w-0 border-[0.2px] border-[#121212] opacity-30 md:w-[420px]" />
        <SignupBtn
          className="mt-10 mr-44 w-0 md:w-24"
          onClick={() => push('/signup')}
        />
      </div>

      {/* 로그인 */}
      <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:items-start">
        <div className="rounded-[6px] drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)]">
          <div className="flex h-[360px] w-lg flex-col items-center rounded-[6px] border border-[#F1F5F9] bg-white p-4">
            <p className="mt-8 text-2xl font-bold">로그인</p>

            {/* 로그인 폼 */}
            <div className="flex w-96 flex-col items-center">
              <Input
                className="w-full"
                label="이메일"
                type="email"
                placeholder="이메일을 입력해 주세요."
                value=""
                onChange={() => {}}
                validate
                errorMessage=""
              />

              {/* 비밀번호 */}
              <Input
                className="mt-4 w-full"
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value="
                "
                onChange={() => {}}
                validate
                errorMessage=""
              />

              {/* 가입하기 */}
              <button className="mt-8 h-9 w-full rounded-[6px] bg-[#4B89DC] text-sm text-white">
                가입하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
