import Send from "./interceptor";
import { makeQueryString } from "./common/commonFunc";

const kakaoLogin = (code: string) => {
  const queryStringObj = {
    code,
  };
  return Send({
    method: "GET",
    url: `/oauth/kakao/kakaoLogin?${makeQueryString(queryStringObj)}`,
  });
};

const naverLogin = (code: string, state: string) => {
  const queryStringObj = {
    code,
    state,
  };
  return Send({
    method: "GET",
    url: `/oauth/naver/naverLogin?${makeQueryString(queryStringObj)}`,
  });
};

const kakaoLogout = () => {
  return Send({
    method: "GET",
    url: `/oauth/kakao/kakaoLogout`,
  });
};

const naverLogout = () => {
  return Send({
    method: "GET",
    url: `/oauth/naver/naverLogout`,
  });
};

export { kakaoLogin, naverLogin, kakaoLogout, naverLogout };
