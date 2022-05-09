import SignInOrUp from "../components/Organisms/SiginInOrUp/SignInOrUp";
import Seo from "../components/Seo/Seo";

const SignUp = () => {
  return (
    <>
      <Seo title="SignUp" />
      <SignInOrUp signUp />
    </>
  );
};

export default SignUp;
