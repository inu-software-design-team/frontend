import type { Metadata } from 'next';

import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export const metadata: Metadata = {
  title: '보고서',
  description: '보고서 기본 페이지입니다.',
};

export default function ReportIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS.report} />;
}
