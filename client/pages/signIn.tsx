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
