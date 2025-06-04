'use server';

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

import { API_BASE_URL } from 'data';

import type { Session, UserInfo, UserRole } from 'types/auth';

export const getCookieHeader = async (): Promise<{ Cookie: string }> => {
  return {
    Cookie: (await cookies()).toString(),
  };
};

export const getCSRFTokenHeader = async (): Promise<{
  'x-csrf-token': string;
}> => {
  return {
    'x-csrf-token': await getCSRFToken(),
  };
};

export const checkUserId = async ({
  role: activeTab,
  id,
  name,
  kakaoId,
}: {
  role: UserRole;
  id: number;
  name: string;
  kakaoId: string;
}): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/check-id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: activeTab,
      number: id,
      name,
    }),
  });
  console.log(response);

  if (!response.ok) throw new Error(response.statusText);
  const { role, linked }: { role: string; linked: number } =
    await response.json();

  redirect(
    `/auth/info?role=${role}&linked=${linked}&kakaoId=${encodeURIComponent(kakaoId)}`,
  );
};

export const registerUser = async ({
  role,
  linked,
  kakaoId,
  email,
  phone,
  address,
}: {
  role: UserRole;
  linked: number[];
  kakaoId: string;
  email: string;
  phone: string;
  address: string;
}): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role,
      linked: linked,
      kakaoId,
      email,
      phone,
      address,
    }),
  });

  if (!response.ok) throw new Error(response.statusText);
  redirect('/dashboard', RedirectType.replace);
};

export const login = async (): Promise<void> => {
  redirect(`${API_BASE_URL}/kakao/login`, RedirectType.replace);
};

export const getUserName = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: {
      ...(await getCookieHeader()),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  const { name }: { name: string } = await response.json();

  return name;
};

export const checkSession = async (): Promise<Session> => {
  const response = await fetch(`${API_BASE_URL}/session-check`, {
    headers: {
      ...(await getCookieHeader()),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  const {
    session,
  }: {
    session: Session;
  } = await response.json();

  return session;
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const { user } = await checkSession();
  return user;
};

export const getCSRFToken = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/csrf-token`, {
    headers: {
      ...(await getCookieHeader()),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  const { csrfToken }: { csrfToken: string } = await response.json();

  return csrfToken;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      ...(await getCookieHeader()),
      ...(await getCSRFTokenHeader()),
    },
  });

  if (!response.ok) throw new Error(response.statusText);
  (await cookies()).delete('connect.sid');
  redirect('/', RedirectType.replace);
};
