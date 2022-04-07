import React from "react";
import Template from "../../components/Templates/MainTemplate/MainTemplate";
import SignInOrUp from "../../components/Organisms/SiginInOrUp/SignInOrUp";

const SignUpPage = () => {
  const Content = <SignInOrUp signUp />;

  return <Template Content={Content} />;
};

export default SignUpPage;
