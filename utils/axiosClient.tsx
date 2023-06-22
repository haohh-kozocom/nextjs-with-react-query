import axios from "axios";

import { BASE_API_URL } from "@/constants/common";

const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
