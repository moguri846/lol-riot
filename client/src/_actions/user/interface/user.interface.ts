import { KAKAO, NAVER } from "../constant/user.constant";

export type OAuthType = typeof KAKAO | typeof NAVER;

export interface IOAuthLoginPrameter {
  code: string;
  state?: string;
  type: OAuthType;
}
