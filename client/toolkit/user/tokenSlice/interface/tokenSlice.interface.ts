export interface ITokenStatus {
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
