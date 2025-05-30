'use client';

import { use, useState } from 'react';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import type { CounselingItem } from 'types';
import { WithIconName } from 'types/ui';

import { getUserInfo } from 'features/auth';

import { Icon, IconButton } from 'components/ui';

import { deleteCounseling } from './action';

interface CounselingCardProps extends CounselingItem {
  userInfo: ReturnType<typeof getUserInfo>;
}

const options: (WithIconName<'icon'> & { id: string; value: string })[] = [
  {
    id: 'edit',
    value: '수정',
    icon: 'edit',
  },
  {
    id: 'remove',
    value: '삭제',
    icon: 'x',
  },
];

const CounselingCard = ({ userInfo, ...item }: CounselingCardProps) => {
  const { id: studentId }: { id: string } = useParams();
  const { replace } = useRouter();
  const userLinked = use(userInfo).linked;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-primary-light-hover w-full space-y-4 rounded-md border p-8">
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-primary">{item.topic}</span>
            <svg className="size-0.75 rounded-full">
              <circle cx={1.5} cy={1.5} r={1.5} />
            </svg>
            <strong className="text-title4 font-semibold">{item.title}</strong>
          </div>
          {userLinked.includes(item.teacherId) && (
            <div
              className="relative w-max"
              onClick={() => setIsMenuOpen(prev => !prev)}
            >
              <IconButton icon="ellipsis" size="sm" spacing="compact" />
              <ul
                className={`shadow-drop bg-default absolute top-[calc(100%+0.5rem)] right-0 z-10 w-full min-w-50 space-y-1 rounded-md p-2 transition-[translate,_opacity] ${
                  isMenuOpen
                    ? ''
                    : 'pointer-events-none translate-y-1 opacity-0'
                }`}
              >
                {options.map(({ id, icon, value }) => (
                  <li
                    key={id}
                    id={id}
                    onClick={async e => {
                      const selectedValue =
                        options.find(option => option.id === e.currentTarget.id)
                          ?.value ?? '';

                      if (!selectedValue) return;
                      if (selectedValue === options[0].value) {
                        replace(
                          `${pathname}?${searchParams.toString()}&status=edit&id=${item.id}`,
                          { scroll: false },
                        );
                      } else if (
                        confirm('해당 상담 일지를 삭제하시겠습니까?')
                      ) {
                        replace(
                          `${pathname}?${searchParams.toString()}&status=loading`,
                          { scroll: false },
                        );

                        await new Promise(resolve => setTimeout(resolve, 500));
                        await deleteCounseling({
                          id: item.id,
                          studentId: Number(studentId),
                          studentYear: Number(searchParams.get('studentYear')),
                        });
                      }
                    }}
                    className={`hover:bg-secondary flex w-full cursor-pointer items-center gap-x-4 rounded-md px-4 py-3 whitespace-pre transition-colors ${
                      id === 'edit'
                        ? 'text-primary stroke-primary'
                        : 'text-danger stroke-danger'
                    }`}
                  >
                    <Icon src={icon} />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p>{item.content}</p>
        <div className="text-body2 flex flex-wrap items-center justify-between gap-x-4 *:whitespace-nowrap">
          <div className="flex items-center gap-x-4">
            <span className="text-black-off">작성자</span>
            <span>{`${item.teacherName} 선생님`}</span>
          </div>
          <time
            dateTime={item.date.toISOString().substring(0, 10)}
            className="text-black-off"
          >
            {item.date.toISOString().substring(0, 10)}
          </time>
        </div>
      </div>
      <hr className="border-primary-light-hover w-full border-[0.5px]" />
      <div className="*:*:first:text-primary *:*:first:stroke-primary space-y-2 *:flex *:flex-wrap *:items-center *:gap-x-4 *:*:first:flex *:*:first:gap-x-2 *:*:first:whitespace-nowrap">
        {item.nextDate && (
          <div>
            <span>
              <Icon src="calendar" />
              다음 상담 예정일
            </span>

            <time className="opacity-off">
              {item.nextDate.toISOString().substring(0, 10)}
            </time>
          </div>
        )}
        {item.nextContent.length > 0 && (
          <div>
            <span>
              <Icon src="arrow_right" />
              다음 상담 계획
            </span>
            <p className="opacity-off text-pretty">{item.nextContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselingCard;
