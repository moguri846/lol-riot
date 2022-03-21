import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginOAuth } from "../_actions/user/oAuthActions";
import { IOAuthLoginPrameter, OAuthType } from "../_actions/user/interface/oAuth.interface";

const OAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const type: OAuthType = location.pathname.slice(7).toUpperCase() as OAuthType;

    const [key, code, state] = location.search.split("=");

    const test = async ({ code, state, type }: IOAuthLoginPrameter) => {
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
