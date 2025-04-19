'use client';

import { useState } from 'react';

import { Logo } from 'assets';

import { Input } from 'components';

export default function Signup() {
  const [activeTab, setActiveTab] = useState<string>('Teacher');
  const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState('');

  const isTeacherIdValid = teacherId.trim().length > 0;
  const isStudentIdValid = studentId.trim().length > 0;

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      {/* 로고 */}
      <div className="flex w-1/2 flex-col items-end justify-center">
        <Logo className="mr-24 w-0 md:w-80" />
        <div className="mt-[-20px] h-0 w-0 border-[0.2px] border-[#121212] opacity-30 md:w-[420px]" />
      </div>

      {/* 회원가입 */}
      <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:items-start">
        <div className="rounded-[6px] drop-shadow-[0px_2px_3px_rgba(0,0,0,0.18)]">
          <div className="flex h-[400px] w-lg flex-col items-center rounded-[6px] border border-[#F1F5F9] bg-white p-4">
            <p className="mt-8 text-2xl font-bold">회원가입</p>

            {/* 탭 버튼 */}
            <div className="mt-7 flex h-12 w-96 flex-row items-start rounded-[6px] border-[0.5px] border-[#E6F0FB] bg-white p-1">
              <button
                onClick={() => setActiveTab('Teacher')}
                className={`flex h-10 w-[232px] items-center justify-center rounded-[6px] p-4 text-sm font-normal transition-all ${
                  activeTab === 'Teacher' ? 'bg-[#E6F0FB] text-[#4B89DC]' : ''
                }`}
              >
                교사
              </button>
              <button
                onClick={() => setActiveTab('Student&Parents')}
                className={`flex h-10 w-[232px] items-center justify-center rounded-[6px] p-4 text-sm font-normal transition-all ${
                  activeTab === 'Student&Parents'
                    ? 'bg-[#E6F0FB] text-[#4B89DC]'
                    : ''
                }`}
              >
                학생/학부모
              </button>
            </div>

            {/* 교사 탭 */}
            {activeTab === 'Teacher' && (
              <div className="flex w-96 flex-col items-center">
                {/* 교번 */}
                <div className="mt-4 flex w-full flex-row">
                  <Input
                    className="w-[80%]"
                    label="교번"
                    type="text"
                    placeholder="교번을 입력해주세요."
                    value={teacherId}
                    onChange={e => setTeacherId(e.target.value)}
                    validate={false}
                    errorMessage=""
                  />
                  <button
                    className={`h-9 w-[20%] ${isTeacherIdValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'} mt-8 ml-2 rounded-[6px] text-xs text-white`}
                    disabled={!isTeacherIdValid}
                  >
                    교번 인증
                  </button>
                </div>

                {/* 가입하기 버튼 */}
                <button
                  className={`mt-8 mb-16 h-9 w-full rounded-[6px] text-sm text-white ${
                    isTeacherIdValid
                      ? 'bg-[#4B89DC]'
                      : 'bg-[#4B89DC] opacity-38'
                  }`}
                  disabled={!isTeacherIdValid}
                >
                  가입하기
                </button>
              </div>
            )}

            {/* 학생/학부모 탭 */}
            {activeTab === 'Student&Parents' && (
              <div className="flex w-96 flex-col items-center">
                {/* 학번 */}
                <div className="mt-4 flex w-full flex-row">
                  <Input
                    className="w-[80%]"
                    label="학번"
                    type="text"
                    placeholder="학번을 입력해주세요."
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    validate={false}
                    errorMessage=""
                  />
                  <button
                    className={`h-9 w-[20%] ${isStudentIdValid ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'} mt-8 ml-2 rounded-[6px] text-xs text-white`}
                    disabled={!isStudentIdValid}
                  >
                    학번 인증
                  </button>
                </div>

                {/* 가입하기 버튼 */}
                <button
                  className={`mt-8 mb-16 h-9 w-full rounded-[6px] text-sm text-white ${
                    isStudentIdValid
                      ? 'bg-[#4B89DC]'
                      : 'bg-[#4B89DC] opacity-38'
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
