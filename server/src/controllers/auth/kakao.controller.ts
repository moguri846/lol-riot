import { Request, Response } from "express";
import { kakaoLogin, kakaoTokenCheck, kakaoLogout, kakaoMyInfo, kakaoReissueToken } from "../../API/oauth";
import { kakaoConfig } from "../../config/config";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";
import { IConfig } from "./interface/kakao/Common.interface";
import { ISignInBody } from "./interface/kakao/SignIn.interface";
import { IMyInfo } from "./interface/kakao/MyInfo.interface";
import { IReissueTokenBody } from "./interface/kakao/ReissueToken.interface";

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

      const {
        data: { access_token, refresh_token },
      } = await kakaoLogin(body);

      const responseObj = {
        type: "kakao",
        token: {
          access_token,
          refresh_token,
        },
      };

      return resFunc({ res, data: responseObj });
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

      const { data } = await kakaoTokenCheck(config);

      resFunc({ res });
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

      const {
        data: {
          kakao_account: { email },
          properties: { nickname },
        },
      } = await kakaoMyInfo(config);

      const responseObj: IMyInfo = {
        email,
        username: nickname,
        role: 0,
      };

      return resFunc({ res, data: responseObj });
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

      const {
        data: { access_token, refresh_token },
      } = await kakaoReissueToken(body);

      const responseObj = {
        access_token,
        refresh_token,
      };

      return resFunc({ res, data: responseObj });
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

      const { data } = await kakaoLogout(config);

      return resFunc({ res });
    } catch (err: any) {
      console.log("logout err", err);

      return resFunc({ res, err });
    }
  },
};
