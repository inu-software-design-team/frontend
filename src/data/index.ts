export * from './icon';
export * from './navigation';
export * from './student';

export const API_BASE_URL = 'http://localhost:4000/api/v1/users';
export const API_PREFIX = {
  teacher: `${API_BASE_URL}/teacher`,
  student: `${API_BASE_URL}/student`,
  parent: `${API_BASE_URL}/parent`,
} as const;

export const USER_ROLES = {
  teacher: '교사',
  student: '학생',
  parent: '학부모',
} as const;
