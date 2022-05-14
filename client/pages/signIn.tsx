import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../API/auth";
import { ISignInOrUpParameter } from "../components/Organisms/SiginInOrUp/interface/SignInOrUp.interface";
import SignInOrUp from "../components/Organisms/SiginInOrUp/SignInOrUp";
import Seo from "../components/Seo/Seo";
import { tokenStatusUpdate } from "../toolkit/user/token/tokenSlice";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onLogin = async (body: ISignInOrUpParameter) => {
    try {
      const { data } = await signIn(body);

      const ACCESS_TOKEN = "ACCESS_TOKEN";
      const ACCESS_TOKEN_EXPIRES_IN = "ACCESS_TOKEN_EXPIRES_IN";
      const REFRESH_TOKEN = "REFRESH_TOKEN";
      const REFRESH_TOKEN_EXPIRES_IN = "REFRESH_TOKEN_EXPIRES_IN";

      const saveLocalStorage = (token: any) => {
        localStorage.setItem(ACCESS_TOKEN, token.access_token);
        localStorage.setItem(ACCESS_TOKEN_EXPIRES_IN, String(moment().add(token.expires_in, "second").valueOf()));
        if (token.refresh_token) {
          localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
        }
        if (token.refresh_token_expires_in) {
          localStorage.setItem(
            REFRESH_TOKEN_EXPIRES_IN,
            String(moment().add(token.refresh_token_expires_in, "second").valueOf())
          );
        }
      };

      saveLocalStorage(data.data);

      dispatch(tokenStatusUpdate({ isLogin: true, message: "유효한 토큰" }));

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
      <Seo title="SignIn" />
      <SignInOrUp signIn on로그인아니면회원가입={onLogin} inputs={inputs} onChangeInputs={onChangeInputs} />
    </>
  );
};

export default SignIn;
