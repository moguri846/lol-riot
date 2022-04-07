import React from "react";
import Template from "../../components/Templates/MainTemplate/MainTemplate";
import SignInOrUp from "../../components/Organisms/SiginInOrUp/SignInOrUp";

const SignInPage = () => {
  const Content = <SignInOrUp signIn />;

  return <Template Content={Content} />;
};

export default SignInPage;
