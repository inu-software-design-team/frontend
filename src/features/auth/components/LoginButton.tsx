'use client';

import Image from 'next/image';

import 카카오 from 'assets/카카오.png';

import { login } from '../action';

const LoginButton = () => {
  return (
    <button type="button" onClick={() => login()} className="cursor-pointer">
      <Image src={카카오} alt="카카오 로그인 버튼" className="w-75 min-w-75" />
    </button>
  );
};

export default LoginButton;
