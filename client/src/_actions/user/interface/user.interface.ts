import { KAKAO, NAVER } from "../constant/user.constant";

export type OAuthType = typeof KAKAO | typeof NAVER;

export interface IOAuthLoginPrameter {
  code: string;
  state?: string;
  type: OAuthType;
}

export interface IOAuthLoginResponse {
  success: boolean;
  data: IToken;
}

export interface IToken {
  access_token: string;
  expires_in: number | string;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  token_type: string;
}
