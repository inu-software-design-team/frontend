import Logo from '../assets/Logo.svg?react'
import LoginBtn from '../assets/LoginBtn.svg?react'
import 카카오 from '../assets/카카오.svg?react'
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
            className="w-72 flex items-center justify-center"
            onClick={() => navigate('/signup')}
          >
            <카카오 className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
