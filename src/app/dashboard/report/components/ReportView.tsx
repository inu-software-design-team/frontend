'use client';

import { GetAttendanceReport } from 'api/report/getAttendanceReport';
import { GetCounselingReport } from 'api/report/getCouselingReport';
import { GetFeedBackReport } from 'api/report/getFeedbackReport';
import { GetGradeReport } from 'api/report/getGradeReport';

import {
  ReportAttend,
  ReportBtn,
  ReportChart,
  ReportFeedback,
  ReportHeart,
} from 'assets/icons';

const ReportView = ({ id }: { id: string }) => {
  const handleDownload = async (
    type: 'grade' | 'counseling' | 'feedback' | 'attendance',
  ) => {
    try {
      let blob: Blob | undefined;

      switch (type) {
        case 'grade':
          blob = await GetGradeReport(id);
          break;
        case 'counseling':
          blob = await GetCounselingReport(id);
          break;
        case 'feedback':
          blob = await GetFeedBackReport(id);
          break;
        case 'attendance':
          blob = await GetAttendanceReport(id);
          break;
      }

      if (!blob) {
        throw new Error('다운로드할 데이터가 없습니다.');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const fileNameMap = {
        grade: `grade_report_${id}.pdf`,
        counseling: `counseling_report_${id}.pdf`,
        feedback: `feedback_report_${id}.pdf`,
        attendance: `attendance_report_${id}.pdf`,
      };

      link.setAttribute('download', fileNameMap[type]);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`${type} report download failed:`, error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-end gap-y-5">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex h-full flex-col gap-4 rounded-[6px] border border-[#E6F0FB] px-8 py-6">
          <div className="flex flex-row">
            <ReportChart className="h-16 w-16" />
            <div className="ml-3 flex flex-col">
              <p className="mb-1.5 text-xl font-semibold">성적 분석 보고서</p>
              <p className="text-xs">
                과목별 성적 추이와 평균 점수, 등급 등을 분석한 보고서입니다.
              </p>
            </div>
          </div>
          <ReportBtn
            className="ml-auto w-[62px] cursor-pointer"
            onClick={() => handleDownload('grade')}
          />
        </div>

        <div className="flex h-full flex-col gap-4 rounded-[6px] border border-[#E6F0FB] px-8 py-6">
          <div className="flex flex-row">
            <ReportHeart className="h-16 w-16" />
            <div className="ml-3 flex flex-col">
              <p className="mb-1.5 text-xl font-semibold">상담 내역 보고서</p>
              <p className="text-xs">
                상담 기록을 시간순으로 정리한 보고서입니다.
              </p>
            </div>
          </div>
          <ReportBtn
            className="ml-auto w-[62px] cursor-pointer"
            onClick={() => handleDownload('counseling')}
          />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-[6px] border border-[#E6F0FB] px-8 py-6">
          <div className="flex flex-row">
            <ReportFeedback className="h-16 w-16" />
            <div className="ml-3 flex flex-col">
              <p className="mb-1.5 text-xl font-semibold">피드백 요약 보고서</p>
              <p className="text-xs">
                피드백을 유형별로 분류하고 요약한 보고서입니다.
              </p>
            </div>
          </div>
          <ReportBtn
            className="ml-auto w-[62px] cursor-pointer"
            onClick={() => handleDownload('feedback')}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-[6px] border border-[#E6F0FB] px-8 py-6">
          <div className="flex flex-row">
            <ReportAttend className="h-16 w-16" />
            <div className="ml-3 flex flex-col">
              <p className="mb-1.5 text-xl font-semibold">출결 현황 보고서</p>
              <p className="text-xs">
                출석, 지각, 결석 등 출결 현황을 분석한 보고서입니다.
              </p>
            </div>
          </div>
          <ReportBtn
            className="ml-auto w-[62px] cursor-pointer"
            onClick={() => handleDownload('attendance')}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportView;
