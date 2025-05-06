'use client';

import { Address, Call, CircleUser, ProfileImg } from 'assets/icons';

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
    <div className="flex h-full w-full flex-row">
      {/* 프로필 */}
      <div className="flex w-2/5 flex-col items-center rounded-[6px] bg-[#E6F0FB] p-3">
        <IconButton
          icon="edit"
          size="xs"
          variant="outlined"
          color="primary"
          spacing="compact"
          className="ml-auto"
        />
        <div className="mt-2 h-36 w-36">
          <ProfileImg className="h-full w-full" />
        </div>

        <div className="mt-5 flex w-full flex-col items-center">
          <strong className="text-title5">{student.name}</strong>
          <p>{`${grade}학년 ${classNumber}반 ${studentNumber}번`}</p>
        </div>

        <div className="mt-4 flex w-full flex-col items-start">
          <p className="mb-2 text-sm">담임 선생님</p>
          <div className="mb-1 flex h-10 w-full flex-row items-center justify-start rounded-[6px] bg-white">
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
              icon="edit"
              size="xs"
              variant="outlined"
              color="primary"
              spacing="compact"
              className="ml-auto"
            />
          </div>
          {/* 본인 정보 */}
          <div className="mt-5 flex flex-row justify-start gap-40">
            <div className="flex flex-col">
              <p className="text-xs text-black/40"> 성별 </p>
              <p className="mt-1 text-sm text-black"> {student.gender} </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-black/40"> 주민등록번호 </p>
              <p className="mt-1 text-sm text-black">
                {' '}
                {student.socialSecurityNumber}{' '}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <p className="text-xs text-black/40"> 연락처 </p>
            <div className="mt-1 flex flex-row items-center">
              <Call className="flex h-3.5 w-3.5" />
              <p className="ml-2 text-sm text-black"> {student.contact}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <p className="text-xs text-black/40"> 주소 </p>
            <div className="mt-1 flex flex-row items-center">
              <Address className="flex h-3.5 w-3.5" />
              <p className="ml-2 text-sm text-black"> {student.address} </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col rounded-[6px] border border-[#E6F0FB] p-4">
          <div className="flex flex-row justify-between">
            <p className="font-medium"> 가족 관계 </p>
            <IconButton
              icon="edit"
              size="xs"
              variant="outlined"
              color="primary"
              spacing="compact"
              className="ml-auto"
            />
          </div>
          {/* 부 정보 */}
          <div className="flex flex-row gap-20">
            <div className="mt-5 flex flex-col">
              <div className="flex flex-col">
                <p className="text-xs text-black/40"> 관계 </p>
                <p className="mt-1 text-sm text-black"> {father.relation} </p>
              </div>

              <div className="mt-5 flex flex-col">
                <p className="text-xs text-black/40"> 연락처 </p>
                <div className="mt-1 flex flex-row items-center">
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

          <div className="mt-5 h-0 w-full border-[0.5px] border-[#E6F0FB]" />

          {/* 모 정보 */}
          <div className="flex flex-row gap-20">
            <div className="mt-5 flex flex-col">
              <div className="flex flex-col">
                <p className="text-xs text-black/40"> 관계 </p>
                <p className="mt-1 text-sm text-black"> {mother.relation} </p>
              </div>

              <div className="mt-5 flex flex-col">
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
