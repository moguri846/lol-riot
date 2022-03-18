import { AxiosResponse } from "axios";
import moment from "moment";
import { Dispatch } from "redux";
import { oAuthLogin, oAuthLogout, oAuthMyInfo, oAuthReissueToken } from "../../API/oauth";
import { FAIL } from "../common/constant/common.constant";
import {
  ACCESS_TOKEN,
  EXPIRED_TOKEN,
  EXPIRES_IN,
  MY_INFO,
  NON_EXISTENT_TOKEN,
  OAUTH_LOGIN,
  OAUTH_LOGOUT,
  OAUTH_TYPE,
  REFRESH_TOKEN,
  REISSUE_TOKEN,
  VALID_TOKEN,
} from "./constant/user.constant";
import { OAuthLogin, OAuthLogout, OAuthMyInfo, OAuthTokenCheck } from "./interface/dispatch.interface";
import { IOAuthLoginPrameter, IOAuthLoginResponse, IToken, ITokenStatus, OAuthType } from "./interface/user.interface";

const loginOAuth = (loginPrameter: IOAuthLoginPrameter) => async (dispatch: Dispatch<OAuthLogin>) => {
  try {
    const {
      data: { data: token },
    }: AxiosResponse<IOAuthLoginResponse> = await oAuthLogin(loginPrameter);

    dispatch({
      type: OAUTH_LOGIN,
      payload: {
        isLogin: true,
        message: "로그인",
      },
    });

    saveLocalStorage(token, loginPrameter.type);
  } catch (err: any) {
    const status = err.response.status;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

const myInfoOAuth = () => async (dispatch: Dispatch<OAuthMyInfo>) => {
  try {
    const type = localStorage.getItem("OAUTH_TYPE") as string;

    const {
      data: { data: info },
    } = await oAuthMyInfo(type.toLowerCase());

    dispatch({
      type: MY_INFO,
      payload: info,
    });
  } catch (err: any) {
    const status = err.response.status;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

const logoutOAuth = () => async (dispatch: Dispatch<OAuthLogout>) => {
  try {
    const type = localStorage.getItem("OAUTH_TYPE") as string;

    const { data } = await oAuthLogout(type.toLowerCase());

    localStorage.clear();

    dispatch({
      type: OAUTH_LOGOUT,
      payload: {
        isLogin: false,
        message: "로그아웃",
      },
    });
  } catch (err: any) {
    const status = err.response.status;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

const oAuthTokenCheck = () => async (dispatch: Dispatch<OAuthTokenCheck>) => {
  const expiresIn = parseInt(localStorage.getItem(EXPIRES_IN) as string);
  const now = moment().valueOf();
  const diffTime = expiresIn - now;
  const tokenStatus: ITokenStatus = {
    type: NON_EXISTENT_TOKEN,
    isLogin: false,
    message: "존재하지 않은 토큰",
  };

  if (diffTime) {
    // diffTime이 10분 이하 && 2분 이상인 경우
    if (diffTime <= 600000 && diffTime >= 150000) {
      try {
        const { data }: AxiosResponse<IToken> = await reissueToken();

        saveLocalStorage(data);

        tokenStatus.type = REISSUE_TOKEN;
        tokenStatus.isLogin = true;
        tokenStatus.message = "토큰 갱신";
      } catch (err: any) {
        const status = err.response.status;
        tokenStatus.type = FAIL;
        tokenStatus.message = err.message;

        dispatch({
          type: FAIL,
          payload: {
            status,
            isLogin: tokenStatus.isLogin,
            errMessage: tokenStatus.message,
          },
        });

        return tokenStatus;
      }

      // diffTime이 2분 미만인 경우
    } else if (diffTime < 150000) {
      tokenStatus.type = EXPIRED_TOKEN;
      tokenStatus.message = "만료된 토큰";
    } else {
      tokenStatus.type = VALID_TOKEN;
      tokenStatus.isLogin = true;
      tokenStatus.message = "유효한 토큰";
    }
  } else {
    tokenStatus.type = NON_EXISTENT_TOKEN;
    tokenStatus.message = "존재하지 않은 토큰";
  }

  dispatch({
    type: tokenStatus.type,
    payload: {
      isLogin: tokenStatus.isLogin,
      message: tokenStatus.message,
    },
  });

  return tokenStatus;
};

const reissueToken = async () => {
  try {
    const type = localStorage.getItem("OAUTH_TYPE") as OAuthType;

    const { data } = await oAuthReissueToken(type.toLowerCase());
    return data;
  } catch (err: any) {
    const errMessage = err.response.data.data || err.message;

    throw errMessage;
  }
};

export { loginOAuth, myInfoOAuth, oAuthTokenCheck, reissueToken, logoutOAuth };

const saveLocalStorage = (token: IToken, oAuthType?: OAuthType) => {
  localStorage.setItem(ACCESS_TOKEN, token.access_token);
  localStorage.setItem(EXPIRES_IN, String(moment().add(token.expires_in, "second").valueOf()));
  if (token.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  }
  if (oAuthType) {
    localStorage.setItem(OAUTH_TYPE, oAuthType);
  }
};
