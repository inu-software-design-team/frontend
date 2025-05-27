import { USER_ROLES } from 'data';

export type UserRole = keyof typeof USER_ROLES;
export interface UserInfo {
  id: string;
  role: UserRole;
  linked: number[];
}
export interface Session {
  cookie: {
    originalMaxAge: number;
    expires: string;
    secure: boolean;
    httpOnly: boolean;
    path: string;
    sameSite: string;
  };
  user: UserInfo;
}
