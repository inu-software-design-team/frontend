import { Chart, Comment, Heart, Home, Layer, User } from 'assets/icons';

import type { WithIconComponent } from 'types';

interface NavItem extends WithIconComponent {
  path: string;
  title: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', title: '홈', icon: Home },
  { path: '/dashboard/grade', title: '성적', icon: Chart },
  { path: '/dashboard/student-info', title: '학생부', icon: User },
  { path: '/dashboard/feedback', title: '피드백', icon: Comment },
  { path: '/dashboard/counseling', title: '상담', icon: Heart },
  { path: '/dashboard/report', title: '보고서', icon: Layer },
];
