import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginOAuth } from "../../_actions/user/authActions";
import Input from "../../components/Atoms/Input/Input";
import Button from "../../components/Atoms/Button/Button";
import { SEARCH_MY_NAME } from "../../_actions/user/constant/user.constant";
import useSnackBar from "../../hooks/useSnackBar";
import * as S from "./style";

const SignInPage = () => {
  const { snackbar } = useSnackBar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = async () => {
    if (!inputs.email || !inputs.password) {
      return;
    }

    try {
      const appendValues = { email: inputs.email, password: inputs.password };

      await dispatch(loginOAuth({ type: SEARCH_MY_NAME, info: appendValues }));

      navigate("/");
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.id;

    setInputs({
      ...inputs,
      [target]: e.currentTarget.value,
    });
  };

  return (
    <S.SignInContainer>
      <h1>signIn</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <Input onChange={handleChangeInput} id="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Input onChange={handleChangeInput} id="password" type="password" />
      </div>
      <Button onClick={handleSignIn}>로그인</Button>
      <p>
        <Link to="/signUp">회원가입</Link>
      </p>
      <S.OAuthButtons>
        <a
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}
        >
          <img src="/assets/image/oAuth/kakao_login_medium_wide.png" alt="kakao_login_medium_wide" />
        </a>
        <a
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
            process.env.REACT_APP_NAVER_CLIENT_ID
          }&redirect_uri=${encodeURI(process.env.REACT_APP_NAVER_REDIRECT_URI as string)}&state=RANDOM_STATE`}
        >
          <img src="/assets/image/oAuth/btnG_완성형.png" alt="btnG_완성형" />
        </a>
      </S.OAuthButtons>
    </S.SignInContainer>
  );
};

export default SignInPage;
