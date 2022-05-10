import { Fail } from "../../common/interface/common.interface";
import {
  EXPIRED_TOKEN,
  MY_INFO,
  NON_EXISTENT_TOKEN,
  SIGN_IN,
  LOGOUT,
  REISSUE_TOKEN,
  VALID_TOKEN,
  SIGN_UP,
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

export interface ISuccessAuthSignUp extends ISuccessAuthPayload {
  type: typeof SIGN_UP;
}

export interface ISuccessAuthSignIn extends ISuccessAuthPayload {
  type: typeof SIGN_IN;
}

export interface ISuccessAuthMyInfo {
  type: typeof MY_INFO;
  payload: {
    email: string;
  };
}

export interface ISuccessAuthLogout extends ISuccessAuthPayload {
  type: typeof LOGOUT;
}

export interface IReissueAuthPayload extends ISuccessAuthPayload {
  type: ReissueType;
}

export interface IInitialState {
  isLogin: boolean;
  message: string;
}
