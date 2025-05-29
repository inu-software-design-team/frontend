'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { Input } from 'components';
import { Textarea } from 'components/form';
import { Icon, IconButton, TextButton } from 'components/ui';

import {
  createCounseling,
  getCounseling,
  getOptionsForCounseling,
  updateCounseling,
} from './action';

interface ItemModalProps {
  isActive: boolean;
  studentYear: number;
  topics: Awaited<ReturnType<typeof getOptionsForCounseling>>['topic'];
  counseling: ReturnType<typeof getCounseling>;
}

const ItemModal = ({
  isActive,
  studentYear,
  topics,
  counseling,
}: ItemModalProps) => {
  const { replace } = useRouter();
  const { id }: { id: string } = useParams();
  const studentId = Number(id);
  const item = use(counseling);
  const pathname = usePathname();

  const mode = item ? 'edit' : 'create';
  const [topic, setTopic] = useState(item?.topic ?? '');
  const [date, setDate] = useState(
    item?.date ??
      new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
        ),
      ),
  );
  const [title, setTitle] = useState(item?.title ?? '');
  const [content, setContent] = useState(item?.content ?? '');
  const [nextDate, setNextDate] = useState(item?.nextDate ?? null);
  const [nextContent, setNextContent] = useState(item?.nextContent ?? '');
  const [isTopicMenuOpen, setIsTopicMenuOpen] = useState(false);

  const isValidate = useMemo(() => {
    if (mode === 'create')
      return topic.length > 0 && title.length > 0 && content.length > 0;

    return (
      topic !== item?.topic ||
      date !== item?.date ||
      title !== item?.title ||
      content !== item?.content ||
      nextDate !== item?.nextDate ||
      nextContent !== item?.nextContent
    );
  }, [item, mode, topic, date, title, content, nextDate, nextContent]);

  useEffect(() => {
    setTopic(item?.topic ?? '');
    setDate(
      item?.date ??
        new Date(
          Date.UTC(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
          ),
        ),
    );
    setTitle(item?.title ?? '');
    setContent(item?.content ?? '');
    setNextDate(item?.nextDate ?? null);
    setNextContent(item?.nextContent ?? '');
  }, [item]);

  return (
    <dialog
      ref={useCallback(
        (node: HTMLDialogElement | null) => {
          if (isActive) node?.showModal();
          else node?.close();
        },
        [isActive],
      )}
      className="bg-default backdrop:bg-black-off absoulte top-1/2 left-1/2 max-h-screen w-full max-w-[30rem] -translate-1/2 space-y-4 overflow-y-auto rounded-md p-8"
    >
      <div className="flex justify-end">
        <IconButton
          icon="x"
          size="sm"
          spacing="compact"
          onClick={() => {
            if (
              confirm(
                `상담일지 ${
                  mode === 'edit' ? '수정을' : '추가를'
                } 취소하시겠습니까?`,
              )
            )
              replace(`${pathname}?studentYear=${studentYear}`, {
                scroll: false,
              });
          }}
        />
      </div>
      <div className="space-y-8">
        <form className="**:[input]:text-body2 space-y-8 **:[input]:h-full **:[input]:px-4 **:[input]:py-3 **:[input[type='date']]:cursor-pointer">
          <div className="space-y-4">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_auto))] gap-4">
              <div
                className="relative"
                onClick={() => setIsTopicMenuOpen(prev => !prev)}
                ref={node => {
                  const ac = new AbortController();

                  function onClickOutside(event: MouseEvent) {
                    if (
                      node instanceof HTMLElement &&
                      event.target instanceof Node &&
                      !node.contains(event.target)
                    )
                      setIsTopicMenuOpen(false);
                  }

                  document.addEventListener('click', onClickOutside, ac);
                  return () => ac.abort();
                }}
              >
                <Input
                  label="항목"
                  placeholder="항목을 입력해주세요."
                  value={topic}
                  validate
                  className="*:[input]:h-12!"
                  onChange={e => setTopic(e.target.value)}
                />
                {topics.length > 0 && (
                  <ul
                    className={`shadow-drop bg-default absolute top-[calc(100%+0.5rem)] left-0 z-10 w-full min-w-50 space-y-1 rounded-md p-2 transition-[translate,_opacity] ${
                      isTopicMenuOpen &&
                      topics.some(({ value }) => value.includes(topic))
                        ? ''
                        : 'pointer-events-none translate-y-1 opacity-0'
                    }`}
                  >
                    {topics.map(({ id, value }) => (
                      <li
                        key={id}
                        id={id}
                        onClick={e => {
                          setTopic(
                            topics.find(
                              topic => topic.id === e.currentTarget.id,
                            )?.value ?? '',
                          );
                          e.stopPropagation();
                          setIsTopicMenuOpen(false);
                        }}
                        className={`hover:bg-secondary flex w-full cursor-pointer items-center justify-between gap-x-4 rounded-md px-4 py-3 whitespace-pre transition-colors ${
                          !value.includes(topic)
                            ? 'hidden'
                            : value === topic
                              ? 'bg-secondary'
                              : ''
                        }`}
                      >
                        {value}
                        <Icon
                          src="check"
                          size={16}
                          className={`stroke-current ${
                            value === topic ? '' : 'invisible'
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Input
                label="날짜"
                type="date"
                value={date.toISOString().substring(0, 10)}
                validate
                onChange={e => {
                  const dateValue = new Date(e.target.value);
                  const today = new Date(
                    Date.UTC(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate(),
                    ),
                  );

                  if (dateValue > today)
                    alert('날짜는 오늘 이전이어야 합니다.');
                  else setDate(dateValue);
                }}
              />
            </div>
            <Input
              label="제목"
              placeholder="제목을 입력해주세요."
              value={title}
              validate
              className="*:[input]:h-12!"
              onChange={e => setTitle(e.target.value)}
            />
            <Textarea
              label="내용"
              placeholder="내용을 작성해주세요."
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <hr className="border-primary-light-hover w-full border" />
          <div className="space-y-4">
            <Input
              label="다음 상담 예정일"
              type="date"
              value={nextDate?.toISOString().substring(0, 10) ?? ''}
              validate
              onChange={e => {
                if (e.target.value.length === 0) {
                  setNextDate(null);
                  return;
                }

                const nextDateValue = new Date(e.target.value);
                if (nextDateValue < date)
                  alert('다음 상담 예정일은 상담 날짜 이후여야 합니다.');
                else setNextDate(nextDateValue);
              }}
            />
            <Textarea
              label="다음 상담 계획"
              value={nextContent}
              rows={4}
              placeholder="다음 상담에서 다룰 내용이나 계획을 작성해주세요."
              onChange={e => setNextContent(e.target.value)}
            />
          </div>
        </form>
        <TextButton
          label="확인"
          status={!isValidate ? 'disabled' : 'default'}
          color="primary"
          className="w-full"
          onClick={async () => {
            if (!isValidate) return;

            if (
              !confirm(
                `상담일지를 ${mode === 'edit' ? '수정' : '추가'}하시겠습니까?`,
              )
            )
              return;

            replace(`${pathname}?studentYear=${studentYear}&status=loading`, {
              scroll: false,
            });
            await new Promise(resolve => setTimeout(resolve, 500));

            if (mode === 'create')
              await createCounseling({
                studentId,
                studentYear,
                topic,
                date,
                title,
                content,
                nextDate,
                nextContent,
              });
            else if (item)
              await updateCounseling({
                studentId,
                studentYear,
                id: item.id,
                topic,
                date,
                title,
                content,
                nextDate,
                nextContent,
              });
          }}
        />
      </div>
    </dialog>
  );
};

export default ItemModal;
