import { AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../API/auth";
import { ISignInOrUpParameter } from "../components/Organisms/SiginInOrUp/interface/SignInOrUp.interface";
import SignInOrUp from "../components/Organisms/SiginInOrUp/SignInOrUp";
import Seo from "../components/Seo/Seo";
import { saveToken } from "../toolkit/user/tokenSlice/func/tokenSlice.func";
import { ISignInResponse } from "../toolkit/user/tokenSlice/interface/tokenSlice.interface";
import WithAuth from "../hoc";
import { tokenStatusUpdate } from "../toolkit/user/tokenSlice/tokenSlice";
import { AUTH_TYPE, NON_EXISTENT_TOKEN } from "../toolkit/user/tokenSlice/constant/tokenSlice.constant";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onLogin = async (body: ISignInOrUpParameter) => {
    try {
      const {
        data: { data },
      }: AxiosResponse<{ data: ISignInResponse }> = await signIn(body);

      saveToken(data.token);

      localStorage.setItem(AUTH_TYPE, data.type);

      dispatch(tokenStatusUpdate({ type: NON_EXISTENT_TOKEN, isLogin: true, message: "유효한 토큰" }));

      return data;
    } catch (err) {
      const data = err.response.data;
      return data;
    }
  };

  const onChangeInputs = (target: string, value: string) => {
    setInputs({
      ...inputs,
      [target]: value,
    });
  };

  return (
    <>
      <Seo title="SignIn" socialtitle="로그인" socialDesc="SearchMyName 로그인하기" socialUrl="/signIn" />
      <SignInOrUp signIn on로그인아니면회원가입={onLogin} inputs={inputs} onChangeInputs={onChangeInputs} />
    </>
  );
};

export default WithAuth(SignIn, false);
