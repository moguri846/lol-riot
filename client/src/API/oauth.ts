import Send from "./interceptor";
import { makeQueryString } from "./common/commonFunc";

const oAuthLogin = ({ code, state, type }: { code: string; state?: string; type: string }) => {
  const queryStringObj = state ? { code, state } : { code };

  return Send({
    method: "GET",
    url: `/oauth/${type}/login?${makeQueryString(queryStringObj)}`,
  });
};

const oAuthLogout = (type: string) => {
  return Send({
    method: "GET",
    url: `/oauth/${type}/logout`,
  });
};

export { oAuthLogin, oAuthLogout };
