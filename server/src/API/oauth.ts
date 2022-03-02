import axios from "axios";

// KAKAO
const kakaoLogin = (body: any) => {
  return axios.post("https://kauth.kakao.com/oauth/token", queryStringBody(body));
};

const kakaoReissueToken = (body: any) => {
  return axios.post("https://kauth.kakao.com/oauth/token", queryStringBody(body));
};

const kakaoMyInfo = (config: any) => {
  return axios.post("https://kapi.kakao.com/v2/user/me", {}, config);
};

const kakaoLogout = (config: any) => {
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
