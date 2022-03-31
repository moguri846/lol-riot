import axios from "axios";
import { Request, Response, Router } from "express";
import { naverlogin, naverReissueToken, naverMyInfo, naverLogout } from "../../../API/oauth";
import { resFunc } from "../../common/ResSuccessOrFalse.function";
import { naverConfig } from "../../../config/config";

const router = Router();

router.post("/signIn", async (req: Request, res: Response) => {
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

    resFunc({ res, data: naver.data });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.post("/reissueToken", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken as string;

    const body: any = {
      grant_type: "refresh_token",
      client_id: naverConfig.clientId,
      client_secret: naverConfig.secret,
      refresh_token: refreshToken,
    };

    const reissue = await naverReissueToken(body);

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

    const info = await naverMyInfo(config);

    resFunc({ res, data: { email: info.data.response.email } });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
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

    resFunc({ res, data: logout.data });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

export default router;
