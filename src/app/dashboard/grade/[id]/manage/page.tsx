import type { AsyncIdParams } from 'types';

import { IconButton, Table, TextButton } from 'components/ui';

const dummyGradeData = Array.from({ length: 5 }, (_, i) => {
  const randomScore = Math.floor(Math.random() * 30) + 70;

  return {
    id: crypto.randomUUID(),
    checkbox: <input type="checkbox" />,
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

export default async function GradeManage({
  params,
}: {
  params: AsyncIdParams;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <div className="flex w-full flex-col gap-y-12">
      <div className="flex w-full justify-between">
        <div className="flex w-full flex-col gap-y-1">
          <strong className="text-title4">이름</strong>
          <p>{`${id[0]}학년 ${parseInt(id.substring(1, 3))}반 ${parseInt(id.substring(3))}번`}</p>
        </div>
        <IconButton
          icon="x"
          size="sm"
          spacing="compact"
          href={{
            pathname: `/dashboard/grade/${id}`,
          }}
        />
      </div>
      <div className="w-full space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2">
            <TextButton
              label="수정"
              leftIcon="edit"
              variant="outlined"
              color="primary"
              spacing="compact"
            />
            <TextButton
              label="삭제"
              leftIcon="x"
              variant="outlined"
              color="danger"
              spacing="compact"
            />
          </div>
          <TextButton
            label="새 성적 데이터 추가"
            leftIcon="plus"
            color="primary"
            spacing="compact"
          />
        </div>
        <Table
          data={dummyGradeData}
          columns={[
            {
              key: 'checkbox',
              label: '',
              render: value => <div className="w-max">{value}</div>,
            },
            { key: 'year', label: '연도' },
            { key: 'semester', label: '학기' },
            { key: 'subject', label: '과목' },
            { key: 'score', label: '점수' },
            { key: 'level', label: '등급' },
          ]}
        />
      </div>
      <div className="flex w-full items-center justify-center gap-x-4 *:w-40">
        <TextButton label="저장" variant="outlined" />
        <TextButton label="취소" color="danger" />
      </div>
    </div>
  );
}
