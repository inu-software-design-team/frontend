import { useState } from 'react';
import Logo from '../assets/Logo.svg?react';
import LoginBtn2 from '../assets/LoginBtn2.svg?react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [activeTab, setActiveTab] = useState<string>('Teacher');
  const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const isTeacherIdValid = teacherId.trim().length > 0;
  const isStudentIdValid = studentId.trim().length > 0;

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      {/* 로고 */}
      <div className="w-1/2 flex flex-col items-end justify-center">
        <Logo className="w-0 md:w-80 mr-24" />
        <div className="w-0 md:w-[420px] h-0 opacity-30 border-[0.2px] border-[#121212] mt-[-20px]" />
      </div>

      {/* 회원가입 */}
      <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-center">
        <div className="drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)] rounded-[6px]">
          <div className="w-lg bg-white flex flex-col items-center h-[400px] border border-[#F1F5F9] rounded-[6px] p-4">
            <p className="font-bold text-2xl mt-8">회원가입</p>

            {/* 탭 버튼 */}
            <div className="flex flex-row items-start mt-7 w-96 h-12 bg-white border-[0.5px] border-[#E6F0FB] rounded-[6px] p-1">
              <button
                onClick={() => setActiveTab('Teacher')}
                className={`p-4 font-normal text-sm flex justify-center items-center w-[232px] h-10 rounded-[6px] transition-all ${
                  activeTab === 'Teacher' ? 'text-[#4B89DC] bg-[#E6F0FB]' : ''
                }`}
              >
                교사
              </button>
              <button
                onClick={() => setActiveTab('Student&Parents')}
                className={`p-4 font-normal text-sm flex justify-center items-center w-[232px] h-10 rounded-[6px] transition-all ${
                  activeTab === 'Student&Parents' ? 'text-[#4B89DC] bg-[#E6F0FB]' : ''
                }`}
              >
                학생/학부모
              </button>
            </div>

            {/* 교사 탭 */}
            {activeTab === 'Teacher' && (
              <div className="w-96 flex flex-col items-center">
                {/* 교번 */}
                <div className="flex flex-row w-full mt-4">
                  <Input
                    className="w-[80%]"
                    label="교번"
                    type="text"
                    placeholder="교번을 입력해주세요."
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    validate={false}
                    errorMessage=""
                  />
                  <button
                    className={`w-[20%] h-9 ${isTeacherIdValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'} text-xs text-white rounded-[6px] mt-8 ml-2`}
                    disabled={!isTeacherIdValid}
                  >
                    교번 인증
                  </button>
                </div>

                {/* 가입하기 버튼 */}
                <button
                  className={`w-full h-9 text-sm text-white rounded-[6px] mt-8 mb-16 ${
                    isTeacherIdValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
                  disabled={!isTeacherIdValid}
                >
                  가입하기
                </button>
              </div>
            )}

            {/* 학생/학부모 탭 */}
            {activeTab === 'Student&Parents' && (
              <div className="w-96 flex flex-col items-center">
                {/* 학번 */}
                <div className="flex flex-row w-full mt-4">
                  <Input
                    className="w-[80%]"
                    label="학번"
                    type="text"
                    placeholder="학번을 입력해주세요."
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    validate={false}
                    errorMessage=""
                  />
                  <button
                    className={`w-[20%] h-9 ${isStudentIdValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'} text-xs text-white rounded-[6px] mt-8 ml-2`}
                    disabled={!isStudentIdValid}
                  >
                    학번 인증
                  </button>
                </div>

                {/* 가입하기 버튼 */}
                <button
                  className={`w-full h-9 text-sm text-white rounded-[6px] mt-8 mb-16 ${
                    isStudentIdValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
                  disabled={!isStudentIdValid}
                >
                  가입하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
