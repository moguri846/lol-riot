export interface IUser {
  username: string;
  email: string;
  password: string;
  role: number;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}
