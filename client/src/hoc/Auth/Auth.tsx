import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITokenStatus } from "../../_actions/user/interface/auth.interface";
import { myInfoOAuth, oAuthTokenCheck } from "../../_actions/user/authActions";
import useSnackBar from "../../hooks/useSnackBar";

const auth = (SpecificComponent: React.FC, option: boolean | null) => {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { snackbar } = useSnackBar();

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
    }, []);
    return <SpecificComponent />;
  };

  return <AuthenticationCheck />;
};

export default auth;
