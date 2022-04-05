import { Request, Response } from "express";
import { naverlogin, naverLogout, naverMyInfo, naverReissueToken } from "../../API/oauth";
import { naverConfig } from "../../config/config";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";

export default {
  async signIn(req: Request, res: Response) {
    try {
      const code = req.body.code as string;
      const state = req.body.state as string;

      const body: any = {
        grant_type: "authorization_code",
        client_id: naverConfig.clientId,
        redirect_uri: encodeURI(naverConfig.redirectUri),
        client_secret: naverConfig.secret,
        code,
        state,
      };

      const naver = await naverlogin(body);

      return resFunc({ res, data: naver.data });
    } catch (err) {
      return resFunc({ res, err });
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

      const info = await naverMyInfo(config);

      return resFunc({ res, data: { email: info.data.response.email } });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async reissueToken(req: Request, res: Response) {
    try {
      const refreshToken = req.body.refreshToken as string;

      const body: any = {
        grant_type: "refresh_token",
        client_id: naverConfig.clientId,
        client_secret: naverConfig.secret,
        refresh_token: refreshToken,
      };

      const reissue = await naverReissueToken(body);

      return resFunc({ res, data: reissue.data });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async logout(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization?.slice(6) as string;

      const body: any = {
        grant_type: "delete",
        client_id: naverConfig.clientId,
        client_secret: naverConfig.secret,
        access_token: authorization,
        service_provider: "NAVER",
      };

      const logout = await naverLogout(body);

      return resFunc({ res, data: logout.data });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
};
