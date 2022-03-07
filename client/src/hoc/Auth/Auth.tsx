import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITokenStatus } from "../../_actions/user/interface/user.interface";
import { myInfoOAuth, oAuthTokenCheck } from "../../_actions/user/userActions";

const auth = (SpecificComponent: React.FC, option: boolean | null) => {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const check = async () => {
        const { isLogin, message } = (await dispatch(oAuthTokenCheck())) as unknown as ITokenStatus;

        if (isLogin) {
          if (option === false) {
            navigate("/");
          }

          dispatch(myInfoOAuth());
        } else {
          if (option) {
            navigate("/login");
          }

          if (message === "만료된 토큰") {
            localStorage.clear();
          }
        }
      };
      check();
    }, []);
    return <SpecificComponent />;
  };

  return <AuthenticationCheck />;
};

export default auth;
