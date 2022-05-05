import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useSnackBar from "../../../hooks/useSnackBar";
import { loginOAuth, signUpAction } from "../../../_actions/user/authActions";
import { SEARCH_MY_NAME } from "../../../_actions/user/constant/user.constant";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";

import * as S from "./style";

interface IProps {
  signIn?: boolean;
  signUp?: boolean;
}

const SignInOrUp = ({ signIn }: IProps) => {
  const { snackbar } = useSnackBar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!inputs.email || !inputs.password) {
      return;
    }

    try {
      const appendValues = { email: inputs.email, password: inputs.password };

      if (signIn) {
        await dispatch(loginOAuth({ type: SEARCH_MY_NAME, info: appendValues }));

        navigate("/");
      } else {
        await dispatch(signUpAction(appendValues));

        navigate("/login");
      }
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
    <S.SignInOrUpContainer>
      <h1>{signIn ? "SignIn" : "SignUp"}</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <Input onChange={handleChangeInput} id="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Input onChange={handleChangeInput} id="password" type="password" />
      </div>
      <Button onClick={handleSubmit}> {signIn ? "로그인" : "회원가입"}</Button>
      {signIn && (
        <>
          <p>
            <Link to="/signUp">회원가입</Link>
          </p>
          <S.OAuthButtons>
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${
                import.meta.env.VITE_KAKAO_CLIENT_ID
              }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`}
            >
              <img src="/assets/image/oAuth/kakao_login_medium_wide.png" alt="kakao_login_medium_wide" />
            </a>
            <a
              href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
                import.meta.env.VITE_NAVER_CLIENT_ID
              }&redirect_uri=${encodeURI(import.meta.env.VITE_NAVER_REDIRECT_URI as string)}&state=RANDOM_STATE`}
            >
              <img src="/assets/image/oAuth/btnG_완성형.png" alt="btnG_완성형" />
            </a>
          </S.OAuthButtons>
        </>
      )}
    </S.SignInOrUpContainer>
  );
};

export default SignInOrUp;
