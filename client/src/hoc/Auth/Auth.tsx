import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITokenStatus } from "../../_actions/user/interface/auth.interface";
import { myInfoOAuth, oAuthTokenCheck } from "../../_actions/user/authActions";
import useSnackBar from "../../hooks/useSnackBar";
import { RootReducerType } from "../../_reducers/rootReducer";

const auth = (SpecificComponent: React.FC, option: boolean | null) => {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { snackbar } = useSnackBar();
    const isLogin = useSelector((state: RootReducerType) => state.user.token.isLogin);

    useEffect(() => {
      const check = async () => {
        try {
          const { isLogin, message } = (await dispatch(oAuthTokenCheck())) as unknown as ITokenStatus;

          if (isLogin) {
            if (option === false) {
              navigate("/");
            }

            dispatch(myInfoOAuth());
          } else {
            if (option) {
              navigate("/signIn");
            }

            if (message === "만료된 토큰") {
              localStorage.clear();
            }
          }
        } catch (err: any) {
          snackbar(err, "error");
        }
      };
      check();
    }, [isLogin]);
    return <SpecificComponent />;
  };

  return <AuthenticationCheck />;
};

export default auth;
