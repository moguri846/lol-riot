import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { riotConfig } from "../config/config";

const instance: AxiosInstance = axios.create({});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 헤더에 토큰 추가
    config.headers = {
      "X-Riot-Token": riotConfig.apiKey,
    };

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("response riot", response);

    return response;
  },
  (err) => Promise.reject(err)
);

export default instance;
