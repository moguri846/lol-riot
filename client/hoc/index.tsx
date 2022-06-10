import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { myInfoAction } from "../toolkit/user/infoSlice/infoSlice";
import { ACCESS_TOKEN, AUTH_TYPE } from "../toolkit/user/tokenSlice/constant/tokenSlice.constant";
import { tokenStatusAction } from "../toolkit/user/tokenSlice/func/tokenSlice.func";
import { ITokenStatus } from "../toolkit/user/tokenSlice/interface/tokenSlice.interface";
import { selectToken } from "../toolkit/user/tokenSlice/tokenSlice";

/**
 * option
 * true => 로그인 한 사람
 * false => 로그인 안 한 사람
 * null => 누구나
 */

const WithAuth = (Component: React.FC, option: boolean | null) => {
  const AuthenticationCheck = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { isLogin } = useAppSelector(selectToken);

    useEffect(() => {
      (async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        if (accessToken) {
          const authType = localStorage.getItem(AUTH_TYPE) as "searchMyName" | "kakao";
          const {
            payload: { isLogin },
          } = (await dispatch(tokenStatusAction(authType))) as { payload: ITokenStatus };

          if (isLogin) {
            await dispatch(myInfoAction(authType));

            if (option === false) {
              router.push("/");
            }
          } else {
            if (option) {
              router.push("/signIn");
            }
          }
        } else {
          if (option === true) {
            router.push("/signIn");
          }
        }
      })();
    }, [isLogin]);

    return <Component {...props} />;
  };
  return AuthenticationCheck;
};

export default WithAuth;
