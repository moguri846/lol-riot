import SignInOrUp from "../components/Organisms/SiginInOrUp/SignInOrUp";
import Seo from "../components/Seo/Seo";

const SignIn = () => {
  return (
    <>
      <Seo title="SignIn" />
      <SignInOrUp signIn />
    </>
  );
};

export default SignIn;
