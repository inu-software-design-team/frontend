'use client';

import { useEffect, useState } from 'react';

import { DeleteFeedBack } from 'api/teacher/feedback/deleteFeedback';
import { GetFeedBack } from 'api/teacher/feedback/getFeedback';
import { PatchFeedBack } from 'api/teacher/feedback/patchFeedback';
import { PostFeedBack } from 'api/teacher/feedback/postFeedback';
import { GetStudentInfo } from 'api/teacher/student-info/getStudentInfo';

import { Edit, Ellipsis, X } from 'assets/icons';

import { UserRole } from 'types/auth';

import { Empty } from 'components';
import { SelectBox } from 'components/form';

type FeedBack = {
  _id: string;
  teacher_id: number;
  class_id: string;
  date: string;
  category: string;
  title: string;
  content: string;
  year: number;
  semester: string;
  teacher_name: string;
  teacher_subject: string;
};

const categoryOption = ['전체', '성적', '출결', '태도'];

const FeedbackList = ({ id, role }: { id: string; role: UserRole }) => {
  const [feedback, setFeedBack] = useState<FeedBack[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<Partial<FeedBack>>({});
  const [ellipsisOpenId, setEllipsisOpenId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedYear, setSelectedYear] = useState('전체');

  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [teacherSubject, setTeacherSubject] = useState<string | null>(null);
  const yearOptions = [
    '전체',
    ...Array.from(new Set(feedback.map(fb => fb.year)))
      .sort((a, b) => b - a)
      .map(String),
  ];

  useEffect(() => {
    (async () => {
      try {
        const info = await GetStudentInfo(id);
        setTeacherName(info.class.teacher_name);
        setTeacherSubject(info.teacher_subject);

        const data: FeedBack[] = await GetFeedBack(id);
        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setFeedBack(sortedData);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    })();
  }, [id]);

  const handleDelete = async (student_id: string, _id: string) => {
    try {
      await DeleteFeedBack(student_id, _id);
      setFeedBack(prev => prev.filter(item => item._id !== _id));
      setEllipsisOpenId(null);
    } catch (err) {
      console.error('Failed to delete remark:', err);
      alert('피드백 삭제에 실패했습니다.');
    }
  };

  const handleEdit = (_id: string) => {
    const item = feedback.find(f => f._id === _id);
    if (item) {
      setEditingId(_id);
      setEditContent({
        title: item.title,
        content: item.content,
        category: item.category,
      });
    }
    setEllipsisOpenId(null);
    setIsAdding(false);
  };

  const handleSave = async (student_id: string, _id: string) => {
    try {
      await PatchFeedBack(
        student_id,
        _id,
        new Date().toISOString(),
        editContent.category || '',
        editContent.title || '',
        editContent.content || '',
      );

      const data: FeedBack[] = await GetFeedBack(id);
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setFeedBack(sortedData);
      setEditingId(null);
      setEditContent({});
    } catch (err) {
      console.error('Failed to patch remark:', err);
      alert('피드백 수정에 실패했습니다.');
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditContent({
      category: '전체',
      title: '',
      content: '',
      date: new Date().toISOString(),
      teacher_id: 0,
      teacher_name: '',
      teacher_subject: '',
    });
    setEllipsisOpenId(null);
  };

  const handleAddSave = async () => {
    try {
      const category = editContent.category || '';
      const title = editContent.title || '';
      const content = editContent.content || '';

      await PostFeedBack(id, category, title, content);

      const data: FeedBack[] = await GetFeedBack(id);
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setFeedBack(sortedData);
      setIsAdding(false);
      setEditContent({});
    } catch (err) {
      console.error('Failed to add new remark:', err);
      alert('피드백 추가에 실패했습니다.');
    }
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setEditContent({});
  };

  const handleChange = (field: keyof FeedBack, value: string) => {
    setEditContent(prev => ({ ...prev, [field]: value }));
  };

  // 필터링 처리
  const filteredFeedback = feedback.filter(fb => {
    const categoryMatch =
      selectedCategory === '전체' || fb.category === selectedCategory;
    const yearMatch =
      selectedYear === '전체' || fb.year.toString() === selectedYear;
    return categoryMatch && yearMatch;
  });

  return (
    <>
      <div className="mb-4 flex w-full items-center gap-4">
        {/* 연도 필터 */}
        <div className="flex items-center gap-2">
          <SelectBox
            size="sm"
            label="연도"
            options={yearOptions.map(year => ({
              id: year,
              value: year,
              default: year === selectedYear,
            }))}
            onChangeSelectedId={id => setSelectedYear(id)}
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="flex items-center gap-2">
          <SelectBox
            size="sm"
            label="항목"
            options={categoryOption.map(categ => ({
              id: categ,
              value: categ,
              default: categ === selectedCategory,
            }))}
            onChangeSelectedId={id => setSelectedCategory(id)}
          />
        </div>

        {/* 새 피드백 추가 버튼 */}
        {role === 'teacher' && (
          <button
            onClick={handleAddClick}
            className="ml-auto flex h-10 w-36 items-center justify-center gap-3 rounded-[6px] border bg-[#4B89DC] px-3 text-white"
          >
            <span className="mb-0.5 text-xl font-extralight"> + </span>
            <span className="text-sm"> 새 피드백 추가 </span>
          </button>
        )}
      </div>

      {/* 새 피드백 추가 폼 */}
      {role === 'teacher' && isAdding && (
        <div className="relative mt-4 flex w-full flex-col rounded-md">
          <div className="flex flex-row items-center justify-center gap-2">
            <SelectBox
              className="mb-2 w-30"
              label=""
              size="sm"
              options={categoryOption.map(categ => ({
                id: categ,
                value: categ,
                default: categ === editContent.category,
              }))}
              onChangeSelectedId={(id: string) => handleChange('category', id)}
            />
            <input
              type="text"
              className="h-10 w-full rounded-md border border-[#E2E8F0] p-2 text-sm outline-none"
              placeholder="제목"
              value={editContent.title || ''}
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>

          <textarea
            className="mb-2 h-30 w-full rounded-md border border-[#E2E8F0] p-2 text-sm outline-none"
            placeholder="내용"
            value={editContent.content || ''}
            onChange={e => handleChange('content', e.target.value)}
          />
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              onClick={handleAddSave}
              className="h-10 w-30 rounded-[6px] border border-black bg-white px-2 py-1 text-sm"
            >
              저장
            </button>
            <button
              onClick={handleAddCancel}
              className="h-10 w-30 rounded-[6px] bg-[#FB2C36] px-2 py-1 text-sm text-white"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 피드백 리스트 */}
      {filteredFeedback.length === 0 ? (
        <Empty />
      ) : (
        filteredFeedback.map(item => (
          <div
            key={item._id}
            className={`relative mt-4 flex w-full flex-col rounded-md ${
              editingId === item._id ? '' : 'border border-[#E6F0FB] p-4'
            }`}
          >
            {role === 'teacher' && editingId === item._id ? (
              <>
                <div className="mb-2 flex flex-row items-center justify-center gap-2">
                  <SelectBox
                    className="mb-2 w-30"
                    label=""
                    size="sm"
                    options={categoryOption.map(categ => ({
                      id: categ,
                      value: categ,
                      default: categ === editContent.category,
                    }))}
                    onChangeSelectedId={(id: string) =>
                      handleChange('category', id)
                    }
                  />
                  <input
                    type="text"
                    className="h-10 w-full rounded-md border border-[#E2E8F0] p-2 text-sm outline-none"
                    value={editContent.title || ''}
                    onChange={e => handleChange('title', e.target.value)}
                  />
                </div>
                <textarea
                  className="mb-2 h-24 w-full rounded-md border border-[#E2E8F0] p-2 text-sm outline-none"
                  value={editContent.content || ''}
                  onChange={e => handleChange('content', e.target.value)}
                />
                <div className="flex flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => handleSave(id, item._id)}
                    className="h-10 w-30 rounded-[6px] border border-black bg-white px-2 py-1 text-sm"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="h-10 w-30 rounded-[6px] bg-[#FB2C36] px-2 py-1 text-sm text-white"
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                {role === 'teacher' &&
                  item.teacher_name === teacherName &&
                  item.teacher_subject === teacherSubject && (
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() =>
                          setEllipsisOpenId(prev =>
                            prev === item._id ? null : item._id,
                          )
                        }
                      >
                        <Ellipsis className="h-5 w-5" />
                      </button>

                      {ellipsisOpenId === item._id && (
                        <div className="absolute right-0 z-10 mt-1 flex flex-col rounded-[6px] bg-white p-1 shadow-[0_2px_4px_rgba(0,0,0,0.38)]">
                          <button
                            onClick={() => handleEdit(item._id)}
                            className="flex w-40 items-center gap-2 rounded-md px-3 py-2 text-left text-[#4B89DC] hover:bg-[#F1F5F9]"
                          >
                            <Edit className="h-4 w-4 text-[#4B89DC]" />
                            <span className="text-sm text-[#4B89DC]">수정</span>
                          </button>
                          <button
                            onClick={() => handleDelete(id, item._id)}
                            className="flex w-40 items-center gap-2 rounded-md px-3 py-2 text-left text-[#FB2C36] hover:bg-[#F1F5F9]"
                          >
                            <X className="h-4 w-4 text-[#FB2C36]" />
                            <span className="text-sm text-[#FB2C36]">삭제</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                <div className="flex flex-row items-center text-center">
                  <p className="mr-1.5 text-[#4B89DC]">{item.category}</p>
                  <p className="text-lg font-semibold">ㆍ {item.title}</p>
                </div>
                <p className="mt-6 text-sm">{item.content}</p>
                <div className="mt-8 flex flex-row items-center text-center text-sm text-black/40">
                  <p className="mr-3">작성자</p>
                  <p className="mr-2 text-[#4B89DC]">{item.teacher_subject}</p>
                  <p className="text-black">{item.teacher_name} 선생님</p>
                  <p className="ml-auto">{item.date.slice(0, 10)}</p>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default FeedbackList;
