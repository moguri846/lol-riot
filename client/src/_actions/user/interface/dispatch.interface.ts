import { Fail } from "../../common/interface/common.interface";
import { OAUTH_LOGIN } from "../constant/user.constant";

export type OAuthLogin = ISuccessOAuthLogin | Fail;

export interface ISuccessOAuthLogin {
  type: typeof OAUTH_LOGIN;
  payload: IToken;
}

export interface IOAuthLoginResponse {
  success: boolean;
  data: IToken;
}

export interface IToken {
  access_token: string;
  expires_in: number | string;
  refresh_token: string;
  refresh_token_expires_in?: number;
  token_type: string;
}
