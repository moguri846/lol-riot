import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIKey } from "../config/apiKey";

const instance: AxiosInstance = axios.create({});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 헤더에 토큰 추가
    config.headers = {
      "X-Riot-Token": APIKey,
    };

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err) => Promise.reject(err)
);

export default instance;
