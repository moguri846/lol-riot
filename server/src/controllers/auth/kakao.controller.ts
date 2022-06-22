import { Request, Response } from "express";
import { kakaoLogin, kakaoTokenCheck, kakaoLogout, kakaoMyInfo, kakaoReissueToken } from "../../API/oauth";
import { kakaoConfig } from "../../config/config";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";
import { IConfig, IReissueTokenBody, ISignInBody } from "./interface/kakao.controller.interface";

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

      const { data } = await kakaoLogin(body);

      return resFunc({ res, data: data });
    } catch (err: any) {
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

      const { data } = await kakaoTokenCheck(config);

      resFunc({ res, data: data });
    } catch (err) {
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

      const { data } = await kakaoMyInfo(config);

      const appendValue = {
        email: data.kakao_account.email,
        username: data.properties.nickname,
        role: 0,
      };

      return resFunc({ res, data: appendValue });
    } catch (err) {
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

      const { data } = await kakaoReissueToken(body);

      return resFunc({ res, data: data });
    } catch (err) {
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

      const { data } = await kakaoLogout(config);

      return resFunc({ res, data: data });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
};
