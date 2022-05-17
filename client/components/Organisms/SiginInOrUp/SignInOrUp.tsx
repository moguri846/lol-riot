import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSnackBar from "../../../hooks/useSnackBar";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";

import * as S from "./style";
import { ISignInOrUpParameter, ISignInOrUpResponse } from "./interface/SignInOrUp.interface";

interface IProps {
  signIn?: boolean;
  signUp?: boolean;
  inputs: ISignInOrUpParameter;
  onChangeInputs: (target: string, value: string) => void;
  on로그인아니면회원가입: (body: ISignInOrUpParameter) => Promise<ISignInOrUpResponse>;
}

const SignInOrUp = ({ signIn, signUp, inputs, onChangeInputs, on로그인아니면회원가입 }: IProps) => {
  const { snackbar } = useSnackBar();
  const router = useRouter();

  const handleSubmit = async () => {
    for (const items in inputs) {
      if (!inputs[items]) {
        return;
      }
    }

    const res = await on로그인아니면회원가입(inputs);

    if (res.success) {
      router.push(signIn ? "/" : "/signIn");
    } else {
      if (typeof res.data === "string") {
        snackbar(res.data, "error");
      }
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = e.currentTarget;
    const target = currentTarget.id;
    const value = currentTarget.value;

    onChangeInputs(target, value);
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
      <Button onClick={handleSubmit}>{signIn ? "로그인" : "회원가입"}</Button>
      {signIn && (
        <>
          <p>
            <Link href="/signUp">회원가입</Link>
          </p>
          <S.OAuthButtons>
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
            >
              <img src="/assets/image/oAuth/kakao_login_medium_wide.png" alt="kakao_login_medium_wide" />
            </a>
            <a
              href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
                process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
              }&redirect_uri=${encodeURI(process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI as string)}&state=RANDOM_STATE`}
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
