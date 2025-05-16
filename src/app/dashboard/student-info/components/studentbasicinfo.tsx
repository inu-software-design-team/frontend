'use client';

import { useState } from 'react';
import { Address, Call, CircleUser, ProfileImg } from 'assets/icons';
import { IconButton } from 'components/ui';

interface Props {
  id: string;
}

const dummyData = {
  student: {
    name: '이름',
    homeroomTeacher: 'oo 선생님',
    gender: '남자',
    socialSecurityNumber: '001122-1234567',
    contact: '010-0000-1234',
    address: '인천광역시 ○○구 ○○대로 △△아파트 123동 456호',
  },
  father: { relation: '부', contact: '010-1111-1234', name: '아버지 성함', occupation: '회사원' },
  mother: { relation: '모', contact: '010-2222-1234', name: '어머니 성함', occupation: '주부' },
  additionalFamilyMembers: [] as { relation: string; name: string; contact: string; occupation: string }[],
};


const StudentBasicInfo = ({ id }: Props) => {
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  const [student, setStudent] = useState(dummyData.student);
  const [father, setFather] = useState(dummyData.father);
  const [mother, setMother] = useState(dummyData.mother);

  const grade = id[0];
  const classNumber = parseInt(id.substring(1, 3));
  const studentNumber = parseInt(id.substring(3));

  const [editedName, setEditedName] = useState(student.name);
  const [editedGrade, setEditedGrade] = useState(grade);
  const [editedClass, setEditedClass] = useState(classNumber.toString());
  const [editedNumber, setEditedNumber] = useState(studentNumber.toString());


  const handleSavePersonalInfo = () => {
    setStudent((prev) => ({
      ...prev,
      gender: student.gender,
      socialSecurityNumber: student.socialSecurityNumber,
      contact: student.contact,
      address: student.address,
    }));
    setIsEditingPersonalInfo(false);
  };

  const handleCancelPersonalInfo = () => {
    setStudent(dummyData.student);
    setIsEditingPersonalInfo(false);
  };


  const handleSave = () => {
    setStudent((prev) => ({
      ...prev,
      name: editedName,
    }));
    setIsEditingBasicInfo(false);
  };

  const handleCancel = () => {
    setEditedName(student.name);
    setEditedGrade(grade);
    setEditedClass(classNumber.toString());
    setEditedNumber(studentNumber.toString());
    setIsEditingBasicInfo(false);
  };

  return (
    <div className="flex h-full w-full flex-row">
      {/* 프로필 */}
      <div className={`flex w-2/5 flex-col items-center rounded-[6px] bg-[#E6F0FB] p-3 ${isEditingBasicInfo ? 'h-[460px]' : 'h-[350px]'}`}>
        <IconButton
          icon={isEditingBasicInfo ? 'x' : 'edit'}
          size="xs"
          variant="outlined"
          color="primary"
          spacing="compact"
          className="ml-auto"
          onClick={() => (isEditingBasicInfo ? handleCancel() : setIsEditingBasicInfo(true))}
        />
        <div className="mt-2 h-28 w-28">
          <ProfileImg className="h-full w-full" />
        </div>

        <div className="mt-5 flex w-full flex-col items-center">
          {isEditingBasicInfo ? (
            <div className="transition-all duration-300 ease-in-out">
              <div className="flex flex-col text-xs">
                <p className="mb-1 ml-1">성명</p>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mb-2 w-50 h-8 rounded-[6px] bg-white px-2 py-1 text-start"
                />
              </div>
              <div className="flex flex-row text-xs">
                <div className="flex flex-col">
                  <p className="mb-1 ml-1">학년</p>
                  <input
                    type="text"
                    value={editedGrade}
                    onChange={(e) => setEditedGrade(e.target.value)}
                    className="mb-2 w-16 h-8 rounded-[6px] bg-white px-2 py-1 text-start ml-1"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mb-1 ml-1">반</p>
                  <input
                    type="text"
                    value={editedClass}
                    onChange={(e) => setEditedClass(e.target.value)}
                    className="mb-2 w-16 h-8 rounded-[6px] bg-white px-2 py-1 text-start ml-1"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mb-1 ml-1">번호</p>
                  <input
                    type="text"
                    value={editedNumber}
                    onChange={(e) => setEditedNumber(e.target.value)}
                    className="mb-2 w-16 h-8 rounded-[6px] bg-white px-2 py-1 text-start ml-1"
                  />
                </div>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleCancel}
                  className="w-24 h-8 rounded-[6px] border border-black bg-white px-2 py-1 text-xs"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="w-24 h-8 rounded-[6px] bg-[#FB2C36] px-2 py-1 text-white text-xs"
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <>
              <strong className="text-title5">{student.name}</strong>
              <p>{`${grade}학년 ${classNumber}반 ${studentNumber}번`}</p>
            </>
          )}
        </div>

        <div className="mt-4 flex w-full flex-col items-start">
          <p className="mb-2 text-sm">담임 선생님</p>
          <div className="mb-1 flex h-14 w-full flex-row items-center justify-start rounded-[6px] bg-white">
            <CircleUser className="mr-3 ml-3 flex h-8 w-8" />
            <p className="font-medium"> {student.homeroomTeacher} </p>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="flex w-3/5 flex-col pl-4">
        <div className="flex w-full flex-col rounded-[6px] border border-[#E6F0FB] p-4">
          <div className="flex flex-row justify-between">
            <p className="font-medium"> 인적 사항 </p>
            <IconButton
              icon={isEditingPersonalInfo ? 'x' : 'edit'}
              size="xs"
              variant="outlined"
              color="primary"
              spacing="compact"
              className="ml-auto"
              onClick={() =>
                isEditingPersonalInfo ? handleCancelPersonalInfo() : setIsEditingPersonalInfo(true)
              }
            />
          </div>
          {/* 본인 정보 */}
          <div className={`mt-5 flex flex-row justify-start ${isEditingPersonalInfo ? '' : 'gap-40'}`} >
            <div className="flex flex-col">
             <p className={`text-xs ${isEditingPersonalInfo ? 'text-black' : 'text-black/40'}`}> 성별 </p>
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={student.gender}
                  onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                  className="mb-2 w-44 h-5 rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm mt-1"
                />
              ) : (
                <p className="mt-1 text-sm text-black"> {student.gender} </p>
              )}
            </div>
            <div className="flex flex-col">
              <p className={`text-xs ${isEditingPersonalInfo ? 'ml-2 text-black' : ' text-black/40'}`}> 주민등록번호 </p>
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={student.socialSecurityNumber}
                  onChange={(e) => setStudent({ ...student, socialSecurityNumber: e.target.value })}
                  className="mb-2 w-44 h-5 rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm ml-2 mt-1" 
                />
              ) : (
                <p className="mt-1 text-sm text-black"> {student.socialSecurityNumber} </p>
              )}
            </div>
          </div>
          <div className={`flex flex-col ${isEditingPersonalInfo ? 'mt-2' : 'mt-5 '}`}>
            <p className={`text-xs ${isEditingPersonalInfo ? 'text-black' : ' text-black/40'}`}> 연락처 </p>
            <div className="mt-1 flex flex-row items-center">
              <Call className="flex h-3.5 w-3.5" />
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={student.contact}
                  onChange={(e) => setStudent({ ...student, contact: e.target.value })}
                  className="mb-1 w-[338px] h-5 rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm ml-2"
                />
              ) : (
                <p className="mt-1 ml-2 text-sm text-black"> {student.contact}</p>
              )}
            </div>
          </div>
          <div className={`flex flex-col ${isEditingPersonalInfo ? 'mt-2' : 'mt-5 '}`}>
            <p className={`text-xs ${isEditingPersonalInfo ? 'text-black' : ' text-black/40'}`}> 주소 </p>
            <div className="mt-1 flex flex-row items-center">
              <Address className="flex h-3.5 w-3.5" />
              {isEditingPersonalInfo ? (
                <input
                  type="text"
                  value={student.address}
                  onChange={(e) => setStudent({ ...student, address: e.target.value })}
                  className="mb-1 w-[338px] h-5 rounded-[6px] border border-[#E2E8F0] bg-white px-3 py-5 text-start text-sm ml-2"
                />
              ) : (
                <p className="mt-1 ml-2 text-sm text-black"> {student.address} </p>
              )}
            </div>
          </div>
          {isEditingPersonalInfo && (
            <div className="flex flex-row mt-4 mb-2 gap-3 justify-center">
              <button
                onClick={handleSavePersonalInfo}
                className="w-30 h-10 rounded-[6px] border border-black bg-white px-2 py-1 text-xs"
              >
                저장
              </button>
              <button
                onClick={handleCancelPersonalInfo}
                className="w-30 h-10 rounded-[6px] bg-[#FB2C36] text-white px-2 py-1 text-xs"
              >
                취소
              </button>
            
            </div>
          )}
        </div>

        <div className="mt-5 flex w-full flex-col rounded-[6px] border border-[#E6F0FB] p-4">
            <p className="font-medium"> 가족 관계 </p>
          {/* 부 정보 */}
          <div className="mt-5 flex flex-row justify-start gap-20" >
            <div className="mt-5 flex flex-col">
              <div className="flex flex-col">
                <p className="text-xs text-black/40"> 관계 </p>              
                  <p className="mt-1 text-sm text-black"> {father.relation} </p>
              </div>
              <div className="mt-5 flex flex-col">
                <p className="text-xs text-black/40"> 연락처 </p>
                <div className="flex flex-row items-center mt-1">
                  <Call className="flex h-3.5 w-3.5" />
                    <p className="ml-2 text-sm text-black"> {father.contact}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <div className="flex flex-col">
                <p className="text-xs text-black/40"> 성명 </p>
                  <p className="mt-1 text-sm text-black"> {father.name} </p>
              </div>
              <div className="mt-5 flex flex-col">
                <p className="text-xs text-black/40"> 직업 </p>
                  <p className="mt-1 text-sm text-black"> {father.occupation} </p>
              </div>
            </div>
          </div>

          {/* 모 정보 */}
          <div className="mt-5 h-0 w-full border-[0.5px] border-[#E6F0FB]" />
          <div className="mt-5 flex flex-row gap-20" >
            <div className="mt-5 flex flex-col">
              <div className="flex flex-col">
                <p className="text-xs text-black/40"> 관계 </p>
                <div className="mt-1 flex flex-row items-center">
                    <p className="mt-1 text-sm text-black"> {mother.relation} </p>
                </div>
              </div>
              <div className="mt-3.5 flex flex-col">
                <p className="text-xs text-black/40"> 연락처 </p>
                <div className="mt-1 flex flex-row items-center">
                  <Call className="flex h-3.5 w-3.5" />
                    <p className="ml-2 text-sm text-black"> {mother.contact}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <div className="flex flex-col">
                <p className="text-xs text-black/40"> 성명 </p>
                  <p className="mt-1 text-sm text-black"> {mother.name} </p>
              </div>
              <div className="mt-5 flex flex-col">
                <p className="text-xs text-black/40"> 직업 </p>
                  <p className="mt-1 text-sm text-black"> {mother.occupation} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBasicInfo;
