import { Fail } from "../../common/interface/common.interface";
import {
  EXPIRED_TOKEN,
  MY_INFO,
  NON_EXISTENT_TOKEN,
  OAUTH_LOGIN,
  OAUTH_LOGOUT,
  REISSUE_TOKEN,
  VALID_TOKEN,
} from "../constant/user.constant";

export type OAuthLogin = ISuccessOAuthLogin | Fail;
export type OAuthMyInfo = ISuccessOAuthMyInfo | Fail;
export type OAuthLogout = ISuccessOAuthLogout | Fail;
export type OAuthTokenCheck = IReissueOAuthPayload | Fail;

export type ReissueType = typeof REISSUE_TOKEN | typeof VALID_TOKEN | typeof EXPIRED_TOKEN | typeof NON_EXISTENT_TOKEN;

interface ISuccessOAuthPayload {
  payload: {
    isLogin: boolean;
    message: string;
  };
}

export interface ISuccessOAuthLogin extends ISuccessOAuthPayload {
  type: typeof OAUTH_LOGIN;
}

export interface ISuccessOAuthMyInfo {
  type: typeof MY_INFO;
  payload: {
    email: string;
  };
}

export interface ISuccessOAuthLogout extends ISuccessOAuthPayload {
  type: typeof OAUTH_LOGOUT;
}

export interface IReissueOAuthPayload extends ISuccessOAuthPayload {
  type: ReissueType;
}

export interface IInitialState {
  isLogin: boolean;
  message: string;
}
