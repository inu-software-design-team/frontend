import { Edit } from 'assets/icons';

import type { IdParams } from 'types';

import { DashboardContentBox } from 'layouts';

import { SelectBox } from 'components/form';
import { IconButton, Table } from 'components/ui';

const dummyGradeData = Array.from({ length: 5 }, (_, i) => {
  const randomScore = Math.floor(Math.random() * 30) + 70;

  return {
    id: crypto.randomUUID(),
    year: 2025,
    semester: 1,
    subject:
      i % 5 === 0
        ? '국어'
        : i % 5 === 1
          ? '영어'
          : i % 5 === 2
            ? '수학'
            : i % 5 === 3
              ? '사회'
              : '과학',
    score: randomScore,
    level: randomScore >= 90 ? 1 : randomScore >= 80 ? 2 : 3,
  };
}) satisfies Parameters<typeof Table>[0]['data'];

const statsFromGradeData = {
  total: {
    label: '총점',
    value: dummyGradeData.reduce((acc, cur) => acc + cur.score, 0),
  },
  avg_score: {
    label: '평균 점수',
    value:
      dummyGradeData.reduce((acc, cur) => acc + cur.score, 0) /
      dummyGradeData.length,
  },
  avg_level: {
    label: '평균 등급',
    value:
      dummyGradeData.reduce((acc, cur) => acc + cur.level, 0) /
      dummyGradeData.length,
  },
};

const optionsFromGradeData = {
  year: {
    label: '연도',
    options: [
      {
        id: crypto.randomUUID(),
        value: '전체',
      },
      ...Array.from(
        new Set(dummyGradeData.map(({ year }) => year.toString())),
      ).map(value => ({
        id: crypto.randomUUID(),
        value,
      })),
    ],
  },
  semester: {
    label: '학기',
    options: [
      {
        id: crypto.randomUUID(),
        value: '전체',
      },
      ...Array.from(
        new Set(dummyGradeData.map(({ semester }) => semester.toString())),
      ).map(value => ({
        id: crypto.randomUUID(),
        value,
      })),
    ],
  },
  subject: {
    label: '과목',
    options: [
      {
        id: crypto.randomUUID(),
        value: '전체',
      },
      ...Array.from(new Set(dummyGradeData.map(({ subject }) => subject))).map(
        value => ({
          id: crypto.randomUUID(),
          value,
        }),
      ),
    ],
  },
};

export async function generateMetadata(props: { params: IdParams }) {
  const params = await props.params;
  const { id } = params;

  return {
    id,
  };
}

export default async function Grade(props: { params: IdParams }) {
  const params = await props.params;
  const { id } = params;

  console.log(id);

  return (
    <DashboardContentBox>
      <div className="flex w-full justify-between">
        <div className="flex w-full flex-col gap-y-1">
          <strong className="text-title4">이름</strong>
          <p>{`${id[0]}학년 ${parseInt(id.substring(1, 3))}반 ${parseInt(id.substring(3))}번`}</p>
        </div>
        <IconButton
          icon={Edit}
          size="sm"
          variant="outlined"
          color="primary"
          spacing="compact"
        />
      </div>
      <div className="h-[calc(100vh-(4rem+8rem)-(2rem*2)-3.625rem-3rem)] w-full space-y-8 overflow-y-auto">
        <div className="flex w-full">
          <div className="flex items-center gap-x-2 *:w-40">
            <SelectBox size="sm" {...optionsFromGradeData.year} />
            <SelectBox size="sm" {...optionsFromGradeData.semester} />
            <SelectBox size="sm" {...optionsFromGradeData.subject} />
          </div>
        </div>
        <Table
          data={dummyGradeData}
          columns={[
            { key: 'year', label: '연도' },
            { key: 'semester', label: '학기' },
            { key: 'subject', label: '과목' },
            { key: 'score', label: '점수' },
            { key: 'level', label: '등급' },
          ]}
        />
        <div className="grid w-full grid-cols-[25rem_auto] items-center gap-4">
          <div className="bg-primary-light-hover aspect-[10/9]">차트</div>
          <ul className="w-full">
            {Object.entries(statsFromGradeData).map(
              ([key, { label, value }], index) => (
                <li key={key} className="w-full">
                  {index !== 0 && (
                    <hr className="border-primary-light-hover w-full" />
                  )}
                  <div className="flex w-full justify-between py-4">
                    <span className="text-body1">{label}</span>
                    <strong className="text-title4 text-primary">
                      {value}
                    </strong>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </DashboardContentBox>
  );
}
