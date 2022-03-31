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

export type SignInType = ISuccessAuthSignIn | Fail;
export type MyInfoType = ISuccessAuthMyInfo | Fail;
export type LogoutType = ISuccessAuthLogout | Fail;
export type ReissueAuthType = IReissueAuthPayload | Fail;

export type ReissueType = typeof REISSUE_TOKEN | typeof VALID_TOKEN | typeof EXPIRED_TOKEN | typeof NON_EXISTENT_TOKEN;

interface ISuccessAuthPayload {
  payload: {
    isLogin: boolean;
    message: string;
  };
}

export interface ISuccessAuthSignIn extends ISuccessAuthPayload {
  type: typeof OAUTH_LOGIN;
}

export interface ISuccessAuthMyInfo {
  type: typeof MY_INFO;
  payload: {
    email: string;
  };
}

export interface ISuccessAuthLogout extends ISuccessAuthPayload {
  type: typeof OAUTH_LOGOUT;
}

export interface IReissueAuthPayload extends ISuccessAuthPayload {
  type: ReissueType;
}

export interface IInitialState {
  isLogin: boolean;
  message: string;
}
