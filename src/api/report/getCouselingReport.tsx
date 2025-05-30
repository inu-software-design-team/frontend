import axios, { AxiosResponse } from 'axios';

import { API_PREFIX } from 'data';

export const GetCounselingReport = async (student_id: string) => {
  axios.defaults.withCredentials = true;
  try {
    const response: AxiosResponse = await axios.get(
      `${API_PREFIX.student}/counselingReport/${student_id}`,
      {
        withCredentials: true,
        responseType: 'blob', 
      },
    );

    console.log('📥상담 레포트 응답:', response);
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
