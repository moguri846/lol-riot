import axios from "axios";
import { IConfig, IReissueTokenBody, ISignInBody } from "../controllers/auth/interface/kakao.controller.interface";

// KAKAO
const kakaoLogin = (body: ISignInBody) => {
  return axios.post("https://kauth.kakao.com/oauth/token", queryStringBody(body));
};

const kakaoTokenCheck = (config: IConfig) => {
  return axios.get("https://kapi.kakao.com/v1/user/access_token_info", config);
};

const kakaoReissueToken = (body: IReissueTokenBody) => {
  return axios.post("https://kauth.kakao.com/oauth/token", queryStringBody(body));
};

const kakaoMyInfo = (config: IConfig) => {
  return axios.post("https://kapi.kakao.com/v2/user/me", {}, config);
};

const kakaoLogout = (config: IConfig) => {
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
