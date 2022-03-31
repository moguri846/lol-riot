import { AxiosResponse } from "axios";
import moment from "moment";
import { Dispatch } from "redux";
import { signIn, logout, myInfo, reissueToken } from "../../API/oauth";
import { FAIL } from "../common/constant/common.constant";
import {
  ACCESS_TOKEN,
  EXPIRED_TOKEN,
  ACCESS_TOKEN_EXPIRES_IN,
  MY_INFO,
  NON_EXISTENT_TOKEN,
  OAUTH_LOGIN,
  OAUTH_LOGOUT,
  OAUTH_TYPE,
  REFRESH_TOKEN,
  REISSUE_TOKEN,
  VALID_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "./constant/user.constant";
import { OAuthLogin, OAuthLogout, OAuthMyInfo, OAuthTokenCheck } from "./interface/dispatch.interface";
import { IOAuthLoginPrameter, IOAuthLoginResponse, IToken, ITokenStatus, OAuthType } from "./interface/oAuth.interface";

const loginOAuth = (loginPrameter: IOAuthLoginPrameter) => async (dispatch: Dispatch<OAuthLogin>) => {
  try {
    const {
      data: { data: token },
    }: AxiosResponse<IOAuthLoginResponse> = await signIn(loginPrameter);

    dispatch({
      type: OAUTH_LOGIN,
      payload: {
        isLogin: true,
        message: "로그인",
      },
    });

    saveLocalStorage(token, loginPrameter.type);
  } catch (err: any) {
    const status = err.response.status || 500;
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
    } = await myInfo(type.toLowerCase());

    dispatch({
      type: MY_INFO,
      payload: info,
    });
  } catch (err: any) {
    const status = err.response.status || 500;
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

    const { data } = await logout(type.toLowerCase());

    localStorage.clear();

    dispatch({
      type: OAUTH_LOGOUT,
      payload: {
        isLogin: false,
        message: "로그아웃",
      },
    });
  } catch (err: any) {
    console.log("err", err);

    const status = err.response.status || 500;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

// const oAuthTokenCheck = () => async (dispatch: Dispatch<OAuthTokenCheck>) => {
const oAuthTokenCheck = () => async (dispatch: Dispatch<any>) => {
  const accessExpiresIn = parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRES_IN) as string);
  const type = localStorage.getItem(OAUTH_TYPE) as string;
  const now = moment().valueOf();
  const accessDiffTime = accessExpiresIn - now;
  const tokenStatus: ITokenStatus = {
    type: NON_EXISTENT_TOKEN,
    isLogin: false,
    message: "존재하지 않은 토큰",
  };

  if (accessDiffTime) {
    // diffTime이 10분 이하 && 2분 이상인 경우
    if (accessDiffTime <= 600000 && accessDiffTime >= 150000) {
      try {
        await reissueToken(type);
        tokenStatus.type = REISSUE_TOKEN;
        tokenStatus.isLogin = true;
        tokenStatus.message = "토큰 갱신";
      } catch (err: any) {
        tokenStatus.type = FAIL;
        tokenStatus.message = err.message;
      }
      // diffTime이 2분 미만인 경우
    } else if (accessDiffTime < 150000) {
      const refreshExpiresIn = parseInt(localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN) as string);
      const refreshDiffTime = refreshExpiresIn - now;

      if (refreshDiffTime >= 150000) {
        try {
          await reissueToken(type);
          tokenStatus.type = REISSUE_TOKEN;
          tokenStatus.isLogin = true;
          tokenStatus.message = "토큰 갱신";
        } catch (err: any) {
          tokenStatus.type = FAIL;
          tokenStatus.message = err.message;
        }
      } else {
        tokenStatus.type = EXPIRED_TOKEN;
        tokenStatus.message = "만료된 토큰";
      }
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

const reissueTokenAction = async () => {
  try {
    const type = localStorage.getItem("OAUTH_TYPE") as OAuthType;

    const {
      data: { data: token },
    } = await reissueToken(type.toLowerCase());

    saveLocalStorage(token);
  } catch (err: any) {
    const errMessage = err.response.data.data || err.message;

    throw errMessage;
  }
};

export { loginOAuth, myInfoOAuth, oAuthTokenCheck, reissueToken, logoutOAuth };

const saveLocalStorage = (token: IToken, oAuthType?: OAuthType) => {
  console.log(
    "expires_in : ",
    moment(moment().add(token.expires_in, "second").valueOf()).format("YYYY-MM-DD hh:mm:ss")
  );
  console.log(
    "refresh_token_expires_in : ",
    moment(moment().add(token.refresh_token_expires_in, "second").valueOf()).format("YYYY-MM-DD hh:mm:ss")
  );

  localStorage.setItem(ACCESS_TOKEN, token.access_token);
  localStorage.setItem(ACCESS_TOKEN_EXPIRES_IN, String(moment().add(token.expires_in, "second").valueOf()));
  if (token.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  }
  if (token.refresh_token_expires_in) {
    localStorage.setItem(
      REFRESH_TOKEN_EXPIRES_IN,
      String(moment().add(token.refresh_token_expires_in, "second").valueOf())
    );
  }
  if (oAuthType) {
    localStorage.setItem(OAUTH_TYPE, oAuthType);
  }
};
