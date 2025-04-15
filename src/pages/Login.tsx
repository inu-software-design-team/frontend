import Logo from '../assets/Logo.svg?react'
import SignupBtn from '../assets/SignupBtn.svg?react'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      {/* 로고 */}
      <div className="w-1/2 flex flex-col items-end justify-center">
        <Logo className="w-0 md:w-80 mr-24" />
        <div className="w-0 md:w-[420px] h-0 opacity-30 border-[0.2px] border-[#121212] mt-[-20px]" />
        <SignupBtn className="w-0 md:w-24 mr-44 mt-10" onClick={() => navigate('/signup')} />
      </div>

      {/* 로그인 */}
      <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-center">
        <div className="drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)] rounded-[6px]">
          <div className="w-lg bg-white flex flex-col items-center h-[360px] border border-[#F1F5F9] rounded-[6px] p-4">
            <p className="font-bold text-2xl mt-8">로그인</p>

            {/* 로그인 폼 */}
            <div className="w-96 flex flex-col items-center">
                <Input className="w-full" 
                    label="이메일" 
                    type="email" 
                    placeholder="이메일을 입력해 주세요."/>                       

                  {/* 비밀번호 */}
                  <Input className="w-full mt-4" 
                    label="비밀번호" 
                    type="password" 
                    placeholder="비밀번호를 입력해 주세요."/>     

                  {/* 가입하기 */}
                  <button className="w-full h-9 bg-[#4B89DC] text-sm text-white rounded-[6px] mt-8">
                        가입하기
                    </button>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
