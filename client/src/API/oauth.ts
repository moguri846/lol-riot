import Send from "./interceptor";
import { makeQueryString } from "./common/commonFunc";
import { Methods } from "./common/methods";
import { IOAuthLoginPrameter } from "../_actions/user/interface/user.interface";

const oAuthLogin = ({ code, state, type }: IOAuthLoginPrameter) => {
  const queryStringObj = state ? { code, state } : { code };

  return Send({
    method: Methods.GET,
    url: `/oauth/${type}/login?${makeQueryString(queryStringObj)}`,
  });
};

const oAuthLogout = (type: string) => {
  return Send({
    method: Methods.GET,
    url: `/oauth/${type}/logout`,
  });
};

export { oAuthLogin, oAuthLogout };
