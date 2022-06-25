import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { kakaoLogin, kakaoTokenCheck, kakaoLogout, kakaoMyInfo, kakaoReissueToken } from "../../API/oauth";
import { kakaoConfig } from "../../config/config";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";
import { IConfig } from "./interface/kakao/Common.interface";
import { ISignInBody, ISignInKakaoResponse } from "./interface/kakao/SignIn.interface";
import { ICheckTokenKakaoResponse } from "./interface/kakao/CheckToken.interface";
import { IMyInfo, IMyInfoKakaoResponse } from "./interface/kakao/MyInfo.interface";
import { IReissueTokenBody, IReissueTokenKakaoResponse } from "./interface/kakao/ReissueToken.interface";
import { ILogoutKakaoResponse } from "./interface/kakao/Logout.interface";

export default {
  async signIn(req: Request, res: Response) {
    try {
      const code = req.body.code as string;

      const body: ISignInBody = {
        grant_type: "authorization_code",
        client_id: kakaoConfig.clientId,
        redirect_uri: kakaoConfig.redirectUri,
        code,
        client_secret: kakaoConfig.secret,
      };

      const { data }: AxiosResponse<ISignInKakaoResponse> = await kakaoLogin(body);

      return resFunc({ res, data });
    } catch (err: any) {
      console.log("signIn err", err);

      return resFunc({ res, err });
    }
  },
  async checkToken(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization as string;

      const config: IConfig = {
        headers: {
          authorization,
        },
      };

      const { data }: AxiosResponse<ICheckTokenKakaoResponse> = await kakaoTokenCheck(config);

      resFunc({ res, data });
    } catch (err) {
      console.log("checkToken err", err);
      resFunc({ res, err });
    }
  },
  async myInfo(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization as string;

      const config: IConfig = {
        headers: {
          authorization,
        },
      };

      const { data }: AxiosResponse<IMyInfoKakaoResponse> = await kakaoMyInfo(config);

      const appendValue: IMyInfo = {
        email: data.kakao_account.email,
        username: data.properties.nickname,
        role: 0,
      };

      return resFunc({ res, data: appendValue });
    } catch (err) {
      console.log("myInfo err", err);
      return resFunc({ res, err });
    }
  },
  async reissueToken(req: Request, res: Response) {
    try {
      const refreshToken = req.body.refreshToken as string;

      const body: IReissueTokenBody = {
        grant_type: "refresh_token",
        client_id: kakaoConfig.clientId,
        client_secret: kakaoConfig.secret,
        refresh_token: refreshToken,
      };

      const { data }: AxiosResponse<IReissueTokenKakaoResponse> = await kakaoReissueToken(body);

      return resFunc({ res, data });
    } catch (err) {
      console.log("reissueToken err", err);
      return resFunc({ res, err });
    }
  },
  async logout(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization as string;

      const config: IConfig = {
        headers: {
          authorization,
        },
      };

      const { data }: AxiosResponse<ILogoutKakaoResponse> = await kakaoLogout(config);

      return resFunc({ res, data });
    } catch (err: any) {
      console.log("logout err", err);
      return resFunc({ res, err });
    }
  },
};
