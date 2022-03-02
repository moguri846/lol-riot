import { Router, Request, Response } from "express";
import { kakaoLogin, kakaoReissueToken, kakaoMyInfo, kakaoLogout } from "../../API/oauth";
import { resFunc } from "../../common/ResSuccessOrFalse.function";
import { kakaoConfig } from "../../config/config";

const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    const body: any = {
      grant_type: "authorization_code",
      client_id: kakaoConfig.clientId,
      redirect_uri: kakaoConfig.redirectUri,
      code,
      client_secret: kakaoConfig.secret,
    };

    const kakao = await kakaoLogin(body);

    resFunc({ res, data: kakao.data });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

router.post("/reissueToken", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken as string;

    const body: any = {
      grant_type: "refresh_token",
      client_id: kakaoConfig.clientId,
      client_secret: kakaoConfig.secret,
      refresh_token: refreshToken,
    };

    const reissue = await kakaoReissueToken(body);
    resFunc({ res, data: reissue.data });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.get("/myInfo", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string;

    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const myInfo = await kakaoMyInfo(config);

    resFunc({ res, data: { email: myInfo.data.kakao_account.email } });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string;

    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const logout = await kakaoLogout(config);

    resFunc({ res, data: logout.data });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

export default router;
