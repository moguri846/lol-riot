import { FAIL, NON_EXISTENT_TOKEN, REISSUE_TOKEN, VALID_TOKEN } from "../constant/tokenSlice.constant";

type TokenType = typeof NON_EXISTENT_TOKEN | typeof VALID_TOKEN | typeof REISSUE_TOKEN | typeof FAIL;

export interface ITokenStatus {
  type: TokenType;
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
