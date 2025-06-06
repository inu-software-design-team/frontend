'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { USER_ROLES } from 'data';

import type { UserRole } from 'types/auth';

import { checkUserId } from 'features/auth';

import { Input } from 'components';

export default function Auth() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const kakaoId = searchParams.get('kakaoId') ?? '';

  const [activeTab, setActiveTab] = useState<UserRole>('teacher');
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

  const { replace } = useRouter();

  const handleSignup = async () => {
    replace(`${pathname}?${searchParams.toString()}&status=loading`);
    await new Promise(resolve => setTimeout(resolve, 500));

    let id = '',
      name = '';
    const newErrors = { id: '', name: '' };

    if (activeTab === 'teacher') {
      id = teacherId.trim();
      name = teacherName.trim();
      if (!id) newErrors.id = '교번을 입력해주세요.';
      if (!name) newErrors.name = '이름을 입력해주세요.';
    } else if (activeTab === 'student') {
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

    try {
      await checkUserId({
        role: activeTab,
        id: Number(id),
        name,
        kakaoId,
      });
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    }
  };

  const isFormValid = () => {
    let id = '',
      name = '';
    if (activeTab === 'teacher') {
      id = teacherId.trim();
      name = teacherName.trim();
    } else if (activeTab === 'student') {
      id = studentId.trim();
      name = studentName.trim();
    } else {
      id = parentsId.trim();
      name = parentsName.trim();
    }
    return id && name;
  };

  useEffect(() => {
    if (kakaoId.length === 0) replace('/');
  }, [kakaoId, replace]);

  return (
    <div className="flex h-[430px] w-md flex-col items-center rounded-[6px] border border-[#F1F5F9] bg-white p-4">
      <p className="mt-8 text-2xl font-bold">사용자 인증</p>

      <div className="mt-7 flex h-12 w-96 items-center rounded-[6px] border-[0.5px] border-[#E6F0FB] bg-white p-1">
        {Object.keys(USER_ROLES).map(role => {
          const userRole = role as UserRole;

          return (
            <button
              key={role}
              onClick={() => {
                setActiveTab(userRole);
                setErrors({ id: '', name: '' });
              }}
              className={`flex h-10 w-[232px] items-center justify-center rounded-[6px] p-4 text-sm font-normal transition-all ${
                activeTab === role ? 'bg-[#E6F0FB] text-[#4B89DC]' : ''
              }`}
            >
              {USER_ROLES[userRole]}
            </button>
          );
        })}
      </div>

      <div className="flex w-92 flex-col items-center">
        <Input
          className="mt-4 w-full"
          label="이름"
          type="text"
          placeholder="이름을 입력해주세요."
          value={
            activeTab === 'teacher'
              ? teacherName
              : activeTab === 'student'
                ? studentName
                : parentsName
          }
          onChange={e => {
            const name = e.target.value;

            switch (activeTab) {
              case 'teacher':
                setTeacherName(name);
                break;
              case 'student':
                setStudentName(name);
                break;
              case 'parent':
                setParentsName(name);
                break;
            }
          }}
          validate={true}
          errorMessage={errors.name}
        />
        <Input
          className="mt-4 w-full"
          label={
            activeTab === 'teacher'
              ? '교번'
              : activeTab === 'student'
                ? '학번'
                : '자녀 학번'
          }
          type="text"
          placeholder={`${
            activeTab === 'teacher'
              ? '교번'
              : activeTab === 'student'
                ? '학번'
                : '자녀의 학번'
          }을 입력해주세요.`}
          value={
            activeTab === 'teacher'
              ? teacherId
              : activeTab === 'student'
                ? studentId
                : parentsId
          }
          onChange={e => {
            const id = e.target.value;

            switch (activeTab) {
              case 'teacher':
                setTeacherId(id);
                break;
              case 'student':
                setStudentId(id);
                break;
              case 'parent':
                setParentsId(id);
                break;
            }
          }}
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
    </div>
  );
}
