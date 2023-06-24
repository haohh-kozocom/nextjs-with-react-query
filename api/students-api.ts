import { API_PATH } from "@/configs/api-path";
import { LIMIT } from "@/constants/common";
import { Student, Students } from "@/types/student";
import axiosClient from "@/utils/axiosClient";
import { AxiosResponse } from "axios";

type PropsQuery = {
  queryKey: (string | number | undefined)[];
};

export const getListStudent = (
  page: number,
  signal: AbortSignal
): Promise<AxiosResponse<Student[]>> => {
  return axiosClient.get(API_PATH.STUDENTS, {
    params: {
      _page: page,
      _limit: LIMIT,
    },
    signal,
  });
};

export const getStudent = ({
  queryKey,
}: PropsQuery): Promise<AxiosResponse<Students>> =>
  axiosClient.get(`${API_PATH.STUDENTS}/${queryKey?.[1]}`);

export const addStudent = (
  student: Students
): Promise<AxiosResponse<Students>> =>
  axiosClient.post(API_PATH.STUDENTS, student);

export const updateStudent = (student: Students): Promise<any> =>
  axiosClient.put(`${API_PATH.STUDENTS}/${student.id}`, student);

export const deleteStudent = ({ id }: Students) =>
  axiosClient.delete<{}>(`${API_PATH.STUDENTS}/${id}`);
