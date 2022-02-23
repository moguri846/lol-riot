import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { oAuthLogin } from "../API/oauth";

const OAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const type = location.pathname.slice(7);

    const [key, code, state] = location.search.split("=");

    const test = async ({ code, state, type }: { code: string; state: string; type: string }) => {
      try {
        const { data } = await oAuthLogin({ code, state, type });

        localStorage.setItem("ACCESS_TOKEN", data.data.access_token);
        localStorage.setItem("REFRESH_TOKEN", data.data.refresh_token);
        localStorage.setItem("EXPIRES_IN", data.data.expires_in);
        localStorage.setItem("OAUTH_TYPE", type);

        if (data.success) {
          navigate("/");
        }
      } catch (err: any) {
        alert(`무언가 이상해요! ${err.message}`);
      }
    };
    test({ code, state, type });
  }, []);
  return <div>OAuth</div>;
};

export default OAuth;
