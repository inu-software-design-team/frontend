import axios, { AxiosResponse } from 'axios';
import { API_PREFIX } from 'data';

export const GetAttendanceReport = async (student_id: string): Promise<Blob> => {
  axios.defaults.withCredentials = true;

  try {
    const response: AxiosResponse<Blob> = await axios.get(
      `${API_PREFIX.student}/attendanceReport/${student_id}`,
      {
        withCredentials: true,
        responseType: 'blob',  // 여기 반드시 설정
      }
    );

    console.log('📥 출결 레포트 응답:', response);
    return response.data;  // Blob 데이터 반환
  } catch (error) {
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
    }

    throw error;
  }
};
