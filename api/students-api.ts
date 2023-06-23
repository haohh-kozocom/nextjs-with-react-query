import { API_PATH } from "@/configs/api-path";
import { LIMIT } from "@/constants/common";
import { Student, Students } from "@/types/student";
import axiosClient from "@/utils/axiosClient";
import { AxiosResponse } from "axios";

export const getListStudent = (
  page: string | number
): Promise<AxiosResponse<Student[]>> => {
  return axiosClient.get(API_PATH.STUDENTS, {
    params: {
      _page: page,
      _limit: LIMIT,
    },
  });
};

export const addStudent = (student: Students): Promise<any> =>
  axiosClient.post(API_PATH.STUDENTS, student);

export const updateStudent = (student: Students): Promise<any> => {
  return axiosClient.get(API_PATH.STUDENTS, {
    params: {
      _limit: LIMIT,
    },
  });
};

// export const updateStudent = (
//   id: number | string,
//   student: Students
// ): Promise<any> => axiosClient.put(`${API_PATH.STUDENTS}/${id}`, student);
