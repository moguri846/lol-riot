import axios, { AxiosInstance } from "axios";
import { reissueTokenAction } from "../_actions/user/authActions";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    if (ACCESS_TOKEN) {
      config.headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    // console.log("response", response);

    return response;
  },
  async (err: any) => {
    const response = err.response;
    const status = response.status;

    if (status === 401) {
      try {
        await reissueTokenAction();
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
