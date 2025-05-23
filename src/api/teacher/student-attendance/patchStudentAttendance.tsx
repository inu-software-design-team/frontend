import axios, { AxiosResponse } from "axios";

const apiUrl = 'http://localhost:4000/api/v1/users/teacher';

export const PatchStudentAttendance = async (_id: string, date: string, state: string, reason: string, file: string)
: Promise<any> => {
  axios.defaults.withCredentials = true;
  try {
    const response: AxiosResponse<any> = await axios.patch(
      `${apiUrl}/user_attendance/${_id}`,
      { date, 
        state, 
        reason,
        file
      },

      {
        withCredentials: true,
      }
    );

    console.log("📥 학생 정보 응답:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error("Error response:", status, data);
      if (status === 401) {
        console.error("401 Unauthorized: 토큰이 유효하지 않거나 만료되었습니다.");
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.href = "/";
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};
