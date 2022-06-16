import Send from "./interceptor";
import { Methods } from "./common/methods";

const REFRESH_TOKEN = "REFRESH_TOKEN";

const signUp = (data: { email: string; password: string }) => {
  return Send({
    method: Methods.POST,
    url: "/auth/searchMyName/signUp",
    data,
  });
};

const signIn = (data: { email: string; password: string }) => {
  return Send({
    method: Methods.POST,
    url: "/auth/searchMyName/signIn",
    data,
  });
};

const checkToken = (type: "searchMyName" | "kakao") => {
  return Send({
    method: Methods.GET,
    url: `/auth/${type}/checkToken`,
  });
};

const myInfo = (type: "searchMyName" | "kakao") => {
  return Send({
    method: Methods.GET,
    url: `/auth/${type}/myInfo`,
  });
};

const reissueToken = (type: string) => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN) as string;

  return Send({
    method: Methods.POST,
    url: `/auth/${type}/reissueToken`,
    data: { refresh_token },
  });
};

const logout = (type: string) => {
  return Send({
    method: Methods.POST,
    url: `/auth/${type}/logout`,
  });
};

export { signUp, signIn, checkToken, reissueToken, myInfo, logout };
