import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { oAuthLogin, oAuthLogout } from "../../API/oauth";
import { FAIL } from "../common/constant/common.constant";
import {
  ACCESS_TOKEN,
  EXPIRES_IN,
  OAUTH_LOGIN,
  OAUTH_LOGOUT,
  OAUTH_TYPE,
  REFRESH_TOKEN,
} from "./constant/user.constant";
import { OAuthLogin, IOAuthLoginResponse, IToken } from "./interface/dispatch.interface";
import { IOAuthLoginPrameter, OAuthType } from "./interface/user.interface";

const loginOAuth = (loginPrameter: IOAuthLoginPrameter) => async (dispatch: Dispatch<OAuthLogin>) => {
  try {
    const { data }: AxiosResponse<IOAuthLoginResponse> = await oAuthLogin(loginPrameter);

    saveLocalStorage(data.data, loginPrameter.type);

    dispatch({
      type: OAUTH_LOGIN,
      payload: data.data,
    });
  } catch (err: any) {
    const errMessage = err?.response?.data?.errMessage || err.message;
    dispatch({
      type: FAIL,
      payload: { errMessage },
    });

    alert(`무언가 이상해요! ${errMessage}`);
  }
};

const logoutOAuth = () => async (dispatch: Dispatch<any>) => {
  try {
    const type = localStorage.getItem("OAUTH_TYPE") as string;

    const { data } = await oAuthLogout(type);

    localStorage.clear();

    dispatch({
      type: OAUTH_LOGOUT,
      payload: data,
    });
  } catch (err: any) {
    const errMessage = err?.response?.data?.errMessage || err.message;
    dispatch({
      type: FAIL,
      payload: { errMessage },
    });
    alert(`무언가 이상해요! ${errMessage}`);
  }
};

export { loginOAuth, logoutOAuth };

const saveLocalStorage = (token: IToken, oAuthType: OAuthType) => {
  localStorage.setItem(ACCESS_TOKEN, token.access_token);
  localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  localStorage.setItem(EXPIRES_IN, String(token.expires_in));
  localStorage.setItem(OAUTH_TYPE, oAuthType);
};
