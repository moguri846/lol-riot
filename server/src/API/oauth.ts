import axios, { AxiosResponse } from "axios";
import { ICheckTokenKakaoResponse } from "../controllers/auth/interface/kakao/CheckToken.interface";
import { IConfig } from "../controllers/auth/interface/kakao/Common.interface";
import { ILogoutKakaoResponse } from "../controllers/auth/interface/kakao/Logout.interface";
import { IMyInfoKakaoResponse } from "../controllers/auth/interface/kakao/MyInfo.interface";
import {
  IReissueTokenBody,
  IReissueTokenKakaoResponse,
} from "../controllers/auth/interface/kakao/ReissueToken.interface";
import { ISignInBody, ISignInKakaoResponse } from "../controllers/auth/interface/kakao/SignIn.interface";

// KAKAO
const kakaoLogin = (body: ISignInBody): Promise<AxiosResponse<ISignInKakaoResponse>> => {
  return axios.post("https://kauth.kakao.com/oauth/token", queryStringBody(body));
};

const kakaoTokenCheck = (config: IConfig): Promise<AxiosResponse<ICheckTokenKakaoResponse>> => {
  return axios.get("https://kapi.kakao.com/v1/user/access_token_info", config);
};

const kakaoMyInfo = (config: IConfig): Promise<AxiosResponse<IMyInfoKakaoResponse>> => {
  return axios.post("https://kapi.kakao.com/v2/user/me", {}, config);
};

const kakaoReissueToken = (body: IReissueTokenBody): Promise<AxiosResponse<IReissueTokenKakaoResponse>> => {
  return axios.post("https://kauth.kakao.com/oauth/token", queryStringBody(body));
};

const kakaoLogout = (config: IConfig): Promise<AxiosResponse<ILogoutKakaoResponse>> => {
  return axios.post(`https://kapi.kakao.com/v1/user/logout`, {}, config);
};

// NAVER
const naverlogin = (body: any) => {
  return axios.post(`https://nid.naver.com/oauth2.0/token`, queryStringBody(body));
};

const naverMyInfo = (config: any) => {
  return axios.get("https://openapi.naver.com/v1/nid/me", config);
};

const naverReissueToken = (body: any) => {
  return axios.post("https://nid.naver.com/oauth2.0/token", queryStringBody(body));
};

const naverLogout = (body: any) => {
  return axios.get(`https://nid.naver.com/oauth2.0/token?${queryStringBody(body)}`);
};

export {
  kakaoLogin,
  kakaoTokenCheck,
  kakaoReissueToken,
  kakaoMyInfo,
  kakaoLogout,
  naverlogin,
  naverMyInfo,
  naverReissueToken,
  naverLogout,
};

const queryStringBody = (body: any) => {
  return Object.keys(body)
    .map((k) => encodeURIComponent(k) + "=" + encodeURI(body[k]))
    .join("&");
};
