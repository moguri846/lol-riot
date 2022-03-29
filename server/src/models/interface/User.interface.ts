export interface IUser {
  username: string;
  email: string;
  password: string;
  role: number;
  access_token: string;
  refresh_token: string;
}

export interface IComparePassword_R {
  isMatch: boolean;
}

export interface IGenerateToken_R {
  token: IUserToken;
}

export interface IUserToken {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
}
