import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/useRedux";
import { checkToken } from "../toolkit/user/tokenSlice/func/tokenSlice.func";
import { selectToken } from "../toolkit/user/tokenSlice/tokenSlice";

/**
 * option
 * true => 로그인 한 사람
 * false => 로그인 안 한 사람
 * null => 누구나
 */

const WithAuth = (Component: React.FC, option: boolean | null) => {
  const AuthenticationCheck = () => {
    const router = useRouter();

    let { isLogin } = useAppSelector(selectToken);

    useEffect(() => {
      (async () => {
        const { isLogin } = await checkToken();

        if (isLogin) {
          if (option === false) {
            router.push("/");
          }
        } else {
          if (option) {
            router.push("/signIn");
          }
        }
      })();
    }, [isLogin]);

    return <Component />;
  };
  return AuthenticationCheck;
};

export default WithAuth;
