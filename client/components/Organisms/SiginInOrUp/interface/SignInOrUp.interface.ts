export interface ISignInOrUpParameter {
  email: string;
  password: string;
}

export interface ISignInOrUpResponse {
  success: boolean;
  data: object | string;
}
