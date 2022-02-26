import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutOAuth, oAuthTokenCheck } from "../../_actions/user/userActions";
import { RootReducerType } from "../../_reducers/rootReducer";

const auth = (SpecificComponent: React.FC, option: boolean | null) => {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootReducerType) => state.user.token);

    useEffect(() => {
      const check = async () => {
        await dispatch(oAuthTokenCheck());

        if (user.isLogin) {
          if (option === false) {
            navigate("/");
          }
        } else {
          if (option) {
            navigate("/login");
          }
          if (user.message === "만료된 토큰") {
            dispatch(logoutOAuth());
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
