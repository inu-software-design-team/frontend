import axios, { AxiosResponse } from 'axios';

import { API_PREFIX } from 'data';

import { getCSRFTokenHeader } from 'features/auth';

export const PatchStudentRemarks = async (
  _id: string,
  date: string,
  subject: string,
  title: string,
  content: string,
) => {
  axios.defaults.withCredentials = true;
  try {
    const response: AxiosResponse = await axios.patch(
      `${API_PREFIX.teacher}/user_remark/${_id}`,
      {
        subject,
        title,
        content,
        date,
      },

      {
        withCredentials: true,
        headers: {
          ...(await getCSRFTokenHeader()),
        },
      },
    );

    console.log('📥 학생 정보 응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        console.error('Error response:', status, data);
        if (status === 401) {
          console.error(
            '401 Unauthorized: 토큰이 유효하지 않거나 만료되었습니다.',
          );
          alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
          window.location.href = '/';
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }

    throw error;
  }
};
