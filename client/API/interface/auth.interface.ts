import { KAKAO, SEARCH_MY_NAME } from "../../toolkit/user/constant/user.constant";
import { IInfo } from "../../toolkit/user/infoSlice/interface/infoSlice.interface";
import { IToken } from "../../toolkit/user/tokenSlice/interface/tokenSlice.interface";
import { ICommon } from "../common/common.interface";

export type AuthTypes = typeof SEARCH_MY_NAME | typeof KAKAO;

export interface ISignUpParameter {
  email: string;
  password: string;
  username: string;
}
export interface ISignUp extends ICommon {}

export interface ISignInParameter {
  email: string;
  password: string;
  code: string;
}
export interface ISignIn extends ICommon {
  data: {
    type: string;
    token: IToken;
  };
}

export interface ICheckToken extends ICommon {}

export interface IMyInfo extends ICommon {
  data: IInfo;
}

export interface IReissueToken extends ICommon {
  data: IToken;
}

export interface ILogout extends ICommon {}
