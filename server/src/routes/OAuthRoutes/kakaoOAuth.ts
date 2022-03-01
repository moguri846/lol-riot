import { Router, Request, Response } from "express";
import { oAuthkakao, oAuthKakaoLogout, oAuthKakaoMe, oAuthKakaoReissueToken } from "../../API/oauth";
import { resFunc } from "../../common/ResSuccessOrFalse.function";

const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const kakao = await oAuthkakao(code);

    resFunc({ res, data: kakao.data });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

router.post("/reissueToken", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken as string;
    const reissue = await oAuthKakaoReissueToken(refreshToken);
    resFunc({ res, data: reissue.data });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.post("/myInfo", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string;
    const myInfo = await oAuthKakaoMe(authorization);

    resFunc({ res, data: { email: myInfo.data.kakao_account.email } });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string;

    const logout = await oAuthKakaoLogout(authorization);

    resFunc({ res, data: logout.data });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

export default router;
