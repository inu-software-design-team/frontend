import type { Metadata } from 'next';

import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export const metadata: Metadata = {
  title: '성적',
  description: '성적 기본 페이지입니다.',
};

export default function GradeIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS.grade} />;
}
