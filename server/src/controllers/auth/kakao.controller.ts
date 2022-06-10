import { Request, Response } from "express";
import { kakaoLogin, kakaoTokenCheck, kakaoLogout, kakaoMyInfo, kakaoReissueToken } from "../../API/oauth";
import { kakaoConfig } from "../../config/config";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";

export default {
  async signIn(req: Request, res: Response) {
    try {
      const code = req.body.code as string;

      const body: any = {
        grant_type: "authorization_code",
        client_id: kakaoConfig.clientId,
        redirect_uri: kakaoConfig.redirectUri,
        code,
        client_secret: kakaoConfig.secret,
      };

      const kakao = await kakaoLogin(body);

      return resFunc({ res, data: kakao.data });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
  async checkToken(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization as string;

      const config = {
        headers: {
          Authorization: authorization,
        },
      };

      const tokenCheck = await kakaoTokenCheck(config);

      resFunc({ res, data: tokenCheck.data });
    } catch (err) {
      resFunc({ res, err });
    }
  },
  async myInfo(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization as string;

      const config = {
        headers: {
          Authorization: authorization,
        },
      };

      const myInfo = await kakaoMyInfo(config);

      return resFunc({ res, data: { email: myInfo.data.kakao_account.email } });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async reissueToken(req: Request, res: Response) {
    try {
      const refreshToken = req.body.refreshToken as string;

      const body: any = {
        grant_type: "refresh_token",
        client_id: kakaoConfig.clientId,
        client_secret: kakaoConfig.secret,
        refresh_token: refreshToken,
      };

      const reissue = await kakaoReissueToken(body);
      return resFunc({ res, data: reissue.data });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async logout(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization as string;

      const config = {
        headers: {
          Authorization: authorization,
        },
      };

      const logout = await kakaoLogout(config);

      return resFunc({ res, data: logout.data });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
};
