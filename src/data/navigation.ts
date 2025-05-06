import type { WithIconName } from 'types/ui';

type PageCategories =
  | 'grade'
  | 'student-info'
  | 'feedback'
  | 'counseling'
  | 'report';

interface NavItem extends WithIconName<'icon'> {
  path: string;
  title: string;
}

interface IntroItem extends Pick<NavItem, 'icon'> {
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', title: '홈', icon: 'home' },
  { path: '/dashboard/grade', title: '성적', icon: 'chart' },
  { path: '/dashboard/student-info', title: '학생부', icon: 'user' },
  { path: '/dashboard/feedback', title: '피드백', icon: 'comment' },
  { path: '/dashboard/counseling', title: '상담', icon: 'heart' },
  { path: '/dashboard/report', title: '보고서', icon: 'layer' },
];

export const INTRO_ITEMS: {
  [category in PageCategories]: IntroItem;
} = {
  grade: {
    icon: NAV_ITEMS[1].icon,
    description: '학생들의 노력과 성장을 기록합니다.',
  },
  'student-info': {
    icon: NAV_ITEMS[2].icon,
    description: '학생들의 학교 생활과 활동을 기록합니다.',
  },
  feedback: {
    icon: NAV_ITEMS[3].icon,
    description: '학생들에 관한 다양한 피드백을 기록합니다.',
  },
  counseling: {
    icon: NAV_ITEMS[4].icon,
    description: '학생들의 심리적 안정을 위한 상담을 기록합니다.',
  },
  report: {
    icon: NAV_ITEMS[5].icon,
    description: '학생들의 기록을 정성껏 모아 맞춤형 보고서를 제공합니다.',
  },
};
