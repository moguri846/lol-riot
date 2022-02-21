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

export { oAuthkakao, oAuthKakaoLogout };
