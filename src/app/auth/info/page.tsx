'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from 'components';

export default function Info() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get('role') ?? '';
  const linked = searchParams.get('linked') ?? '';
  const kakaoId = searchParams.get('kakaoId') ?? '';

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{
    email: string;
    phone: string;
    address: string;
  }>({
    email: '',
    phone: '',
    address: '',
  });

  // 인증 정보 없으면 인증 페이지로 돌아감
  useEffect(() => {
    if (kakaoId.length === 0) router.replace('/');

    if (role.length === 0 || linked.length === 0) router.push('/auth');
  }, [role, linked, router, kakaoId]);

  const handleSubmit = async () => {
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

    const response = await fetch('http://localhost:4000/api/v1/users/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role,
        linked: [parseInt(linked)],
        kakaoId,
        email,
        phone,
        address,
      }),
    });

    if (!response.ok) throw new Error(response.statusText);
    // 성공적으로 처리 후 리디렉션
    router.push('/dashboard', { scroll: false });
  };

  return (
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
            email && phone && address
              ? 'bg-[#4B89DC]'
              : 'bg-[#4B89DC] opacity-38'
          }`}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
