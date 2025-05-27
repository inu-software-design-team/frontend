import type { Metadata } from 'next';

import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export const metadata: Metadata = {
  title: '학생부',
  description: '학생부 기본 페이지입니다.',
};

export default function StudentInfoIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS['student-info']} />;
}
