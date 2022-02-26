import Send from "./interceptor";
import { makeQueryString } from "./common/commonFunc";
import { Methods } from "./common/methods";
import { IOAuthLoginPrameter } from "../_actions/user/interface/user.interface";
import { REFRESH_TOKEN } from "../_actions/user/constant/user.constant";

const oAuthLogin = ({ code, state, type }: IOAuthLoginPrameter) => {
  const queryStringObj = state ? { code, state } : { code };

  return Send({
    method: Methods.GET,
    url: `/oauth/${type}/login?${makeQueryString(queryStringObj)}`,
  });
};

const oAuthReissueToken = (type: string) => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN) as string;
  return Send({
    method: Methods.POST,
    url: `/oauth/${type}/reissueToken`,
    data: { refreshToken },
  });
};

const oAuthLogout = (type: string) => {
  return Send({
    method: Methods.GET,
    url: `/oauth/${type}/logout`,
  });
};

export { oAuthLogin, oAuthReissueToken, oAuthLogout };
