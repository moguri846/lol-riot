import { useState } from "react";
import { signUp } from "../API/auth";
import { ISignInOrUpParameter } from "../components/Organisms/SiginInOrUp/interface/SignInOrUp.interface";
import SignInOrUp from "../components/Organisms/SiginInOrUp/SignInOrUp";
import Seo from "../components/Seo/Seo";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onSignUp = async (body: ISignInOrUpParameter) => {
    try {
      const { data } = await signUp(body);

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
      <Seo title="SignUp" socialtitle="회원가입" socialDesc="SearchMyName 회원가입하기" socialUrl="/signUp" />
      <SignInOrUp signUp on로그인아니면회원가입={onSignUp} inputs={inputs} onChangeInputs={onChangeInputs} />
    </>
  );
};

export default SignUp;
