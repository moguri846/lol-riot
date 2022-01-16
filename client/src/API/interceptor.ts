import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => Promise.reject(err)
);

export default instance;
