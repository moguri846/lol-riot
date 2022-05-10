import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "http://54.164.251.180:8080/api",
});

instance.interceptors.request.use(
  (config) => {
    // const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    // if (ACCESS_TOKEN) {
    //   config.headers = {
    //     Authorization: `Bearer ${ACCESS_TOKEN}`,
    //   };
    // }
    // console.log("config", config);

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    // console.log("response", response);

    return response;
  },
  (err: any) => Promise.reject(err)
);

export default instance;
