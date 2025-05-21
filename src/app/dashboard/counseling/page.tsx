import type { Metadata } from 'next';

import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export const metadata: Metadata = {
  title: '상담',
  description: '상담 기본 페이지입니다.',
};

export default function CounselingIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS.counseling} />;
}
