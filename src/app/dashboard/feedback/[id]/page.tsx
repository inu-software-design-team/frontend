'use client';

import React, { useState, useEffect } from 'react';
import { SelectBox } from 'components/form';
import { Ellipsis, Edit, X } from 'assets/icons';
import { GetFeedBack } from 'api/teacher/feedback/getFeedback';
import { PostFeedBack } from 'api/teacher/feedback/postFeedback';
import { PatchFeedBack } from 'api/teacher/feedback/patchFeedback';
import { DeleteFeedBack } from 'api/teacher/feedback/deleteFeedback';
import { StudentProfile } from 'features/students';
import { getStudent } from 'features/students';

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

export default function FeedBack({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { studentYear: string };
}) {
  
  const { id } = params;
  const { studentYear } = searchParams;
  const studentId = Number(id);

  const [feedback, setFeedBack] = useState<FeedBack[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<Partial<FeedBack>>({});
  const [ellipsisOpenId, setEllipsisOpenId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    (async () => {
      try {
        console.log('학생 학번:', id);
        const data: FeedBack[] = await GetFeedBack(id);

        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
      console.log('피드백 삭제 성공');
    } catch (err) {
      console.error('Failed to delete remark:', err);
      alert('피드백 삭제에 실패했습니다.');
    }
  };

  const handleEdit = (_id: string) => {
    const item = feedback.find(f => f._id === _id);
    if (item) {
      setEditingId(_id);
      setEditContent({ title: item.title, content: item.content, category: item.category });
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
        editContent.content || ''
      );

      const data: FeedBack[] = await GetFeedBack(id);
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <StudentProfile
          student={getStudent({ year: Number(studentYear), studentId })}
        />
      </div>

      <div className="flex flex-col overflow-y-auto">
        <div className="flex w-full h-full flex-row items-center">
          <div className="flex items-center gap-2">
            <SelectBox
              size="sm"
              label="항목"
              options={categoryOption.map(categ => ({ id: categ, value: categ }))}
              value={selectedCategory}
              onChangeSelectedId={(id: string) => setSelectedCategory(id)}
              disabled={false}
            />
          </div>
          <button
            onClick={handleAddClick}
            className="ml-auto flex items-center justify-center gap-3 w-36 h-10 rounded-[6px] border bg-[#4B89DC] px-3 text-white"
          >
            <span className="text-xl font-extralight mb-0.5"> + </span>
            <span className="text-sm"> 새 피드백 추가 </span>
          </button>
        </div>

        {isAdding && (
          <div className="relative mt-4 flex w-full flex-col rounded-md">
            <div className="flex flex-row items-center justify-center gap-2">
              <SelectBox
                className="mb-2 w-30"
                label=""
                size="sm"
                options={categoryOption.map(categ => ({ id: categ, value: categ }))}
                value={editContent.category || '전체'}
                onChangeSelectedId={(id: string) => handleChange('category', id)}
                disabled={false}
              />
              <input
                type="text"
                className="w-full h-10 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none"
                placeholder="제목"
                value={editContent.title || ''}
                onChange={e => handleChange('title', e.target.value)}
              />
            </div>

            <textarea
              className="w-full h-30 mb-2 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none"
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

        {(selectedCategory === '전체'
          ? feedback
          : feedback.filter(fb => fb.category === selectedCategory)
        ).map(item => (
          <div
            key={item._id}
            className={`relative mt-4 flex w-full flex-col rounded-md ${
              editingId === item._id ? '' : 'border border-[#E6F0FB] p-4'
            }`}
          >
            {editingId === item._id ? (
              <>
                <div className="flex flex-row items-center justify-center gap-2 mb-2">
                  <SelectBox
                    className="mb-2 w-30"
                    label=""
                    size="sm"
                    options={categoryOption.map(categ => ({ id: categ, value: categ }))}
                    value={editContent.category || ''}
                    onChangeSelectedId={(id: string) => handleChange('category', id)}
                  />
                  <input
                    type="text"
                    className="w-full h-10 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none"
                    value={editContent.title || ''}
                    onChange={e => handleChange('title', e.target.value)}
                  />
                </div>
                <textarea
                  className="w-full h-24 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none mb-2"
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
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      setEllipsisOpenId(prev => (prev === item._id ? null : item._id))
                    }
                  >
                    <Ellipsis className="w-5 h-5" />
                  </button>

                  {ellipsisOpenId === item._id && (
                    <div className="absolute right-0 mt-1 flex flex-col rounded-[6px] bg-white p-1 shadow-[0_2px_4px_rgba(0,0,0,0.38)] z-10">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="flex items-center gap-2 w-40 rounded-md px-3 py-2 text-left text-[#4B89DC] hover:bg-[#F1F5F9]"
                      >
                        <Edit className="w-4 h-4" />
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(id, item._id)}
                        className="flex items-center gap-2 w-40 rounded-md px-3 py-2 text-left text-[#FB2C36] hover:bg-[#F1F5F9]"
                      >
                        <X className="w-4 h-4" />
                        삭제
                      </button>
                    </div>
                  )}
                </div>

                  <div className="flex flex-row items-center text-center">
                <p className="mr-1.5 text-[#4B89DC]">{item.category}</p>
                <p className="text-lg font-semibold">ㆍ {item.title}</p>
              </div>
              <p className="mt-6 text-sm">{item.content}</p>
              <div className="mt-8 flex flex-row items-center text-center text-sm text-black/40">
                <p className="mr-3">작성자</p>
                <p className="text-[#4B89DC] mr-2"> {item.teacher_subject}</p>
                <p className="text-black">{item.teacher_name} 선생님</p>
                <p className="ml-auto">{item.date.slice(0, 10)}</p>
              </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
