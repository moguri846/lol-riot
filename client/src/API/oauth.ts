import Send from "./interceptor";
import { makeQueryString } from "./common/commonFunc";
import { Methods } from "./common/methods";

const oAuthLogin = ({ code, state, type }: { code: string; state?: string; type: string }) => {
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
