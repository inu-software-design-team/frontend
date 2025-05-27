'use client';

import { useEffect, useState } from 'react';

import { GetStudentInfo } from 'api/teacher/student-info/getStudentInfo';
import { PatchStudentInfo } from 'api/teacher/student-info/patchStudentInfo';
import { PatchStudentName } from 'api/teacher/student-info/patchStudentName';

import { Address, Call, CircleUser, ProfileImg } from 'assets/icons';

import { IconButton } from 'components/ui';

interface Props {
  id: string;
}

const StudentBasicInfo = ({ id }: Props) => {
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  const [studentName, setStudentName] = useState('');
  const [editedName, setEditedName] = useState('');

  const [gender, setGender] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [editedRegistrationNumber, setEditedRegistrationNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [editedAddress, setEditedAddress] = useState('');

  const [homeroomTeacher, setHomeroomTeacher] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [father, setFather] = useState<any>(null);
  const [mother, setMother] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetStudentInfo(id);
        setStudentName(data.name);
        setEditedName(data.name);
        setGender(data.gender);
        setEditedGender(data.gender);
        setRegistrationNumber(data.registration_number);
        setEditedRegistrationNumber(data.registration_number);
        setPhoneNumber(data.phone);
        setEditedPhoneNumber(data.phone);
        setAddress(data.address);
        setEditedAddress(data.address);
        setHomeroomTeacher(data.class.teacher_name);
        setTeacherSubject(data.teacher_subject);
        setGrade(String(data.class.grade));
        setClassNumber(String(data.class.class));
        setStudentNumber(String(data.student_id));

        if (data.parents?.length >= 2) {
          setFather(data.parents[0]);
          setMother(data.parents[1]);
        }
      } catch (error) {
        console.error('학생 정보 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    try {
      await PatchStudentName(id, editedName);
      setStudentName(editedName);
      setIsEditingBasicInfo(false);
    } catch (error) {
      console.error('이름 수정 실패:', error);
      alert('이름 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    setEditedName(studentName);
    setIsEditingBasicInfo(false);
  };

  const handleSavePersonalInfo = async () => {
    try {
      await PatchStudentInfo(
        id,
        editedGender,
        editedRegistrationNumber,
        editedPhoneNumber,
        editedAddress,
      );
      setGender(editedGender);
      setPhoneNumber(editedPhoneNumber);
      setRegistrationNumber(editedRegistrationNumber);
      setAddress(editedAddress);
      setIsEditingPersonalInfo(false);
    } catch (error) {
      console.error('학생 정보 수정 실패:', error);
      alert('학생 정보 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelPersonalInfo = () => {
    setIsEditingPersonalInfo(false);
  };

  return (
    <div className="flex h-full w-full flex-row">
      {/* 프로필 */}
      <div
        className={`flex w-3/7 flex-col items-center rounded-[6px] bg-[#E6F0FB] p-3 ${isEditingBasicInfo ? 'h-[490px]' : 'h-[380px]'}`}
      >
        <IconButton
          icon={isEditingBasicInfo ? 'x' : 'edit'}
          size="xs"
          variant="outlined"
          color="primary"
          spacing="compact"
          className="ml-auto"
          onClick={() =>
            isEditingBasicInfo ? handleCancel() : setIsEditingBasicInfo(true)
          }
        />
        <div className="mt-2 h-28 w-28">
          <ProfileImg className="h-full w-full" />
        </div>

        <div className="mt-5 flex w-full flex-col items-center">
          {isEditingBasicInfo ? (
            <div className="transition-all duration-300 ease-in-out">
              <div className="flex flex-col text-sm">
                <p className="mb-1 ml-1">성명</p>
                <input
                  type="text"
                  value={editedName}
                  onChange={e => setEditedName(e.target.value)}
                  className="mb-2 h-9 w-[257px] rounded-[6px] bg-white px-3 py-1 text-start outline-none"
                />
              </div>

              <div className="flex flex-row text-sm">
                <div className="flex flex-col">
                  <p className="mb-1 ml-1">학년</p>
                  <p className="mb-2 ml-1.5 h-8 w-20 rounded-[6px] border-[0.9px] border-black px-2 py-1 text-start">
                    {grade}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="mb-1 ml-1">반</p>
                  <p className="mb-2 ml-1.5 h-8 w-20 rounded-[6px] border-[0.9px] border-black px-2 py-1 text-start">
                    {classNumber}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="mb-1 ml-1">ID</p>
                  <p className="mb-2 ml-1.5 h-8 w-20 rounded-[6px] border-[0.9px] border-black px-2 py-1 text-start">
                    {studentNumber}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-row items-center justify-center gap-2">
                <button
                  onClick={handleSave}
                  className="h-10 w-30.5 rounded-[6px] border border-black bg-white px-2 py-1 text-xs"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="h-10 w-30.5 rounded-[6px] bg-[#FB2C36] px-2 py-1 text-xs text-white"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <strong className="text-title5">{studentName}</strong>
                <div className="mt-1 flex flex-row">
                  <p className="mb-1 ml-1">{grade}학년</p>
                  <p className="mb-1 ml-1">{classNumber}반</p>
                </div>
                <p className="mb-2 ml-1">ID: {studentNumber}</p>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex w-full flex-col items-start">
          <p className="mb-2 text-sm">담임 선생님</p>
          <div className="mb-1 flex h-14 w-full flex-row items-center justify-start rounded-[6px] bg-white">
            <CircleUser className="mr-3 ml-3 flex h-8 w-8" />
            <p className="font-medium">{homeroomTeacher} 선생님</p>
            <p className="mt-0.5 ml-2.5 text-xs text-[#4B89DC]">
              과목: {teacherSubject}
            </p>
          </div>
        </div>
      </div>

      {/* 인적 사항 및 가족 정보 */}
      <div className="flex w-4/7 flex-col pl-4">
        {/* 인적 사항 */}
        <div className="flex w-full flex-col rounded-[6px] border border-[#E6F0FB] p-6">
          <div className="flex flex-row justify-between">
            <p className="mr-2 text-xs text-[17px] font-light"> 인적 사항 </p>
            <IconButton
              icon={isEditingPersonalInfo ? 'x' : 'edit'}
              size="xs"
              variant="outlined"
              color="primary"
              spacing="compact"
              className="ml-auto"
              onClick={() =>
                isEditingPersonalInfo
                  ? handleCancelPersonalInfo()
                  : setIsEditingPersonalInfo(true)
              }
            />
          </div>

          {/* 성별, 주민등록번호 */}
          <div
            className={`mt-6 ml-1 flex flex-row justify-start ${isEditingPersonalInfo ? 'gap-12' : 'gap-52'}`}
          >
            <div className="flex flex-col">
              <p
                className={`text-xs ${isEditingPersonalInfo ? 'text-black' : 'text-black/40'}`}
              >
                성별
              </p>
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={editedGender}
                  onChange={e => setEditedGender(e.target.value)}
                  className="mt-2 mb-2 h-5 w-44 rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm outline-none"
                />
              ) : (
                <p className="mt-2 text-sm text-black">{gender}</p>
              )}
            </div>
            <div className="flex flex-col">
              <p
                className={`text-xs ${isEditingPersonalInfo ? 'ml-2 text-black' : 'text-black/40'}`}
              >
                주민등록번호
              </p>
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={editedRegistrationNumber}
                  onChange={e => setEditedRegistrationNumber(e.target.value)}
                  className="mt-2 mb-2 ml-2 h-5 w-44 rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm outline-none"
                />
              ) : (
                <p className="mt-2 text-sm text-black">{registrationNumber}</p>
              )}
            </div>
          </div>

          {/* 연락처, 주소 */}
          <div
            className={`ml-1 flex flex-col ${isEditingPersonalInfo ? 'mt-2' : 'mt-5'}`}
          >
            <p
              className={`text-xs ${isEditingPersonalInfo ? 'text-black' : 'text-black/40'}`}
            >
              연락처
            </p>
            <div className="mt-2 flex flex-row items-center">
              <Call className="flex h-3.5 w-3.5" />
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={editedPhoneNumber}
                  onChange={e => setEditedPhoneNumber(e.target.value)}
                  className="ml-3 h-5 w-[386px] rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm outline-none"
                />
              ) : (
                <p className="ml-3 text-sm text-black">{phoneNumber}</p>
              )}
            </div>
          </div>

          <div
            className={`ml-1 flex flex-col ${isEditingPersonalInfo ? 'mt-2' : 'mt-5'}`}
          >
            <p
              className={`text-xs ${isEditingPersonalInfo ? 'text-black' : 'text-black/40'}`}
            >
              주소
            </p>
            <div className="mt-2 flex flex-row items-center">
              <Address className="flex h-3.5 w-3.5" />
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={editedAddress}
                  onChange={e => setEditedAddress(e.target.value)}
                  className="ml-3 h-5 w-[386px] rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm outline-none"
                />
              ) : (
                <p className="ml-3 text-sm text-black">{address}</p>
              )}
            </div>
          </div>

          {isEditingPersonalInfo && (
            <div className="mt-4 mb-2 flex flex-row justify-center gap-3">
              <button
                onClick={handleSavePersonalInfo}
                className="h-10 w-30 rounded-[6px] border border-black bg-white px-2 py-1 text-xs"
              >
                저장
              </button>
              <button
                onClick={handleCancelPersonalInfo}
                className="h-10 w-30 rounded-[6px] bg-[#FB2C36] px-2 py-1 text-xs text-white"
              >
                취소
              </button>
            </div>
          )}
        </div>

        {/* 가족 관계 */}
        <div className="mt-5 flex w-full flex-col rounded-[6px] border border-[#E6F0FB] px-8 py-6">
          <p className="text-[17px] font-medium">가족 관계</p>
          {[father, mother].map(
            (parent, index) =>
              parent && (
                <div key={index}>
                  <div className="mt-6 ml-1 flex flex-row justify-start gap-32">
                    <div className="flex flex-col">
                      <p className="text-xs text-black/40">관계</p>
                      <p className="mt-2 text-sm text-black">
                        {index === 0 ? '부' : '모'}
                      </p>
                      <p className="mt-5 text-xs text-black/40">연락처</p>
                      <div className="mt-2 flex flex-row items-center">
                        <Call className="flex h-3.5 w-3.5" />
                        <p className="ml-3 text-sm text-black">
                          {parent.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-black/40">성명</p>
                      <p className="mt-2 text-sm text-black">{parent.name}</p>
                      <p className="mt-4.5 text-xs text-black/40">직업</p>
                      <p className="mt-2 text-sm text-black">
                        {parent.occupation}
                      </p>
                    </div>
                  </div>
                  {/* 부와 모 사이에만 구분선 넣기 */}
                  {index === 0 && (
                    <div className="mt-5 h-px w-full bg-[#E6F0FB]" />
                  )}
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentBasicInfo;
