import { Chart, Comment, Heart, Home, Layer, User } from 'assets/icons';

import type { WithIconComponent } from 'types';

type PageCategories =
  | 'grade'
  | 'student-info'
  | 'feedback'
  | 'counseling'
  | 'report';

interface NavItem extends Required<WithIconComponent> {
  path: string;
  title: string;
}

interface IntroItem extends Pick<NavItem, 'icon'> {
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', title: '홈', icon: Home },
  { path: '/dashboard/grade', title: '성적', icon: Chart },
  { path: '/dashboard/student-info', title: '학생부', icon: User },
  { path: '/dashboard/feedback', title: '피드백', icon: Comment },
  { path: '/dashboard/counseling', title: '상담', icon: Heart },
  { path: '/dashboard/report', title: '보고서', icon: Layer },
];

export const INTRO_ITEMS: {
  [category in PageCategories]: IntroItem;
} = {
  grade: {
    icon: Chart,
    description: '학생들의 노력과 성장을 기록합니다.',
  },
  'student-info': {
    icon: User,
    description: '학생들의 학교 생활과 활동을 기록합니다.',
  },
  feedback: {
    icon: Comment,
    description: '학생들에 관한 다양한 피드백을 기록합니다.',
  },
  counseling: {
    icon: Heart,
    description: '학생들의 심리적 안정을 위한 상담을 기록합니다.',
  },
  report: {
    icon: Layer,
    description: '학생들의 기록을 정성껏 모아 맞춤형 보고서를 제공합니다.',
  },
};
