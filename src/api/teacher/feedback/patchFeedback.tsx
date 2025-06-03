import axios, { AxiosResponse } from 'axios';

import { API_PREFIX } from 'data';

import { getCSRFTokenHeader } from 'features/auth';

export const PatchFeedBack = async (
  student_id: string,
  _id: string,
  date: string,
  category: string,
  title: string,
  content: string,
) => {
  axios.defaults.withCredentials = true;
  try {
    const response: AxiosResponse = await axios.patch(
      `${API_PREFIX.teacher}/feedback/${student_id}/${_id}`,
      {
        category,
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

    console.log('📥 피드백 수정 응답:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        console.error('Error response:', status, data);
        if (status === 401) {
          alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
          window.location.href = '/';
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
