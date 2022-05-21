import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://server-searchmyname.herokuapp.com/api"
      : "http://localhost:5000/api",
});

instance.interceptors.request.use(
  (config) => {
    // Next.js는 CSR 전에 SSR로 동작하기 때문에 localstorage가 없어 is not defined 에러 발생
    if (typeof window !== "undefined") {
      const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
      if (ACCESS_TOKEN) {
        config.headers = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        };
      }
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
  (err: any) => Promise.reject(err)
);

export default instance;
