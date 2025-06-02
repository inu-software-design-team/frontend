import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: '홈',
  description: '기본 페이지 입니다.',
};

export default function Dashboard() {

  return (
    <main className="p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">대시보드</h1>

      {/* 요약 카드 컨테이너 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {/* 출결 요약 */}
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col">
          <div className="text-3xl mb-2">🏫</div>
          <h2 className="text-lg font-semibold mb-1">이번 달 출결 요약</h2>
          <p className="text-gray-600 text-sm">결석 3, 지각 2, 조퇴 1</p>
        </div>

        {/* 상담 일정 */}
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col">
          <div className="text-3xl mb-2">🗣</div>
          <h2 className="text-lg font-semibold mb-1">최근 및 다가오는 상담</h2>
          <p className="text-gray-600 text-sm">최근 상담 8건, 다음 상담 3건</p>
        </div>

        {/* 특기사항 */}
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col">
          <div className="text-3xl mb-2">✏️</div>
          <h2 className="text-lg font-semibold mb-1">최근 특기사항 등록 수</h2>
          <p className="text-gray-600 text-sm">이번 주 7건 등록됨</p>
        </div>

        {/* 피드백 요약 */}
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col">
          <div className="text-3xl mb-2">📝</div>
          <h2 className="text-lg font-semibold mb-1">최근 피드백 요약</h2>
          <p className="text-gray-600 text-sm">신규 피드백 5건</p>
        </div>

        {/* 반 평균 성적 */}
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col">
          <div className="text-3xl mb-2">📊</div>
          <h2 className="text-lg font-semibold mb-1">반 평균 성적</h2>
          <p className="text-gray-600 text-sm">평균 85점 (국어 87, 수학 83)</p>
        </div>
      </section>

      {/* 캘린더 영역 */}
      <section className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">캘린더</h2>
  
      </section>
    </main>
  );
}

