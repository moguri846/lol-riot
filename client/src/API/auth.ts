import Send from "./interceptor";
import { Methods } from "./common/methods";
import { IAuthLoginPrameter } from "../_actions/user/interface/auth.interface";
import { REFRESH_TOKEN } from "../_actions/user/constant/user.constant";

const signUp = (info: { email: string; password: string; username: string }) => {
  return Send({
    method: Methods.POST,
    url: "/auth/searchMyName/signUp",
    data: { info },
  });
};

const signIn = ({ code, state, info, type }: IAuthLoginPrameter) => {
  const body = {
    code: code || null,
    state: state || null,
    info: info || null,
  };

  return Send({
    method: Methods.POST,
    url: `/auth/${type}/signIn`,
    data: body,
  });
};

const myInfo = (type: string) => {
  return Send({
    method: Methods.GET,
    url: `/auth/${type}/myInfo`,
  });
};

const reissueToken = (type: string) => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN) as string;

  console.log("refresh_token", refresh_token);

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

export { signUp, signIn, reissueToken, myInfo, logout };
