import { FAIL } from "../../common/constant/common.constant";
import { SEARCH_MY_NAME, KAKAO, NAVER } from "../constant/user.constant";
import { ReissueType } from "./dispatch.interface";

export type OAuthType = typeof SEARCH_MY_NAME | typeof KAKAO | typeof NAVER;

export interface ISignUpParameter {
  email: string;
  password: string;
}

export interface IAuthLoginPrameter {
  code?: string;
  state?: string;
  type: OAuthType;
  info?: any;
}

export interface IAuthLoginResponse {
  success: boolean;
  data: IToken;
}

export interface ITokenStatus {
  type: ReissueType | typeof FAIL;
  isLogin: boolean;
  message: string;
}

export interface IToken {
  access_token: string;
  expires_in: number | string;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  token_type: string;
}
