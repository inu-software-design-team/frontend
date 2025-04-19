'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@assets';
import { Input } from '@components';

type Role = 'Teacher' | 'Student' | 'Parents';

const dummyData: Record<Role, { id: string; name: string }[]> = {
  Teacher: [
    { id: 'T001', name: '김교사' },
    { id: 'T002', name: '이교사' },
  ],
  Student: [
    { id: 'S001', name: '홍길동' },
    { id: 'S002', name: '김철수' },
  ],
  Parents: [
    { id: 'P001', name: '박학부모' },
    { id: 'P002', name: '최학부모' },
  ],
};

export default function Auth() {
  const [activeTab, setActiveTab] = useState<Role>('Teacher');
  const [teacherId, setTeacherId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [parentsId, setParentsId] = useState('');
  const [parentsName, setParentsName] = useState('');
  const [errors, setErrors] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });

  const router = useRouter();

  const isValidUser = (role: Role, id: string, name: string): boolean => {
    const trimmedId = id.trim();
    const trimmedName = name.trim();
    return dummyData[role].some(
      user => user.id === trimmedId && user.name === trimmedName
    );
  };

  const handleSignup = () => {
    let id = '', name = '';
    let newErrors = { id: '', name: '' };

    if (activeTab === 'Teacher') {
      id = teacherId.trim();
      name = teacherName.trim();
      if (!id) newErrors.id = '교번을 입력해주세요.';
      if (!name) newErrors.name = '이름을 입력해주세요.';
    } else if (activeTab === 'Student') {
      id = studentId.trim();
      name = studentName.trim();
      if (!id) newErrors.id = '학번을 입력해주세요.';
      if (!name) newErrors.name = '이름을 입력해주세요.';
    } else {
      id = parentsId.trim();
      name = parentsName.trim();
      if (!id) newErrors.id = '자녀 학번을 입력해주세요.';
      if (!name) newErrors.name = '이름을 입력해주세요.';
    }

    if (newErrors.id || newErrors.name) {
      setErrors(newErrors);
      return;
    }

    if (!isValidUser(activeTab, id, name)) {
      setErrors({ id: '', name: '입력하신 정보가 존재하지 않습니다.' });
      return;
    }

    setErrors({ id: '', name: '' });

    router.push(
      `/auth/info?role=${activeTab}&id=${encodeURIComponent(id)}`
    );
  };

  const isFormValid = () => {
    let id = '', name = '';
    if (activeTab === 'Teacher') {
      id = teacherId.trim();
      name = teacherName.trim();
    } else if (activeTab === 'Student') {
      id = studentId.trim();
      name = studentName.trim();
    } else {
      id = parentsId.trim();
      name = parentsName.trim();
    }
    return id && name;
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
            <p className="mt-8 text-2xl font-bold">사용자 인증</p>

            <div className="mt-7 flex h-12 w-96 flex-row items-start rounded-[6px] border-[0.5px] border-[#E6F0FB] bg-white p-1">
              {(['Teacher', 'Student', 'Parents'] as Role[]).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveTab(role);
                    setErrors({ id: '', name: '' });
                  }}
                  className={`flex h-10 w-[232px] items-center justify-center rounded-[6px] p-4 text-sm font-normal transition-all ${
                    activeTab === role ? 'bg-[#E6F0FB] text-[#4B89DC]' : ''
                  }`}
                >
                  {role === 'Teacher' ? '교사' : role === 'Student' ? '학생' : '학부모'}
                </button>
              ))}
            </div>

            {/* 교사 */}
            {activeTab === 'Teacher' && (
              <div className="flex w-92 flex-col items-center">
                <Input
                  className="mt-4 w-full"
                  label="이름"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  value={teacherName}
                  onChange={e => setTeacherName(e.target.value)}
                  validate={true}
                  errorMessage={errors.name}
                />
                <Input
                  className="w-full mt-4"
                  label="교번"
                  type="text"
                  placeholder="교번을 입력해주세요."
                  value={teacherId}
                  onChange={e => setTeacherId(e.target.value)}
                  validate={true}
                  errorMessage={errors.id}
                />
                <button
                  onClick={handleSignup}
                  className={`mt-8 mb-2 h-9 w-full rounded-[6px] text-sm text-white ${
                    isFormValid() ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
                >
                  가입하기
                </button>
              </div>
            )}

            {/* 학생 */}
            {activeTab === 'Student' && (
              <div className="flex w-92 flex-col items-center">
                <Input
                  className="mt-4 w-full"
                  label="이름"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  validate={true}
                  errorMessage={errors.name}
                />
                <Input
                  className="w-full mt-4"
                  label="학번"
                  type="text"
                  placeholder="학번을 입력해주세요."
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  validate={true}
                  errorMessage={errors.id}
                />
                <button
                  onClick={handleSignup}
                  className={`mt-8 mb-2 h-9 w-full rounded-[6px] text-sm text-white ${
                    isFormValid() ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
                >
                  가입하기
                </button>
              </div>
            )}

            {/* 학부모 */}
            {activeTab === 'Parents' && (
              <div className="flex w-92 flex-col items-center">
                <Input
                  className="mt-4 w-full"
                  label="이름"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  value={parentsName}
                  onChange={e => setParentsName(e.target.value)}
                  validate={true}
                  errorMessage={errors.name}
                />
                <Input
                  className="w-full mt-4"
                  label="자녀 학번"
                  type="text"
                  placeholder="자녀의 학번을 입력해주세요."
                  value={parentsId}
                  onChange={e => setParentsId(e.target.value)}
                  validate={true}
                  errorMessage={errors.id}
                />
                <button
                  onClick={handleSignup}
                  className={`mt-8 mb-2 h-9 w-full rounded-[6px] text-sm text-white ${
                    isFormValid() ? 'bg-[#4B89DC]' : 'bg-[#4B89DC] opacity-38'
                  }`}
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
