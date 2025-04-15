import { useState } from 'react';
import Logo from '../assets/Logo.svg?react';
import LoginBtn2 from '../assets/LoginBtn2.svg?react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

interface TeacherData {
  email: string;
  password: string;
  confirmPassword: string;
  authCode: string;
  teacherId: string;
  isEmailAuthenticated: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
  teacherIdValid: boolean;
}

interface StudentData {
  email: string;
  password: string;
  confirmPassword: string;
  authCode: string;
  isEmailAuthenticated: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
}

type FormData = {
  teacher: TeacherData;
  student: StudentData;
};

export default function Signup() {
  const [activeTab, setActiveTab] = useState<string>('Teacher');
  const navigate = useNavigate();

  // formData 객체의 타입을 명시적으로 지정하여 인덱스 접근 오류를 해결
  const [formData, setFormData] = useState<FormData>({
    teacher: {
      email: '',
      password: '',
      confirmPassword: '',
      authCode: '',
      teacherId: '',
      isEmailAuthenticated: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      teacherIdValid: false,
    },
    student: {
      email: '',
      password: '',
      confirmPassword: '',
      authCode: '',
      isEmailAuthenticated: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const value = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValid = emailPattern.test(value);

    setFormData((prevData) => {
      const updatedTabData = { ...prevData[tab as keyof FormData], email: value, emailValid };
      return { ...prevData, [tab]: updatedTabData };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const value = e.target.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const passwordValid = passwordPattern.test(value);

    setFormData((prevData) => {
      const updatedTabData = { ...prevData[tab as keyof FormData], password: value, passwordValid };
      return { ...prevData, [tab]: updatedTabData };
    });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const value = e.target.value;
    const confirmPasswordValid = value === formData[tab as keyof FormData].password;

    setFormData((prevData) => {
      const updatedTabData = { ...prevData[tab as keyof FormData], confirmPassword: value, confirmPasswordValid };
      return { ...prevData, [tab]: updatedTabData };
    });
  };

  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const updatedTabData = { ...prevData[tab as keyof FormData], authCode: value };
      return { ...prevData, [tab]: updatedTabData };
    });
  };

  const handleEmailAuthClick = (tab: string) => {
    setFormData((prevData) => {
      const updatedTabData = { ...prevData[tab as keyof FormData], isEmailAuthenticated: true };
      return { ...prevData, [tab]: updatedTabData };
    });
  };

  const isTeacherValid =
    formData.teacher.emailValid &&
    formData.teacher.passwordValid &&
    formData.teacher.confirmPasswordValid &&
    formData.teacher.isEmailAuthenticated &&
    formData.teacher.teacherIdValid;

  const isStudentValid =
    formData.student.emailValid &&
    formData.student.passwordValid &&
    formData.student.confirmPasswordValid &&
    formData.student.isEmailAuthenticated;

  const isEmailTeacherValid = formData.teacher.emailValid;
  const isEmailStudentValid = formData.student.emailValid;

  const isTeacherIdValid = formData.teacher.teacherId.trim().length > 0;

  console.log('emailValid:', formData.teacher.emailValid);
  console.log('passwordValid:', formData.teacher.passwordValid);
  console.log('confirmPasswordValid:', formData.teacher.confirmPasswordValid);
  console.log('teacherIdValid:', isTeacherIdValid);
  console.log('isTeacherValid:', isTeacherValid);
  console.log("isEmailAuthenticated:", formData.teacher.isEmailAuthenticated); // 이거 추가!!!

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      {/* 로고 */}
      <div className="w-1/2 flex flex-col items-end justify-center">
        <Logo className="w-0 md:w-80 mr-24" />
        <div className="w-0 md:w-[420px] h-0 opacity-30 border-[0.2px] border-[#121212] mt-[-20px]" />
        <LoginBtn2 className="w-0 md:w-24 mr-44 mt-10" onClick={() => navigate('/login')} />
      </div>

      {/* 회원가입 */}
      <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-center">
        <div className="drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)] rounded-[6px]">
          <div className="w-lg bg-white flex flex-col items-center h-[640px] border border-[#F1F5F9] rounded-[6px] p-4">
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

            {/* 회원가입 폼 */}
            {activeTab === 'Teacher' && (
              <div className="w-96 flex flex-col items-center">
                {/* 이메일 */}
                <div className="flex flex-col space-y-0 w-full">
                  <div className="flex flex-row w-full mt-8">
                    <Input
                      className="w-[77%]"
                      label="이메일"
                      type="email"
                      placeholder="이메일을 입력해주세요."
                      value={formData.teacher.email}
                      onChange={(e) => handleEmailChange(e, 'teacher')}
                      validate={!formData.teacher.emailValid}
                      errorMessage="유효한 이메일을 입력해주세요."
                    />
                    <button
                      className={`w-[23%] h-9 ${isEmailTeacherValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'} text-xs text-white rounded-[6px] mt-8 ml-2`}
                      disabled={!isEmailTeacherValid}
                      onClick={() => handleEmailAuthClick('teacher')}
                    >
                      이메일 인증
                    </button>
                  </div>

                  {/* 인증번호 입력 */}
                  {formData.teacher.isEmailAuthenticated && (
                    <div className="w-full flex flex-row ">
                      <Input
                        className="w-[58%]"
                        label=""
                        type="text"
                        placeholder="인증번호를 입력해주세요."
                        value={formData.teacher.authCode}
                        onChange={(e) => handleAuthCodeChange(e, 'teacher')}
                        validate={false}
                        errorMessage=""
                      />
                      <button
                        className={`w-[15%] h-9 text-xs text-white rounded-[6px] mt-2 ml-2 ${
                          formData.teacher.authCode.length === 6 ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                        }`}
                        disabled={formData.teacher.authCode.length !== 6}
                      >
                        확인
                      </button>
                    </div>
                  )}
                </div>

                {/* 비밀번호 */}
                <Input
                  className="w-full mt-4"
                  label="비밀번호"
                  type="password"
                  placeholder="영문 대 · 소문자, 숫자, 특수문자 포함 8자 이상 입력해 주세요."
                  value={formData.teacher.password}
                  onChange={(e) => handlePasswordChange(e, 'teacher')}
                  validate={!formData.teacher.passwordValid}
                  errorMessage="영문 대·소문자, 숫자, 특수문자 포함 8자 이상이어야 합니다."
                />

                {/* 비밀번호 확인 */}
                <Input
                  className="w-full mt-4"
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 확인해 주세요."
                  value={formData.teacher.confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e, 'teacher')}
                  validate={!formData.teacher.confirmPasswordValid}
                  errorMessage="비밀번호가 일치하지 않습니다."
                />

                {/* 교번 */}
                <div className="flex flex-row w-full mt-4">
                  <Input
                    className="w-[80%]"
                    label="교번"
                    type="text"
                    placeholder="교번을 입력해주세요."
                    value={formData.teacher.teacherId}
                    onChange={(e) => {
                      const value = e.target.value;
                      const isValid = value.trim().length > 0;
                      setFormData(prevData => ({
                        ...prevData,
                        teacher: {
                          ...prevData.teacher,
                          teacherId: value,
                          teacherIdValid: isValid
                        }
                      }));
                    }}
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
                    isTeacherValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
                  disabled={!isTeacherValid}
                >
                  가입하기
                </button>
              </div>
            )}

            {/* 학생/학부모 탭 */}
            {activeTab === 'Student&Parents' && (
              <div className="w-96 flex flex-col items-center">
                {/* 이메일 */}
                <div className="flex flex-row w-full mt-8">
                  <Input
                    className="w-[77%]"
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={formData.student.email}
                    onChange={(e) => handleEmailChange(e, 'student')}
                    validate={!formData.student.emailValid}
                    errorMessage="유효한 이메일을 입력해주세요."
                  />
                  <button
                    className={`w-[23%] h-9 ${isEmailStudentValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'} text-xs text-white rounded-[6px] mt-8 ml-2`}
                    disabled={!isEmailStudentValid}
                    onClick={() => handleEmailAuthClick('student')}
                  >
                    이메일 인증
                  </button>
                </div>

                {/* 인증번호 입력 */}
                {formData.student.isEmailAuthenticated && (
                  <div className="w-full flex flex-row ">
                    <Input
                      className="w-[58%]"
                      label=""
                      type="text"
                      placeholder="인증번호를 입력해주세요."
                      value={formData.student.authCode}
                      onChange={(e) => handleAuthCodeChange(e, 'student')}
                      validate={false}
                      errorMessage=""
                    />
                    <button
                      className={`w-[15%] h-9 text-xs text-white rounded-[6px] mt-2 ml-2 ${
                        formData.student.authCode.length === 6 ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                      }`}
                      disabled={formData.student.authCode.length !== 6}
                    >
                      확인
                    </button>
                  </div>
                )}

                {/* 비밀번호 */}
                <Input
                  className="w-full mt-4"
                  label="비밀번호"
                  type="password"
                  placeholder="영문 대 · 소문자, 숫자, 특수문자 포함 8자 이상 입력해 주세요."
                  value={formData.student.password}
                  onChange={(e) => handlePasswordChange(e, 'student')}
                  validate={!formData.student.passwordValid}
                  errorMessage="영문 대·소문자, 숫자, 특수문자 포함 8자 이상이어야 합니다."
                />

                {/* 비밀번호 확인 */}
                <Input
                  className="w-full mt-4"
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 확인해 주세요."
                  value={formData.student.confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e, 'student')}
                  validate={!formData.student.confirmPasswordValid}
                  errorMessage="비밀번호가 일치하지 않습니다."
                />

                {/* 가입하기 버튼 */}
                <button
                  className={`w-full h-9 text-sm text-white rounded-[6px] mt-8 mb-16 ${
                    isStudentValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
                  disabled={!isStudentValid}
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
