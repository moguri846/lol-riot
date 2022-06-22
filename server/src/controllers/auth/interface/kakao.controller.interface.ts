import { AxiosRequestHeaders } from "axios";

interface ICommonBody {
  grant_type: "authorization_code" | "refresh_token";
  client_id: string;
  client_secret: string;
}

export interface ISignInBody extends ICommonBody {
  redirect_uri: string;
  code: string;
}

export interface IConfig {
  headers: AxiosRequestHeaders;
}

export interface IReissueTokenBody extends ICommonBody {
  refresh_token: string;
}

export interface IMyInfo {
  email: string;
  username: string;
  role: number;
}
