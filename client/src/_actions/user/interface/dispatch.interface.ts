import { Fail } from "../../common/interface/common.interface";
import { OAUTH_LOGIN } from "../constant/user.constant";

export type OAuthLogin = ISuccessOAuthLogin | Fail;

export interface ISuccessOAuthLogin {
  type: typeof OAUTH_LOGIN;
  payload: IToken;
}
