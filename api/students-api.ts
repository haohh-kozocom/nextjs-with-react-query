import { API_PATH } from "@/configs/api-path";
import { LIMIT } from "@/constants/common";
import { Student } from "@/types/student";
import axiosClient from "@/utils/axiosClient";
import { AxiosResponse } from "axios";

export const getListStudent = (
  page: string | number
): Promise<AxiosResponse<Student[]>> => {
  return axiosClient.get(API_PATH.LIST_STUDENTS, {
    params: {
      _page: page,
      _limit: LIMIT,
    },
  });
};
