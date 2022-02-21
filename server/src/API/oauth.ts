import axios from "axios";

const oAuthkakao = (code: string) => {
  const bodyData: any = {
    grant_type: "authorization_code",
    client_id: "15b4640728c25a319b0c80171c4c1c3f",
    redirect_uri: "http://localhost:3000/oauth/kakao",
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
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=KD5PgEAABsz2g6DYyfT6&client_secret=l_DgmvOEKE&redirect_uri=${encodeURI(
      "http://localhost:3000/api/oauth/naver"
    )}&code=${code}&state=${state}`,
    {
      headers: { "X-Naver-Client-Id": "KD5PgEAABsz2g6DYyfT6", "X-Naver-Client-Secret": "l_DgmvOEKE" },
    }
  );
};

const oAuthNaverLogout = (authorization: string) => {
  return axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=KD5PgEAABsz2g6DYyfT6&client_secret=l_DgmvOEKE&access_token=${authorization}&service_provider=NAVER`
  );
};

export { oAuthkakao, oAuthKakaoLogout, oAuthNaver, oAuthNaverLogout };
