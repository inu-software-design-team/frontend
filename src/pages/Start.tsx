import Logo from '../assets/Logo.svg?react'
import LoginBtn from '../assets/LoginBtn.svg?react'
import SignupBtn from '../assets/SignupBtn.svg?react'
import { useNavigate } from 'react-router-dom'

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* 로고 */}
      <Logo className="w-96" />

      {/* 버튼 */}
      <div className="w-full flex justify-center mt-12">
        <div className="flex gap-8 w-full justify-center">
          {/* 로그인 버튼 */}
          <button
            className="w-[116px] flex items-center justify-center"
            onClick={() => navigate('/login')}
          >
            <LoginBtn className="w-full h-full" />
          </button>

          {/* 회원가입 버튼 */}
          <button
            className="w-[116px] flex items-center justify-center"
            onClick={() => navigate('/signup')}
          >
            <SignupBtn className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
