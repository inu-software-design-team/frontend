'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Logo } from '@assets';
import { Input } from '@components';  

export default function Info() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get('role');
  const id = searchParams.get('id');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ email: string; phone: string; address: string }>({
    email: '',
    phone: '',
    address: '',
  });

  // 인증 정보 없으면 인증 페이지로 돌아감
  useEffect(() => {
    if (!role || !id ) {
      router.push('/auth');
    }
  }, [role, id, router]);

  const handleSubmit = () => {
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: '이메일을 입력해주세요.' }));
      return;
    }
    if (!phone.trim()) {
      setErrors(prev => ({ ...prev, phone: '전화번호를 입력해주세요.' }));
      return;
    }
    if (!address.trim()) {
      setErrors(prev => ({ ...prev, address: '주소를 입력해주세요.' }));
      return;
    }

    // 성공적으로 처리 후 리디렉션
    router.push('/teacher');
  };

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="flex w-1/2 flex-col items-end justify-center">
        <Logo className="mr-24 w-0 md:w-80" />
        <div className="mt-[-20px] h-0 w-0 border-[0.2px] border-[#121212] opacity-30 md:w-[420px]" />
      </div>

      <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:items-start">
        <div className="rounded-[6px] drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)]">
          <div className="flex h-[430px] w-md flex-col items-center rounded-[6px] border border-[#F1F5F9] bg-white p-4">
            <p className="mt-8 text-2xl font-bold">정보 입력</p> {/* 텍스트 수정 */}


          <div className="flex w-92 flex-col items-center">
             {/* 이메일 */}
             <Input
              label="이메일"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              errorMessage={errors.email}
              placeholder="알림 수신용 이메일을 입력해주세요."
              className="mt-3 mb-4 w-full"
              validate={true}
            />

            {/* 전화번호 */}
            <Input
              label="전화번호"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              errorMessage={errors.phone}
              placeholder="전화번호를 입력해주세요."
              className="mb-4 w-full"
              validate={true}
            />

            {/* 주소 */}
            <Input
              label="주소"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              errorMessage={errors.address}
              placeholder="주소를 입력해주세요."
              className="mb-4 w-full"
              validate={true}
            />

            {/* 제출 */}
            <button
              onClick={handleSubmit}
              className={`mt-4 mb-2 h-9 w-full rounded-[6px] text-sm text-white ${
                email && phone && address ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
              }`}
            >
              제출하기
            </button>

          </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
