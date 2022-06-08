export interface IUser {
  _id: string;
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
  refresh_token?: string;
}
