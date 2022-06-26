import Send from "./interceptor";
import { Methods } from "./common/methods";
import { AxiosResponse } from "axios";
import {
  AuthTypes,
  ICheckToken,
  ILogout,
  IMyInfo,
  IReissueToken,
  ISignIn,
  ISignInParameter,
  ISignUp,
  ISignUpParameter,
} from "./interface/auth.interface";

const REFRESH_TOKEN = "REFRESH_TOKEN";

const signUp = (data: ISignUpParameter): Promise<AxiosResponse<ISignUp>> => {
  return Send({
    method: Methods.POST,
    url: "/auth/searchMyName/signUp",
    data,
  });
};

const signIn = (data: Partial<ISignInParameter>): Promise<AxiosResponse<ISignIn>> => {
  return Send({
    method: Methods.POST,
    url: "/auth/searchMyName/signIn",
    data,
  });
};

const checkToken = (type: AuthTypes): Promise<AxiosResponse<ICheckToken>> => {
  return Send({
    method: Methods.GET,
    url: `/auth/${type}/checkToken`,
  });
};

const myInfo = (type: AuthTypes): Promise<AxiosResponse<IMyInfo>> => {
  return Send({
    method: Methods.GET,
    url: `/auth/${type}/myInfo`,
  });
};

const reissueToken = (type: AuthTypes): Promise<AxiosResponse<IReissueToken>> => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN) as string;

  return Send({
    method: Methods.POST,
    url: `/auth/${type}/reissueToken`,
    data: { refresh_token },
  });
};

const logout = (type: AuthTypes): Promise<AxiosResponse<ILogout>> => {
  return Send({
    method: Methods.POST,
    url: `/auth/${type}/logout`,
  });
};

export { signUp, signIn, checkToken, reissueToken, myInfo, logout };
