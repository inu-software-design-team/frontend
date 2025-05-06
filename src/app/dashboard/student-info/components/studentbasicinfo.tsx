'use client';

import { Edit, CircleUser, ProfileImg, Call, Address } from 'assets/icons';
import { IconButton } from 'components/ui';

interface Props {
  id: string;
}

const dummyData = {
  student: {
    name: '이름',
    homeroomTeacher: ' oo 선생님',
    gender: '남자',
    socialSecurityNumber: '001122-1234567',
    contact: '010-0000-1234',
    address: '인천광역시 ○○구  ○○대로 △△아파트 123동 456호',
  },
  father: {
    relation: '부',
    contact: '010-1111-1234',
    name: '아버지 성함',
    occupation: '회사원',
  },
  mother: {
    relation: '모',
    contact: '010-2222-1234',
    name: '어머니 성함',
    occupation: '주부',
  },
};

const StudentBasicInfo = ({ id }: Props) => {
  const grade = id[0]; 
  const classNumber = parseInt(id.substring(1, 3)); 
  const studentNumber = parseInt(id.substring(3));

  const { student, father, mother } = dummyData;

  return (
    <div className="flex flex-row w-full h-full">
      {/* 프로필 */}
      <div className="flex flex-col w-2/5 bg-[#E6F0FB] rounded-[6px] items-center p-3">
        <IconButton
          icon={Edit}
          size="xs"
          variant="outlined"
          color="primary"
          spacing="compact"
          className="ml-auto"
        />
        <div className="w-36 h-36 mt-2">
          <ProfileImg className="w-full h-full" />
        </div>

        <div className="flex w-full flex-col items-center mt-5">
          <strong className="text-title5">{student.name}</strong>
          <p>{`${grade}학년 ${classNumber}반 ${studentNumber}번`}</p>
        </div>

        <div className="flex w-full flex-col items-start mt-4">
          <p className="mb-2 text-sm">담임 선생님</p>
          <div className="flex flex-row w-full h-10 bg-white rounded-[6px] mb-1 items-center justify-start">
            <CircleUser className="flex w-8 h-8 ml-3 mr-3" />
            <p className="font-medium"> {student.homeroomTeacher} </p>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="flex flex-col w-3/5 pl-4">
        <div className="flex flex-col w-full rounded-[6px] p-4 border border-[#E6F0FB]">
          <div className="flex flex-row justify-between">
            <p className="font-medium"> 인적 사항 </p>
            <IconButton
              icon={Edit}
              size="xs"
              variant="outlined"
              color="primary"
              spacing="compact"
              className="ml-auto"
            />
          </div>
          {/* 본인 정보 */}
          <div className="flex flex-row justify-start gap-40 mt-5">
            <div className="flex flex-col">
              <p className="text-black/40 text-xs"> 성별 </p>
              <p className="text-black text-sm mt-1"> {student.gender} </p>
            </div>
            <div className="flex flex-col">
              <p className="text-black/40 text-xs"> 주민등록번호 </p>
              <p className="text-black text-sm mt-1"> {student.socialSecurityNumber} </p>
            </div>
          </div>
          <div className="flex flex-col mt-5">
              <p className="text-black/40 text-xs"> 연락처 </p>
              <div className="flex flex-row items-center mt-1">
                <Call className="flex w-3.5 h-3.5"/>  
                <p className="text-black text-sm ml-2"> {student.contact}</p>
              </div>              
          </div>
          <div className="flex flex-col mt-5">
            <p className="text-black/40 text-xs"> 주소 </p>
            <div className="flex flex-row items-center mt-1">
                <Address className="flex w-3.5 h-3.5"/>  
                <p className="text-black text-sm ml-2"> {student.address} </p>
              </div>                
          </div>
        </div>

        <div className="flex flex-col w-full rounded-[6px] p-4 border border-[#E6F0FB] mt-5">
          <div className="flex flex-row justify-between">
            <p className="font-medium"> 가족 관계 </p>
            <IconButton
              icon={Edit}
              size="xs"
              variant="outlined"
              color="primary"
              spacing="compact"
              className="ml-auto"
            />
          </div>
          { /* 부 정보 */ }
          <div className="flex flex-row gap-20">
            <div className="flex flex-col mt-5">
              <div className="flex flex-col">
                <p className="text-black/40 text-xs"> 관계 </p>
                <p className="text-black text-sm mt-1"> {father.relation} </p>
              </div>

              <div className="flex flex-col mt-5">
                <p className="text-black/40 text-xs"> 연락처 </p>
                <div className="flex flex-row items-center mt-1">
                  <Call className="flex w-3.5 h-3.5"/>  
                  <p className="text-black text-sm ml-2"> {father.contact}</p>
                </div>    
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-col">
                <p className="text-black/40 text-xs"> 성명 </p>
                <p className="text-black text-sm mt-1"> {father.name} </p>
              </div>
  
              <div className="flex flex-col mt-5">
                <p className="text-black/40 text-xs"> 직업 </p>
                <p className="text-black text-sm mt-1"> {father.occupation} </p>
              </div>
            </div>
          </div>

          <div className="w-full h-0 border-[0.5px] border-[#E6F0FB] mt-5" />

          { /* 모 정보 */ }
          <div className="flex flex-row gap-20">
            <div className="flex flex-col mt-5">
              <div className="flex flex-col">
                <p className="text-black/40 text-xs"> 관계 </p>
                <p className="text-black text-sm mt-1"> {mother.relation} </p>
              </div>

              <div className="flex flex-col mt-5">
                <p className="text-black/40 text-xs"> 연락처 </p>
                <div className="flex flex-row items-center mt-1">
                  <Call className="flex w-3.5 h-3.5"/>  
                  <p className="text-black text-sm ml-2"> {mother.contact}</p>
                </div>    
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-col">
                <p className="text-black/40 text-xs"> 성명 </p>
                <p className="text-black text-sm mt-1"> {mother.name} </p>
              </div>
  
              <div className="flex flex-col mt-5">
                <p className="text-black/40 text-xs"> 직업 </p>
                <p className="text-black text-sm mt-1"> {mother.occupation} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBasicInfo;
