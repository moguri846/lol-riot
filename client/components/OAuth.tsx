import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginOAuth } from "../_actions/user/authActions";
import { IAuthLoginPrameter, OAuthType } from "../_actions/user/interface/auth.interface";

const OAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const type: OAuthType = location.pathname.slice(7) as OAuthType;

    const [key, code, state] = location.search.split("=");

    console.log("type", type);

    const test = async ({ code, state, type }: IAuthLoginPrameter) => {
      try {
        await dispatch(loginOAuth({ code, state, type }));

        navigate("/");
      } catch (err: any) {
        alert(`무언가 이상해요! ${err.message}`);
      }
    };
    test({ code, state, type });
  }, []);
  return <div>OAuth</div>;
};

export default OAuth;
