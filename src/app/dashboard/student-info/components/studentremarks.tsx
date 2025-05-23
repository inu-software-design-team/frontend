'use client';

import { useState, useEffect } from 'react';
import { SelectBox } from 'components/form';
import { Ellipsis, Edit, X } from 'assets/icons';
import { GetStudentRemarks } from 'api/teacher/student-remarks/getStudentRemarks';
import { PatchStudentRemarks } from 'api/teacher/student-remarks/patchStudentRemarks';
import { DeleteStudentRemarks } from 'api/teacher/student-remarks/deleteStudentRemarks';
import { PostStudentRemarks } from 'api/teacher/student-remarks/postStudentRemarks';
import { GetStudentInfo } from 'api/teacher/student-info/getStudentInfo';

interface Props {
  id: string;
}

type StudentRemark = {
  _id: string;
  subject: string;
  title: string;
  content: string;
  date: string;
  teacher_id: number;
  teacher_name: string;
  teacher_subject: string;
};

const subjects = ['전체', '국어', '영어', '수학', '사회', '과학'];

const StudentRemarks = ({ id }: Props) => {
  const [remarks, setRemarks] = useState<StudentRemark[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<Partial<StudentRemark>>({});
  const [ellipsisOpenId, setEllipsisOpenId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [teacherSubject, setTeacherSubject] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('전체');

  useEffect(() => {
    (async () => {
      try {
        // 학생 기본 정보에서 담임 과목 받아오기
        const info = await GetStudentInfo(id);
        setTeacherSubject(info.teacher_subject);

        // 특기사항 받아오기
        const data: StudentRemark[] = await GetStudentRemarks(id);
        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRemarks(sortedData);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    })();
  }, [id]);

  const handleDelete = async (_id: string) => {
    try {
      await DeleteStudentRemarks(_id);
      setRemarks(prev => prev.filter(item => item._id !== _id));
      setEllipsisOpenId(null);
      console.log('특기사항 삭제 성공');
    } catch (err) {
      console.error('Failed to delete remark:', err);
      alert('특기사항 삭제에 실패했습니다.');
    }
  };

  const handleEdit = (_id: string) => {
    const item = remarks.find(r => r._id === _id);
    if (item) {
      setEditingId(_id);
      setEditContent({ title: item.title, content: item.content, subject: item.subject });
    }
    setEllipsisOpenId(null);
    setIsAdding(false);
  };

  const handleSave = async (_id: string) => {
    try {
      await PatchStudentRemarks(
        _id,
        new Date().toISOString(),
        editContent.subject || '',
        editContent.title || '',
        editContent.content || ''
      );

      const data: StudentRemark[] = await GetStudentRemarks(id);
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRemarks(sortedData);

      setEditingId(null);
      setEditContent({});
    } catch (err) {
      console.error('Failed to patch remark:', err);
      alert('특기사항 수정에 실패했습니다.');
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditContent({
      subject: teacherSubject || subjects[0], // 담임 과목만 기본 선택
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
      const now = new Date().toISOString();
      const subject = editContent.subject || teacherSubject || subjects[0];
      const title = editContent.title || '';
      const content = editContent.content || '';

      await PostStudentRemarks(id, title, content, now, subject);

      const data: StudentRemark[] = await GetStudentRemarks(id);
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRemarks(sortedData);

      setIsAdding(false);
      setEditContent({});
    } catch (err) {
      console.error('Failed to add new remark:', err);
      alert('특기사항 추가에 실패했습니다.');
    }
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setEditContent({});
  };

  const handleChange = (field: keyof StudentRemark, value: string) => {
    setEditContent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-full w-full flex-row items-center">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <SelectBox
              size="sm"
              label="과목"
              options={subjects.map(subj => ({ id: subj, value: subj }))}
              value={selectedSubject}            
              onChangeSelectedId={(id: string) => setSelectedSubject(id)}
              disabled={false}
            />
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center gap-3 w-36 h-10 rounded-[6px] border bg-[#4B89DC] px-3 text-white mt-5"
          >
            <span className="text-xl font-extralight mb-0.5"> + </span>
            <span className="text-sm"> 새 특기사항 추가 </span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="relative mt-4 flex w-full flex-col rounded-md">
          <div className="flex flex-row items-center justify-center gap-2">
            <SelectBox
              className="mb-2 w-30"
              label=""
              size="sm"
              options={teacherSubject ? [{ id: teacherSubject, value: teacherSubject }] : []}
              value={teacherSubject || ''}
              onChangeSelectedId={() => {}}
              disabled={true}
            />
            <input
              type="text"
              className="w-full h-10 mb-1 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none"
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

      {(selectedSubject === '전체' ? remarks : remarks.filter(r => r.subject === selectedSubject)).map(item => (
        <div
          key={item._id}
          className={`relative mt-4 flex w-full flex-col rounded-md ${editingId === item._id ? '' : 'border border-[#E6F0FB] p-4'}`}
        >
          {editingId === item._id ? (
            <>
              <div className="flex flex-row items-center justify-center gap-2">
                <SelectBox
                  className="mb-2 w-30"
                  label=""
                  size="sm"
                  options={subjects.map(subj => ({
                    id: subj,
                    value: subj,
                    default: subj === (editContent.subject || subjects[0]),
                  }))}
                  value={editContent.subject || ''}
                  onChangeSelectedId={(id: string) => handleChange('subject', id)}
                />
                <input
                  type="text"
                  className="w-full h-10 mb-1 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none"
                  value={editContent.title || ''}
                  onChange={e => handleChange('title', e.target.value)}
                />
              </div>

              <textarea
                className="w-full h-30 mb-2 border p-2 rounded-md border-[#E2E8F0] text-sm outline-none"
                value={editContent.content || ''}
                onChange={e => handleChange('content', e.target.value)}
              />
              <div className="flex flex-row items-center justify-center gap-2">
                <button
                  onClick={() => handleSave(item._id)}
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
              {/* 작성자 teacher_subject와 담임 과목이 같을 때만 Ellipsis 버튼 보여줌 */}
              {item.teacher_subject === teacherSubject && (
                <div className="absolute right-4 top-4">
                  <button onClick={() => setEllipsisOpenId(prev => (prev === item._id ? null : item._id))}>
                    <Ellipsis className="w-5 h-5" />
                  </button>
                  {ellipsisOpenId === item._id && (
                    <div className="absolute right-0 mt-1 p-1 flex flex-col rounded-[6px] bg-white z-10 shadow-[0_2px_4px_rgba(0,0,0,0.38)]">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="flex items-center gap-2 w-40 text-left px-3 py-2 hover:bg-[#F1F5F9] rounded-md"
                      >
                        <Edit className="w-4 h-4 text-[#4B89DC]" />
                        <span className="text-sm text-[#4B89DC]">수정</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-2 w-40 text-left px-3 py-2 hover:bg-[#F1F5F9] rounded-md"
                      >
                        <X className="w-4 h-4 text-[#FB2C36]" />
                        <span className="text-sm text-[#FB2C36]">삭제</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-row items-center text-center">
                <p className="mr-1.5 text-[#4B89DC]">{item.subject}</p>
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
  );
};

export default StudentRemarks;
