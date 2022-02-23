import React from "react";

const LoginPage = () => {
  return (
    <div>
      <a
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}
      >
        <img src="/assets/oAuthImage/kakao_login_medium_wide.png" alt="kakao_login_medium_wide" />
      </a>
      <a
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
          process.env.REACT_APP_NAVER_CLIENT_ID
        }&redirect_uri=${encodeURI(process.env.REACT_APP_NAVER_REDIRECT_URI as string)}&state=RANDOM_STATE`}
      >
        <img src="/assets/oAuthImage/btnG_완성형.png" alt="btnG_완성형" />
      </a>
    </div>
  );
};

export default LoginPage;
