import axios from "axios";
import { kakaoConfig, naverConfig } from "../config/config";

const oAuthkakao = (code: string) => {
  const bodyData: any = {
    grant_type: "authorization_code",
    client_id: kakaoConfig.clientId,
    redirect_uri: kakaoConfig.redirectUri,
    code,
  };

  const queryStringBody = Object.keys(bodyData)
    .map((k) => encodeURIComponent(k) + "=" + encodeURI(bodyData[k]))
    .join("&");

  return axios.post(`https://kauth.kakao.com/oauth/token`, queryStringBody, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });
};

const oAuthKakaoLogout = (authorization: string) => {
  return axios.post(
    `https://kapi.kakao.com/v1/user/logout`,
    {},
    {
      headers: {
        Authorization: authorization,
        "Content-type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const oAuthNaver = (code: string, state: string) => {
  return axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${
      naverConfig.clientId
    }&client_secret=l_DgmvOEKE&redirect_uri=${encodeURI(naverConfig.redirectUri)}&code=${code}&state=${state}`,
    {
      headers: { "X-Naver-Client-Id": naverConfig.clientId, "X-Naver-Client-Secret": naverConfig.secret },
    }
  );
};

const oAuthNaverLogout = (authorization: string) => {
  return axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=KD5PgEAABsz2g6DYyfT6&client_secret=l_DgmvOEKE&access_token=${authorization}&service_provider=NAVER`
  );
};

export { oAuthkakao, oAuthKakaoLogout, oAuthNaver, oAuthNaverLogout };
