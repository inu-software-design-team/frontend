import type { Metadata } from 'next';

import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export const metadata: Metadata = {
  title: '피드백',
  description: '피드백 기본 페이지입니다.',
};

export default function FeedbackIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS.feedback} />;
}
