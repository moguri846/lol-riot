import { Request, Response, Router } from "express";
import { oAuthNaver, oAuthNaverLogout, oAuthNaverReissueToken } from "../../API/oauth";
import { resFunc } from "../../common/ResSuccessOrFalse.function";

const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const state = req.query.state as string;

    const naver = await oAuthNaver(code, state);

    resFunc({ res, data: naver.data });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.post("/reissueToken", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken as string;

    const reissue = await oAuthNaverReissueToken(refreshToken);

    resFunc({ res, data: reissue.data });
  } catch (err) {
    resFunc({ res, err });
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization?.slice(6) as string;

    const logout = await oAuthNaverLogout(authorization);

    resFunc({ res, data: logout.data });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

export default router;
